import React, { useState } from "react";
import axios from "axios";

const CreateUser = ({ handleCreateUserClick, showUsers }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    dob: "",
    role: "member",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "username" ? value.toLowerCase().replace(/\s+/g, "") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    axios
      .post(`${import.meta.env.VITE_RECIPE_APP_API}/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        handleCreateUserClick(); // Close the form after successful creation
        showUsers(); // Refresh the user list in the parent component
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        alert("Failed to create user.");
      })
      .finally(() => {
        setIsSubmitting(false); // Reset submitting state after request completes
      });
  };

  return (
    <div className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">
          Create New User
        </h2>
        <p className="text-on-surface-variant text-lg">
          Manually register an editorial member or administrator to the
          platform.
        </p>
      </div>
      {/* <!-- Form Layout (Bento-style editorial grid) --> */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* <!-- Main Form Section --> */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-8 editorial-shadow">
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {/* <!-- Field: Full Name --> */}
              <div className="relative group">
                <label className="block font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-2">
                  Full Name
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 focus:ring-0 focus:border-secondary transition-colors font-body text-on-surface placeholder:text-on-surface-variant/40"
                  placeholder="e.g. Julianne Smith"
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <!-- Field: Username --> */}
              <div className="relative group">
                <label className="block font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-2">
                  Username
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 focus:ring-0 focus:border-secondary transition-colors font-body text-on-surface placeholder:text-on-surface-variant/40"
                  placeholder="jsmith_culinary"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  required
                />
              </div>
              {/* <!-- Field: Email --> */}
              <div className="relative group md:col-span-2">
                <label className="block font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-2">
                  Corporate Email Address
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 focus:ring-0 focus:border-secondary transition-colors font-body text-on-surface placeholder:text-on-surface-variant/40"
                  placeholder="julianne.smith@epicurean.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <!-- Field: DOB --> */}
              <div className="relative group">
                <label className="block font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-2">
                  Date of Birth (DOB)
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 focus:ring-0 focus:border-secondary transition-colors font-body text-on-surface"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <!-- Field: Role Selection --> */}
              <div className="relative group">
                <label className="block font-label text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-2">
                  Initial Role
                </label>
                <select
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 focus:ring-0 focus:border-secondary transition-colors font-body text-on-surface cursor-pointer"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="member">Member (Contributor)</option>
                  <option value="admin">Administrator (Full Access)</option>
                </select>
              </div>
            </div>
            {/* <!-- Action Buttons --> */}
            <div className="flex items-center gap-6 pt-6 border-t border-outline-variant/10">
              <button
                className="bg-gradient-to-r from-secondary to-secondary-container text-white px-10 py-4 rounded-full font-label text-xs font-bold uppercase tracking-[0.15em] editorial-shadow hover:scale-105 active:scale-95 transition-all"
                type="submit"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Creating..." : "Create User"}
              </button>
              <button
                className="text-on-surface-variant font-label text-xs font-bold uppercase tracking-[0.15em] hover:text-primary transition-colors"
                type="button"
                onClick={handleCreateUserClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        {/* <!-- Side Info/Decorative Section --> */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative rounded-xl overflow-hidden aspect-[4/5] editorial-shadow group">
            <img
              alt="Interior of a modern high-end kitchen with natural light"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              data-alt="Close-up of professional chef hands preparing fresh herbs on a wooden block with soft morning sunlight through a window"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDj25jiHvV2kiocv9faW4KJcF5g4IYhbDfc65YOXdKELd4puPP-lzCMn957Xa8E6gK_5MLEK7Z3-FbfqQeG7mirI9t5fXUWcmVKC6rUPYIfng9yW4pXItLqx0s512fm4wWD3Ycio7Vjdnch7oUp7zeEZ4M3QM8Hk17EKialeG_1H54DXeGfqS69BQZktaX1-E3jfPTerEqA0gOTjKUipXKxZRrxw-1z0by5cMs_H4Mvk6iOZQzOMYx0gpN9wAGNhX_aAjzZzfbCkl9"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className="font-label text-[10px] text-tertiary-fixed font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-3 inline-block">
                Curator Onboarding
              </span>
              <h3 className="font-headline text-2xl text-white font-bold leading-tight">
                Elevating the Kitchen Standards
              </h3>
            </div>
          </div>
          <div className="bg-primary p-6 rounded-xl text-white">
            <h4 className="font-headline text-lg font-bold mb-3 flex items-center gap-2">
              <span
                className="material-symbols-outlined text-secondary"
                data-icon="verified_user"
              >
                verified_user
              </span>
              Admin Privileges
            </h4>
            <p className="text-sm opacity-80 leading-relaxed font-body">
              Creating a new user will trigger an automated secure password
              generation email. Roles can be adjusted later in the User
              Directory settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
