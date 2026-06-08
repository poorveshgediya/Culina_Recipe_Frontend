import React from "react";
import { Link } from "react-router-dom";

const Header = ({
  user,
  handleCreateUserClick,
  handleChangeRecipeNavToFavouriteRecipes,
  handleChangeRecipeNavToAllRecipes,
  recipeNav,
}) => {
  const handleRemoveUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 backdrop-blur-md px-6 py-3 lg:px-10">
      <div className="max-w-360 mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-10">
          <Link className="flex items-center gap-2 text-primary" to={"/"}>
            <span className="material-symbols-outlined text-3xl font-bold">
              cooking
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              CulinaShare
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              className={`text-sm ${recipeNav === "AllRecipes" ? "font-semibold text-primary" : "font-medium text-slate-600  hover:text-primary transition-colors"}`}
              onClick={handleChangeRecipeNavToAllRecipes}
            >
              All Recipes
            </Link>
            <Link
              className={`text-sm ${recipeNav === "FavouriteRecipes" ? "font-semibold text-primary" : "font-medium text-slate-600  hover:text-primary transition-colors"}`}
              onClick={handleChangeRecipeNavToFavouriteRecipes}
            >
              Favorites
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 max-w-md items-center relative">
          <span className="material-symbols-outlined absolute left-3 text-slate-400">
            search
          </span>
          <input
            className="w-full bg-slate-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
            placeholder="Search recipes, ingredients..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-8">
          {user && (
            <button
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all items-center gap-2"
              onClick={() => handleCreateUserClick()}
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span className="max-[960px]:hidden">Create Recipe</span>
            </button>
          )}
          {!user ? (
            <button className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg text-sm  hover:shadow-lg hover:shadow-primary/30 transition-all">
              <Link to={"/login"}>Login</Link>
            </button>
          ) : (
            <div className="flex items-center gap-3 text-primary-container ">
              <img
                alt="Chef profile picture"
                className="w-8 h-8 rounded-full object-cover border border-outline-variant/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSuR2X0Ywr1KvarhcZ8dT2C_qyhfgVwtLO1Y9IFDBFQS7ueCLPgTr0Z6Vl_Z8AY5jpkBmdPK1qw8UO5_HeZV5KqIFAGqgbUqcYpOKjq9Nb3B5SfB7A9JXXdjrFl0GAoB-eFhTb_0kho8ZVoqAfiY5vRMLD6RSNazqBPl8QE0DePPYN6yPq_8HTyfWX7b4DuMMcSBeSBbAI3zX5mDq3I4gtLfHbYI8v-egEiti7dgSgokVNX-FhR9JKJ6DHT5CPlGB1Wke4E5t7qv78"
              />
              <span className="text-sm font-label font-bold uppercase tracking-widest text-primary">
                {user?.full_name}
              </span>
              <Link
                className="hidden md:block text-primary-container/70  hover:bg-surface-container-low transition-colors px-3 py-1 rounded-lg text-sm font-medium"
                href="#"
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
    </header>
  );
};

export default Header;
