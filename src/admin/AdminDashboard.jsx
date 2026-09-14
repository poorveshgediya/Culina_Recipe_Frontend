// import React, { useState } from "react";
// import Wrapper from "./wrapper/Wrapper";
// import SideBar from "./SideBar";
// import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   const [activeNav, setActiveNav] = useState("dashboard");
//   const [showSidebar, setShowSidebar] = useState(true);

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const passActiveNav = (navName) => {
//     setActiveNav(navName);
//   };

//   const getuserNameFromLocalStorage = () => {
//     const token = localStorage.getItem("token");
//     let username = "";
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       username = decodedToken.full_name;
//     }
//     return username;
//   };
//   useEffect(() => {
//     getuserNameFromLocalStorage();
//   }, []);

//   return (
//     <div className="bg-surface text-on-surface font-body min-h-screen flex">
//       {/* <!-- SideNavBar --> */}
//       {showSidebar && (
//         <SideBar passActiveNav={passActiveNav} activeNav={activeNav} />
//       )}

//       {/* <!-- Main Canvas --> */}
//       <main
//         className={`${showSidebar ? "md:ml-72" : ""} flex-1 min-h-screen flex flex-col relative overflow-hidden transition-all duration-300`}
//       >
//         {/* <!-- TopAppBar --> */}
//         <header className="sticky top-0 z-50 bg-[#fcf9f4] shadow-sm flex justify-between items-center w-full px-6 py-4">
//           <div className="flex items-center gap-4">
//             <div className="lg:hidden flex items-center">
//               <span
//                 className="material-symbols-outlined text-primary cursor-pointer"
//                 data-icon="menu"
//                 onClick={toggleSidebar}
//               >
//                 menu
//               </span>
//             </div>
//             <div className="text-2xl font-black text-primary-container tracking-tighter font-headline">
//               The Editorial Epicurean
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <Link
//               className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 hover:text-primary transition-colors bg-primary text-white"
//               to={"/AllRecipeList"}
//             >
//               <span className="material-symbols-outlined text-xl">
//                 open_in_new
//               </span>
//               <span className="font-label text-sm font-bold tracking-tight uppercase">
//                 Dashboard
//               </span>
//             </Link>
//             <div className="flex items-center gap-3 text-primary-container ">
//               <span className="text-sm font-label font-bold uppercase tracking-widest text-primary">
//                 {getuserNameFromLocalStorage()}
//               </span>
//               <img
//                 alt="Chef profile picture"
//                 className="w-8 h-8 rounded-full object-cover border border-outline-variant/20"
//                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSuR2X0Ywr1KvarhcZ8dT2C_qyhfgVwtLO1Y9IFDBFQS7ueCLPgTr0Z6Vl_Z8AY5jpkBmdPK1qw8UO5_HeZV5KqIFAGqgbUqcYpOKjq9Nb3B5SfB7A9JXXdjrFl0GAoB-eFhTb_0kho8ZVoqAfiY5vRMLD6RSNazqBPl8QE0DePPYN6yPq_8HTyfWX7b4DuMMcSBeSBbAI3zX5mDq3I4gtLfHbYI8v-egEiti7dgSgokVNX-FhR9JKJ6DHT5CPlGB1Wke4E5t7qv78"
//               />
//             </div>
//           </div>
//         </header>

//         {/* <!-- Content Area --> */}
//         <Wrapper activeNav={activeNav} />
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Wrapper from "./wrapper/Wrapper";
import SideBar from "./SideBar";

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  const [user, setUser] = useState({
    fullName: "",
    shortName: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const fullName = decodedToken.full_name || "";

      const nameParts = fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const surname = nameParts.at(-1) || "";

      const shortName =
        nameParts.length > 1
          ? `${firstName.charAt(0)}${surname.charAt(0)}`.toUpperCase()
          : firstName.slice(0, 2).toUpperCase();

      setUser({
        fullName,
        shortName,
      });
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showSidebar]);

  const passActiveNav = (navName) => {
    setActiveNav(navName);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      {/* Mobile dark overlay */}
      {showSidebar && (
        <button
          type="button"
          className="md:hidden fixed inset-0 z-[60] bg-slate-950/40"
          onClick={closeSidebar}
          aria-label="Close admin navigation"
        />
      )}

      {/* Sidebar is always rendered for animation */}
      <SideBar
        passActiveNav={passActiveNav}
        activeNav={activeNav}
        isOpen={showSidebar}
        closeSidebar={closeSidebar}
      />

      {/* Main area */}
      <main className="min-h-screen flex flex-col md:ml-72 transition-all duration-300">
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full bg-[#fcf9f4]/95 backdrop-blur-md border-b border-primary/10 shadow-sm">
          <div className="min-h-16 px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
            {/* Left side */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              {/* Mobile sidebar button */}
              <button
                type="button"
                className="md:hidden shrink-0 flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                onClick={() => setShowSidebar(true)}
                aria-label="Open admin navigation"
                aria-expanded={showSidebar}
                aria-controls="admin-sidebar"
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  aria-hidden="true"
                >
                  menu
                </span>
              </button>

              <h1 className="text-base sm:text-xl lg:text-2xl font-black text-primary-container tracking-tighter font-headline truncate">
                <span className="sm:hidden">Epicurean</span>
                <span className="hidden sm:inline">
                  The Editorial Epicurean
                </span>
              </h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <Link
                className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                to="/AllRecipeList"
                aria-label="Open recipe dashboard"
              >
                <span
                  className="material-symbols-outlined text-xl"
                  aria-hidden="true"
                >
                  open_in_new
                </span>

                <span className="hidden lg:inline font-label text-sm font-bold tracking-tight uppercase">
                  Recipe Dashboard
                </span>
              </Link>

              <div className="flex items-center gap-2 sm:gap-3 text-primary-container">
                {/* Full name only on larger screens */}
                <span className="hidden xl:block max-w-40 truncate text-sm font-label font-bold uppercase tracking-widest text-primary">
                  {user.fullName}
                </span>

                {/* Initials avatar */}
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-container text-white flex items-center justify-center text-xs font-bold uppercase"
                  title={user.fullName}
                >
                  {user.shortName || "AD"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="flex-1 min-w-0 overflow-x-hidden">
          <Wrapper activeNav={activeNav} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;