import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

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
        full_name: fullName,
        short_name: shortName,
      });
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }, []);

  // Close mobile menu after route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navLinkClass = (path) =>
    `text-sm font-semibold transition-colors ${
      location.pathname === path
        ? "text-primary"
        : "text-slate-700 hover:text-primary"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-primary/10 bg-background-light/90 backdrop-blur-md">
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <div className="shrink-0 bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-xl md:text-2xl">
              restaurant_menu
            </span>
          </div>

          <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 font-display uppercase truncate">
            CulinaShare
          </h1>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-10">
          <Link className={navLinkClass("/AllRecipeList")} to="/AllRecipeList">
            All Recipes
          </Link>

          <Link className={navLinkClass("/about")} to="">
            About
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {!user ? (
            <Link
              to="/login"
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-primary text-white font-bold rounded-lg text-xs sm:text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-2 md:gap-3">
              {/* Initials avatar */}
              <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                {user.short_name}
              </div>

              {/* Full name on desktop */}
              <span className="hidden lg:block max-w-40 truncate text-sm font-bold uppercase tracking-wider text-primary">
                {user.full_name}
              </span>

              {/* Logout only on desktop */}
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Logout"
                className="hidden md:flex p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  logout
                </span>
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-primary hover:bg-primary/10 transition-colors"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`md:hidden overflow-hidden border-t border-primary/10 bg-white transition-all duration-300 ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          <Link
            to="/AllRecipeList"
            className={`px-4 py-3 rounded-lg ${
              location.pathname === "/AllRecipeList"
                ? "bg-primary/10 text-primary"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">
                restaurant
              </span>

              <span className="text-sm font-semibold">All Recipes</span>
            </div>
          </Link>

          <Link
            to=""
            className={`px-4 py-3 rounded-lg ${
              location.pathname === "/about"
                ? "bg-primary/10 text-primary"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">info</span>
              <span className="text-sm font-semibold">About</span>
            </div>
          </Link>

          {user && (
            <>
              <div className="my-2 border-t border-slate-200" />

              <div className="px-4 py-2 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500">Signed in as</p>
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {user.full_name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg text-left text-red-500 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    logout
                  </span>
                  <span className="text-sm font-semibold">Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
