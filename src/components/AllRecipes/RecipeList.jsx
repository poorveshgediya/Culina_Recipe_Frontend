import React, { useEffect, useState } from "react";
import RecipeView from "./RecipeView";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

  const handleRecipeCategoryClick = (category) => {
    setSelectedRecipe({ ...selectedRecipe, selectedCategorie: category });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const jwttkn = jwtDecode(token);
      setUserinfo(jwttkn.role);
    }
  }, []);

  return (
    <div className="max-w-360 mx-auto flex h-[calc(100vh-64px)] overflow-hidden">
      {/* <!-- Sidebar Filter Panel --> */}
      <aside className="w-64 border-r border-primary/10 p-6 hidden lg:flex flex-col justify-between gap-8 shrink-0 h-full overflow-y-auto">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Categories
          </h3>
          <nav className="flex flex-col gap-1">
            <a
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${selectedRecipe.selectedCategorie === "all" ? "active-sidebar-item" : "text-slate-600 hover:bg-slate-100"} transition-all delay-75 font-semibold`}
              href="#"
              onClick={() => handleRecipeCategoryClick("all")}
            >
              <span className="material-symbols-outlined text-xl">
                restaurant
              </span>
              <span className="text-sm">Explore All</span>
            </a>
            <a
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${selectedRecipe.selectedCategorie === "anytime" ? "active-sidebar-item" : "text-slate-600 hover:bg-slate-100 "} transition-all delay-75 font-semibold`}
              href="#"
              onClick={() => handleRecipeCategoryClick("anytime")}
            >
              <span className="material-symbols-outlined text-xl">
                local_dining
              </span>
              <span className="text-sm">AnyTime</span>
            </a>
            <a
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${selectedRecipe.selectedCategorie === "breakfast" ? "active-sidebar-item" : "text-slate-600 hover:bg-slate-100 "} transition-all delay-75 font-semibold`}
              href="#"
              onClick={() => handleRecipeCategoryClick("breakfast")}
            >
              <span className="material-symbols-outlined text-xl">egg_alt</span>
              <span className="text-sm">Breakfast</span>
            </a>
            <a
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${selectedRecipe.selectedCategorie === "lunch" ? "active-sidebar-item" : "text-slate-600 hover:bg-slate-100 "} transition-all delay-75 font-semibold`}
              href="#"
              onClick={() => handleRecipeCategoryClick("lunch")}
            >
              <span className="material-symbols-outlined text-xl">sunny</span>
              <span className="text-sm">Lunch</span>
            </a>
            <a
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${selectedRecipe.selectedCategorie === "dinner" ? "active-sidebar-item" : "text-slate-600 hover:bg-slate-100 "} transition-all delay-75 font-semibold`}
              href="#"
              onClick={() => handleRecipeCategoryClick("dinner")}
            >
              <span className="material-symbols-outlined text-xl">
                dark_mode
              </span>
              <span className="text-sm">Dinner</span>
            </a>
          </nav>
        </div>
        {userinfo === "admin" && (
          <Link
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white hover:bg-background-light hover:text-slate-600 transition-all font-semibold"
            to={"/admin"}
          >
            <span className="material-symbols-outlined text-xl">
              open_in_new
            </span>
            <span className="text-sm">Admin Dashboard</span>
          </Link>
        )}
      </aside>

      {/* <!-- Main Content Area --> */}
      <main className="flex-1 p-6 lg:p-10 h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* <!-- Content Header --> */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Recipe Discoveries
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-100  p-1 rounded-lg self-start max-sm:hidden">
            <button
              className={`${recipeView.gridView ? "p-2 rounded-md bg-white  shadow-sm text-primary transition-all duration-300" : "p-2 rounded-md hover:bg-white  transition-all duration-300"}`}
              onClick={() => setRecipeView({ ...recipeView, gridView: true })}
            >
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button
              className={`${!recipeView.gridView ? "p-2 rounded-md bg-white  shadow-sm text-primary transition-all duration-300" : "p-2 rounded-md hover:bg-white  transition-all duration-300"}`}
              onClick={() => setRecipeView({ ...recipeView, gridView: false })}
            >
              <span className="material-symbols-outlined">list</span>
            </button>
          </div>
        </div>
        {/* <!-- List Controls --> */}
        <div className="flex flex-wrap gap-3 mb-6">
          <label className="flex items-center gap-2 px-4 py-2 bg-white  border border-slate-200  rounded-lg text-sm font-medium">
            <select
              value={selectedRecipe.newORold}
              onChange={(e) => {
                setSelectedRecipe({
                  ...selectedRecipe,
                  newORold: e.target.value,
                });
              }}
            >
              <option value={"new"}>Newest</option>
              <option value={"old"}>Oldest</option>
            </select>
          </label>
          <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium">
            <select
              value={selectedRecipe.underMinutes}
              onChange={(e) =>
                setSelectedRecipe({
                  ...selectedRecipe,
                  underMinutes: e.target.value,
                })
              }
            >
              <option value="">Filter by Cooking Time</option>
              <option value={"30"}>Under 30 mins</option>
              <option value={"45"}>Under 45 mins</option>
              <option value={"60"}>Under 60 mins</option>
            </select>
          </label>
        </div>

        {/* <!-- List View Rows --> */}
        <div
          className={`${recipeView.gridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000" : "flex flex-col gap-4 transition-all duration-1000"}`}
        >
          {/* <!-- Recipe Row --> */}
          <RecipeView recipeView={recipeView} selectedRecipe={selectedRecipe} />
        </div>
      </main>
    </div>
  );
};
export default RecipeList;
