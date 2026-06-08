import axios from "axios";
import React from "react";

const Admins = ({ admins, refreshUsers }) => {
  const handleDeleteAdmin = (id) => {
    axios
      .post(`${import.meta.env.VITE_RECIPE_APP_API}/deleteAdmin`, { id },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message || "Admin deleted successfully");
          refreshUsers();
        } else {
          alert("Failed to delete admin");
        }
      })
      .catch((err) => {
        console.error("Error deleting admin:", err);
        alert(err.response?.data?.message || "Failed to delete admin. Check if the server is running.");
      });
  };

  const handleDemoteToMember = (id) => {
    axios
      .patch(`${import.meta.env.VITE_RECIPE_APP_API}/updateToMember`, { id },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message || "Admin demoted to member");
          refreshUsers();
        } else {
          alert("Failed to demote admin");
        }
      })
      .catch((err) => {
        console.error("Error demoting admin to member:", err);
        alert(err.response?.data?.message || "Failed to demote admin. Check if the server is running.");
      });
  };

  return (
    <>
      {admins.map((admin, index) => (
        <tr className="hover:bg-white/40 transition-colors" key={index}>
          <td className="px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border-2 border-secondary">
                <img
                  className="w-full h-full object-cover"
                  data-alt="headshot of a confident female executive with clean professional aesthetic and neutral background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANYbxu7G_B8VTFkWg3yBlBA9r4toil2_xiGIbHsmH0KwQihiz538b12H4Vzoaps9iJXJZAnVCycfIGGlJuo38jByBmxxe1uo2mw7p4p0-kNwttOHClYke_qWE7DgrByQcuzlvNIiit9LdU4hIRUs_Swcig2SEmB6XRbkNxgQ5sAWcD2wjFKxSI0bk2KkiPpMfLoejuavctYlBA6PM2guVALm7XshfMKowD03OADngT0UIOFkYpcl1BclwagwLBUSbhhMvLiK0RxJhF"
                />
              </div>
              <div>
                <div className="font-bold text-on-surface flex items-center gap-2">
                  {admin.full_name}
                  <span
                    className="material-symbols-outlined text-secondary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-5 font-body text-sm text-on-surface-variant">
            @{admin.username}
          </td>
          <td className="px-6 py-5">
            <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-widest">
              {admin.role}
            </span>
          </td>
          <td className="px-6 py-5 font-body text-sm text-on-surface-variant">
            {admin.joinedAt.split("T")[0]}
          </td>
          <td className="px-6 py-5 text-right">
            <div className="flex justify-end gap-2">
              <button
                className="p-2 hover:bg-primary/5 rounded-lg text-primary transition-colors group"
                title="Demote to Admin"
                onClick={()=>handleDemoteToMember(admin.user_id)}
              >
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                  edit
                </span>
              </button>
              <button
                className="p-2 hover:bg-error/5 rounded-lg text-error transition-colors group relative"
                title="Delete Admin"
                onClick={() => handleDeleteAdmin(admin.user_id)}
              >
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                  delete_forever
                </span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full animate-pulse"></span>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default Admins;
