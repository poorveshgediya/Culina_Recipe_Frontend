import axios from "axios";
import LogoLoader from "../../LogoLoader";
import { useState } from "react";

const Members = ({ members, refreshUsers }) => {

  const handlePromoteToAdmin = async (id) => {
    axios
      .patch(`${import.meta.env.VITE_RECIPE_APP_API}/updateToAdmin`, { id },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert(res.data.message || "User promoted to admin successfully");
        refreshUsers();
      })
      .catch((err) => {
        console.error("Error promoting user to admin:", err);
        alert(
          err.response?.data?.message || "Failed to promote user to admin. Check if the server is running.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_RECIPE_APP_API}/deleteMember`, { data: { id } })
      .then((res) => {
        alert(res.data.message || "User deleted successfully");
        refreshUsers(); // Call the refresh function to update the user list
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        alert(err.response?.data?.message || "Failed to delete user. Check if the server is running.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {members.map((member, index) => (
        <tr className="hover:bg-white/40 transition-colors overflow-x-scroll" key={index}>
          <td className="px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  data-alt="professional portrait of a culinary professional in a clean studio setting with soft natural lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMnHAHoja8ljC8fsW94heIIy8dyoweqHikgJwkcihnRo9ffHKnjGe9T_sq-NhFroMVP1A9Sd2OuxEbQOPKbP2o1h6nDBfJmt8kngMjGhzW0ukUEY2pk0nXwrvyCt68vAlzE0Lhd7Vi1xdmfqZxI_N-tpHa8f25rbKca9jzhYB82EfZmbAFKM1knEWjU5pcJ0C3OUiR4ixApBKmgkg_CmecEOe6ibYWdd0wIHQU_FUR1sFoc8F_C9zHXwf99I9a7T62mGx6NMZH3lm1"
                />
              </div>
              <div>
                <div className="font-bold text-on-surface">
                  {member.full_name}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-5 font-body text-sm text-on-surface-variant">
            @{member.username}
          </td>
          <td className="px-6 py-5">
            <span className="px-3 py-1 bg-surface-variant text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-widest">
              {member.role}
            </span>
          </td>
          <td className="px-6 py-5 font-body text-sm text-on-surface-variant">
            {member.joinedAt.split("T")[0]}
          </td>
          <td className="px-6 py-5 text-right">
            <div className="flex justify-end gap-2">
              <button
                className="p-2 hover:bg-primary/5 rounded-lg text-primary transition-colors group"
                title="Promote to Admin"
                onClick={() => handlePromoteToAdmin(member.user_id)}
              >
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                  verified_user
                </span>
              </button>
              <button
                className="p-2 hover:bg-error/5 rounded-lg text-error transition-colors group"
                title="Delete Member"
                onClick={() => handleDeleteUser(member.user_id)}
              >
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                  delete
                </span>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default Members;
