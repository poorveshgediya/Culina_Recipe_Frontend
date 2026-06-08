import React, { useState } from "react";
import Wrapper from "./wrapper/Wrapper";
import SideBar from "./SideBar";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const passActiveNav = (navName) => {
    setActiveNav(navName);
  };

  const getuserNameFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    let username = "";
    if (token) {
      const decodedToken = jwtDecode(token);
      username = decodedToken.full_name;
    }
    return username;
  };
  useEffect(() => {
    getuserNameFromLocalStorage();
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex">
      {/* <!-- SideNavBar --> */}
      {showSidebar && (
        <SideBar passActiveNav={passActiveNav} activeNav={activeNav} />
      )}

      {/* <!-- Main Canvas --> */}
      <main
        className={`${showSidebar ? "md:ml-72" : ""} flex-1 min-h-screen flex flex-col relative overflow-hidden transition-all duration-300`}
      >
        {/* <!-- TopAppBar --> */}
        <header className="sticky top-0 z-50 bg-[#fcf9f4] shadow-sm flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="lg:hidden flex items-center">
              <span
                className="material-symbols-outlined text-primary cursor-pointer"
                data-icon="menu"
                onClick={toggleSidebar}
              >
                menu
              </span>
            </div>
            <div className="text-2xl font-black text-primary-container tracking-tighter font-headline">
              The Editorial Epicurean
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 hover:text-primary transition-colors bg-primary text-white"
              to={"/AllRecipeList"}
            >
              <span className="material-symbols-outlined text-xl">
                open_in_new
              </span>
              <span className="font-label text-sm font-bold tracking-tight uppercase">
                Dashboard
              </span>
            </Link>
            <div className="flex items-center gap-3 text-primary-container ">
              <span className="text-sm font-label font-bold uppercase tracking-widest text-primary">
                {getuserNameFromLocalStorage()}
              </span>
              <img
                alt="Chef profile picture"
                className="w-8 h-8 rounded-full object-cover border border-outline-variant/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSuR2X0Ywr1KvarhcZ8dT2C_qyhfgVwtLO1Y9IFDBFQS7ueCLPgTr0Z6Vl_Z8AY5jpkBmdPK1qw8UO5_HeZV5KqIFAGqgbUqcYpOKjq9Nb3B5SfB7A9JXXdjrFl0GAoB-eFhTb_0kho8ZVoqAfiY5vRMLD6RSNazqBPl8QE0DePPYN6yPq_8HTyfWX7b4DuMMcSBeSBbAI3zX5mDq3I4gtLfHbYI8v-egEiti7dgSgokVNX-FhR9JKJ6DHT5CPlGB1Wke4E5t7qv78"
              />
            </div>
          </div>
        </header>

        {/* <!-- Content Area --> */}
        <Wrapper activeNav={activeNav} />
      </main>
    </div>
  );
};

export default AdminDashboard;
