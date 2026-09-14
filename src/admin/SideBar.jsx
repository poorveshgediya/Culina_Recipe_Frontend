// import React from "react";
// import { Link } from "react-router-dom";

// const SideBar = ({ passActiveNav, activeNav }) => {

//   const handleRemoveUserFromLocalStorage = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   }
//   return (
//     <aside className="h-screen w-72 flex flex-col fixed left-0 top-0 bg-surface-container-low  p-4 gap-2 z-40 md:flex transition-transform duration-300 index-50">
//       <Link className="mb-8 px-2"
//      to={"/AllRecipeList"}
//      >
//         <h1 className="font-headline font-bold text-xl text-primary-container">
//           Culinary Admin
//         </h1>
//         <p className="font-body text-xs font-medium tracking-wide text-[#1c1c19]/70 uppercase opacity-60">
//           Editorial Control
//         </p>
//       </Link>
//       <nav className="grow space-y-1">
//         <a
//           className={`flex items-center gap-3 px-4 py-3 ${activeNav === "dashboard" ? " bg-primary-container text-white  rounded-lg shadow-sm transition-transform duration-200 hover:translate-x-1 cursor-pointer active:scale-95" : "text-[#1c1c19]/70 hover:bg-primary-container/5 transition-transform duration-200 hover:translate-x-1 cursor-pointer active:scale-95 rounded-lg"} `}
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             passActiveNav("dashboard");
//           }}
//         >
//           <span className="material-symbols-outlined" data-icon="dashboard">
//             dashboard
//           </span>
//           <span className="font-body text-sm font-medium tracking-wide">
//             Dashboard
//           </span>
//         </a>
//         <a
//           className={`flex items-center gap-3 px-4 py-3 ${activeNav === "recipes" ? " bg-primary-container text-white  rounded-lg shadow-sm transition-transform duration-200 hover:translate-x-1 cursor-pointer active:scale-95" : "text-[#1c1c19]/70  hover:bg-primary-container/5  transition-transform duration-200 hover:translate-x-1 cursor-pointer active:scale-95 rounded-lg"} `}
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             passActiveNav("recipes");
//           }}
//         >
//           <span
//             className="material-symbols-outlined"
//             data-icon="restaurant_menu"
//           >
//             restaurant_menu
//           </span>
//           <span className="font-body text-sm font-medium tracking-wide">
//             Recipe Management
//           </span>
//         </a>
//         <a
//           className={`flex items-center gap-3 px-4 py-3 ${activeNav === "users" ? " bg-primary-container text-white  rounded-lg shadow-sm transition-transform duration-200 hover:translate-x-1 cursor-pointer active:scale-95" : "text-[#1c1c19]/70  hover:bg-primary-container/5  transition-transform duration-200 hover:translate-x-1 cursor-pointer active:scale-95 rounded-lg"} `}
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             passActiveNav("users");
//           }}
//         >
//           <span
//             className="material-symbols-outlined"
//             data-icon="group"
//             style={{ fontVariationSettings: "'FILL' 1" }}
//           >
//             group
//           </span>
//           <span className="font-body text-sm font-medium tracking-wide">
//             User Directory
//           </span>
//         </a>
//       </nav>
//       <div className="mt-auto border-t border-outline-variant/10 pt-4 space-y-1">
//         <button className="w-full flex items-center gap-3 px-4 py-3 text-[#1c1c19]/70 hover:bg-primary-container/5 transition-transform duration-200 hover:translate-x-1 cursor-pointer active:scale-95 rounded-lg">
//           <span className="material-symbols-outlined" data-icon="help">
//             help
//           </span>
//           <span className="font-body text-sm font-medium tracking-wide">
//             Help Center
//           </span>
//         </button>
//         <button className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/5 transition-transform duration-200 hover:translate-x-1 cursor-pointer active:scale-95 rounded-lg"
//         onClick={()=>handleRemoveUserFromLocalStorage()}
//         >
//           <span className="material-symbols-outlined" data-icon="logout">
//             logout
//           </span>
//           <span className="font-body text-sm font-medium tracking-wide">
//             Sign Out
//           </span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default SideBar;


import { Link } from "react-router-dom";

const SideBar = ({
  passActiveNav,
  activeNav,
  isOpen,
  closeSidebar,
}) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleNavClick = (navName) => {
    passActiveNav(navName);
    closeSidebar();
  };

  const getNavClass = (navName) => {
    const baseClasses =
      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-transform duration-200 hover:translate-x-1 active:scale-95";

    if (activeNav === navName) {
      return `${baseClasses} bg-primary-container text-white shadow-sm`;
    }

    return `${baseClasses} text-[#1c1c19]/70 hover:bg-primary-container/5`;
  };

  return (
    <aside
      id="admin-sidebar"
      className={`fixed left-0 top-0 z-[70] h-dvh w-72 bg-surface-container-low p-4 flex flex-col gap-2 shadow-xl md:shadow-none transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
      aria-label="Admin navigation"
    >
      {/* Sidebar header */}
      <div className="flex items-start justify-between mb-6 px-2">
        <Link to="/AllRecipeList" onClick={closeSidebar}>
          <h1 className="font-headline font-bold text-xl text-primary-container">
            Culinary Admin
          </h1>

          <p className="font-body text-xs font-medium tracking-wide text-[#1c1c19]/70 uppercase opacity-60">
            Editorial Control
          </p>
        </Link>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close admin navigation"
          className="md:hidden p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-primary-container/5"
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            close
          </span>
        </button>
      </div>

      {/* Scrollable navigation */}
      <nav className="flex-1 min-h-0 overflow-y-auto space-y-1">
        <button
          type="button"
          className={getNavClass("dashboard")}
          onClick={() => handleNavClick("dashboard")}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            dashboard
          </span>

          <span className="font-body text-sm font-medium tracking-wide">
            Dashboard
          </span>
        </button>

        <button
          type="button"
          className={getNavClass("recipes")}
          onClick={() => handleNavClick("recipes")}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            restaurant_menu
          </span>

          <span className="font-body text-sm font-medium tracking-wide">
            Recipe Management
          </span>
        </button>

        <button
          type="button"
          className={getNavClass("users")}
          onClick={() => handleNavClick("users")}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            group
          </span>

          <span className="font-body text-sm font-medium tracking-wide">
            User Directory
          </span>
        </button>
      </nav>

      {/* Sidebar footer */}
      <div className="shrink-0 border-t border-outline-variant/10 pt-4 space-y-1">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 text-[#1c1c19]/70 hover:bg-primary-container/5 transition-transform duration-200 hover:translate-x-1 active:scale-95 rounded-lg"
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            help
          </span>

          <span className="font-body text-sm font-medium tracking-wide">
            Help Center
          </span>
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/5 transition-transform duration-200 hover:translate-x-1 active:scale-95 rounded-lg"
          onClick={handleLogout}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
          >
            logout
          </span>

          <span className="font-body text-sm font-medium tracking-wide">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;