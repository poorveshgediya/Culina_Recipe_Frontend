import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import RecipeView from "./RecipeView";

const categories = [
  {
    value: "all",
    label: "Explore All",
    icon: "restaurant",
  },
  {
    value: "anytime",
    label: "AnyTime",
    icon: "local_dining",
  },
  {
    value: "breakfast",
    label: "Breakfast",
    icon: "egg_alt",
  },
  {
    value: "lunch",
    label: "Lunch",
    icon: "sunny",
  },
  {
    value: "dinner",
    label: "Dinner",
    icon: "dark_mode",
  },
];

const RecipeList = () => {
  const [recipeView, setRecipeView] = useState({
    gridView: false,
  });

  const [selectedRecipe, setSelectedRecipe] = useState({
    selectedCategorie: "all",
    newORold: "new",
    underMinutes: "",
  });

  const [userinfo, setUserinfo] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      setUserinfo(decodedToken.role);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }, []);

  // Prevent background scrolling while drawer is open
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  const handleRecipeCategoryClick = (category) => {
    setSelectedRecipe((previous) => ({
      ...previous,
      selectedCategorie: category,
    }));

    setIsFilterOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col justify-between gap-8 h-full">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Categories
        </h3>

        <nav className="flex flex-col gap-1">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left ${
                selectedRecipe.selectedCategorie === category.value
                  ? "active-sidebar-item"
                  : "text-slate-600 hover:bg-slate-100"
              } transition-all duration-200 font-semibold`}
              onClick={() => handleRecipeCategoryClick(category.value)}
            >
              <span className="material-symbols-outlined text-xl">
                {category.icon}
              </span>

              <span className="text-sm">{category.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {userinfo === "admin" && (
        <Link
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all font-semibold"
          to="/admin"
          onClick={() => setIsFilterOpen(false)}
        >
          <span className="material-symbols-outlined text-xl">open_in_new</span>
          <span className="text-sm">Admin Dashboard</span>
        </Link>
      )}
    </div>
  );

  return (
    <div className="max-w-360 mx-auto flex min-h-[calc(100vh-64px)]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-primary/10 p-6">
        <div className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile overlay */}
      {isFilterOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-[60] bg-slate-950/40"
          onClick={() => setIsFilterOpen(false)}
          aria-label="Close filters"
        />
      )}

      <aside
        id="mobile-filter-panel"
        className={`lg:hidden fixed top-0 left-0 z-[70] h-dvh w-[85%] max-w-xs bg-white p-5 shadow-2xl transition-transform duration-300 flex flex-col ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isFilterOpen}
      >
        <div className="shrink-0 flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Recipe
            </p>

            <h2 className="text-lg font-bold text-slate-900">Filters</h2>
          </div>

          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            aria-label="Close filters"
            className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10">
        {/* Heading and controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Recipe Discoveries
          </h2>

          <div className="flex items-center gap-2">
            {/* Mobile filter button */}
            <button
              type="button"
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700"
              onClick={() => setIsFilterOpen(true)}
              aria-label="Open recipe filters"
              aria-expanded={isFilterOpen}
              aria-controls="mobile-filter-panel"
            >
              <span className="material-symbols-outlined text-xl">
                filter_list
              </span>
              Filters
            </button>

            {/* Grid/list controls */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                aria-label="Grid view"
                className={`p-2 rounded-md ${
                  recipeView.gridView
                    ? "bg-white shadow-sm text-primary"
                    : "hover:bg-white text-slate-500"
                } transition-all`}
                onClick={() =>
                  setRecipeView((previous) => ({
                    ...previous,
                    gridView: true,
                  }))
                }
              >
                <span className="material-symbols-outlined">grid_view</span>
              </button>

              <button
                type="button"
                aria-label="List view"
                className={`p-2 rounded-md ${
                  !recipeView.gridView
                    ? "bg-white shadow-sm text-primary"
                    : "hover:bg-white text-slate-500"
                } transition-all`}
                onClick={() =>
                  setRecipeView((previous) => ({
                    ...previous,
                    gridView: false,
                  }))
                }
              >
                <span className="material-symbols-outlined">list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 mb-6">
          <label className="block">
            <span className="sr-only">Sort recipes</span>

            <select
              className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium"
              value={selectedRecipe.newORold}
              onChange={(event) =>
                setSelectedRecipe((previous) => ({
                  ...previous,
                  newORold: event.target.value,
                }))
              }
            >
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Filter by cooking time</span>

            <select
              className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium"
              value={selectedRecipe.underMinutes}
              onChange={(event) =>
                setSelectedRecipe((previous) => ({
                  ...previous,
                  underMinutes: event.target.value,
                }))
              }
            >
              <option value="">Filter by Cooking Time</option>
              <option value="30">Under 30 mins</option>
              <option value="45">Under 45 mins</option>
              <option value="60">Under 60 mins</option>
            </select>
          </label>
        </div>

        {/* Recipes */}
        <div
          className={
            recipeView.gridView
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
              : "flex flex-col gap-4"
          }
        >
          <RecipeView recipeView={recipeView} selectedRecipe={selectedRecipe} />
        </div>
      </main>
    </div>
  );
};

export default RecipeList;
