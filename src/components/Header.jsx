import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "./SearchContextProvider";

const Header = ({
  user,
  handleCreateUserClick,
  handleChangeRecipeNavToFavouriteRecipes,
  handleChangeRecipeNavToAllRecipes,
  recipeNav,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { searchText, setSearchText } = useContext(SearchContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/90 backdrop-blur-md">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-10 py-3">
        {/* First row */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            className="flex items-center gap-2 text-primary shrink-0"
            to="/"
          >
            <span className="material-symbols-outlined text-3xl font-bold">
              cooking
            </span>

            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              CulinaShare
            </h1>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              type="button"
              className={`text-sm ${
                recipeNav === "AllRecipes"
                  ? "font-semibold text-primary"
                  : "font-medium text-slate-600 hover:text-primary"
              } transition-colors`}
              onClick={handleChangeRecipeNavToAllRecipes}
            >
              All Recipes
            </button>

            <button
              type="button"
              className={`text-sm ${
                recipeNav === "FavouriteRecipes"
                  ? "font-semibold text-primary"
                  : "font-medium text-slate-600 hover:text-primary"
              } transition-colors`}
              onClick={handleChangeRecipeNavToFavouriteRecipes}
            >
              Favorites
            </button>
          </nav>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-md items-center relative">
            <span
              className="material-symbols-outlined absolute left-3 text-slate-400"
              aria-hidden="true"
            >
              search
            </span>

            <input
              className="w-full bg-slate-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
              placeholder="Search recipes, ingredients..."
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-4">
            {user && (
              <button
                type="button"
                className="flex bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all items-center gap-2"
                onClick={handleCreateUserClick}
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span className="hidden xl:inline">Create Recipe</span>
              </button>
            )}

            {!user ? (
              <Link
                to="/login"
                className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold uppercase">
                  {user.short_name}
                </div>

                <span className="hidden xl:block max-w-40 truncate text-sm font-bold uppercase tracking-wider text-primary">
                  {user.full_name}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    aria-hidden="true"
                  >
                    logout
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile user and hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {!user ? (
              <Link
                to="/login"
                className="px-3 py-2 bg-primary text-white font-bold rounded-lg text-sm"
              >
                Login
              </Link>
            ) : (
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold uppercase">
                {user.short_name}
              </div>
            )}

            <button
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span
                className="material-symbols-outlined text-2xl"
                aria-hidden="true"
              >
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Search on phones */}
        <div className="md:hidden mt-3 relative">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            search
          </span>

          <input
            className="w-full bg-slate-100 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
            placeholder="Search recipes, ingredients..."
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`lg:hidden overflow-hidden bg-white border-primary/10 transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96 opacity-100 border-t"
            : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <nav className="max-w-360 mx-auto p-4 flex flex-col gap-2">
          <button
            type="button"
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              recipeNav === "AllRecipes"
                ? "bg-primary/10 text-primary"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            onClick={() => {
              handleChangeRecipeNavToAllRecipes();
              closeMenu();
            }}
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span className="text-sm font-semibold">All Recipes</span>
          </button>

          <button
            type="button"
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              recipeNav === "FavouriteRecipes"
                ? "bg-primary/10 text-primary"
                : "text-slate-700 hover:bg-slate-100"
            }`}
            onClick={() => {
              handleChangeRecipeNavToFavouriteRecipes();
              closeMenu();
            }}
          >
            <span className="material-symbols-outlined">favorite</span>
            <span className="text-sm font-semibold">Favorites</span>
          </button>

          {user && (
            <>
              <button
                type="button"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary hover:bg-primary/10"
                onClick={() => {
                  handleCreateUserClick();
                  closeMenu();
                }}
              >
                <span className="material-symbols-outlined">add</span>
                <span className="text-sm font-semibold">Create Recipe</span>
              </button>

              <div className="my-1 border-t border-slate-200" />

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
        </nav>
      </div>
    </header>
  );
};

export default Header;
