import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      var decodedToken = jwtDecode(token);
      setUser({ full_name: decodedToken.full_name });
    }
  }, []);

  const handleRemoveUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* <!-- Logo --> */}
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">
                restaurant_menu
              </span>
            </div>
            <h1 className="text-xl font-800 tracking-tight text-slate-900 font-display uppercase">
              CulinaShare
            </h1>
          </div>
          <div className="hidden md:flex items-center justify-around gap-10">
            <Link
              className="text-sm font-semibold hover:text-primary transition-colors"
              to={"/AllRecipeList"}
            >
              All Recipes
            </Link>
            {/* <Link className="text-sm font-semibold hover:text-primary transition-colors" to={"/Favourite"}>Favorites</Link> */}
            <Link
              className="text-sm font-semibold hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>

          {/* <!-- Search & Actions --> */}
          <div className="flex items-center gap-4">
            {!user ? (
              <button className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg text-sm  hover:shadow-lg hover:shadow-primary/30 transition-all">
                <Link to={"/login"}>Login</Link>
              </button>
            ) : (
              <div className="flex items-center gap-3 text-primary-container">
                <img
                  alt="Chef profile picture"
                  className="w-8 h-8 rounded-full object-cover border border-outline-variant/20"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSuR2X0Ywr1KvarhcZ8dT2C_qyhfgVwtLO1Y9IFDBFQS7ueCLPgTr0Z6Vl_Z8AY5jpkBmdPK1qw8UO5_HeZV5KqIFAGqgbUqcYpOKjq9Nb3B5SfB7A9JXXdjrFl0GAoB-eFhTb_0kho8ZVoqAfiY5vRMLD6RSNazqBPl8QE0DePPYN6yPq_8HTyfWX7b4DuMMcSBeSBbAI3zX5mDq3I4gtLfHbYI8v-egEiti7dgSgokVNX-FhR9JKJ6DHT5CPlGB1Wke4E5t7qv78"
                />
                <span className="text-sm font-label font-bold uppercase tracking-widest text-primary">
                  {user?.full_name}
                </span>
                <Link
                  className="hidden md:block text-primary-container/70 hover:bg-surface-container-low transition-colors px-3 py-1 rounded-lg text-sm font-medium"
                  onClick={handleRemoveUserFromLocalStorage}
                >
                  <span className="material-symbols-outlined text-xl">
                    logout
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
