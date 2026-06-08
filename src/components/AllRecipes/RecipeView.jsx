import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoLoader from "./../../LogoLoader";

const RecipeView = ({ recipeView, selectedRecipe }) => {
  const [recipes, setRecipes] = useState([]);
  const [listSkeleton, setListSkeleton] = useState(false);

  const tkn = localStorage.getItem("token");
  const userId = tkn ? jwtDecode(tkn).user_id : "guest";

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_RECIPE_APP_API}/recipes/showRecipes/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            category: selectedRecipe.selectedCategorie,
            sort: selectedRecipe.newORold,
            time: selectedRecipe.underMinutes,
          },
        },
      );
      const data = await response.data;
      setRecipes(data.rows);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [selectedRecipe]);

  useEffect(() => {
    setListSkeleton(true);
    fetchRecipes();
  }, [fetchRecipes]);

  if (recipes.length === 0) return <LogoLoader />;

  const handleAddToFavorites = async (recipeId) => {
    await axios
      .post(`${import.meta.env.VITE_RECIPE_APP_API}/favorites/AddToFavourite`, {
        userId,
        recipeId,
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          alert(response.data.message);
          fetchRecipes();
        } else {
          alert("Something went wrong while adding recipe to favourite");
        }
      })
      .catch((error) => {
        alert(
          error.response?.data?.message ||
            "Something went wrong while adding recipe to favourite",
        );
      });
  };

  return (
    <>
      {recipes.map((r, i) => (
        <div
          className={` bg-white rounded-xl border hover:shadow-lg ${recipeView.gridView ? "recipe-card group border-primary/5 shadow-sm transition-all duration-300 flex flex-col justify-between" : "group flex flex-col md:flex-row items-center gap-6 p-4 border border-transparent hover:border-primary/20 transition-all"}`}
          key={i}
        >
          <div
            className={` ${recipeView.gridView ? "relative h-48 overflow-hidden" : "w-full md:w-48 aspect-video md:aspect-[4/3] rounded-lg overflow-hidden bg-slate-200"}`}
          >
            <img
              alt={`${r.title}`}
              className={` w-full h-full object-cover ${recipeView.gridView ? "recipe-img transition-transform duration-500 " : "group-hover:scale-105 transition-transform"}`}
              data-alt="Close-up of spicy avocado toast on rustic bread"
              src={r.image_url}
            />
            {recipeView.gridView && (
              <>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-900 uppercase">
                    {r.meal_type}
                  </span>
                </div>
                {userId !== "guest" && (
                  <button
                    className={`absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full ${r.is_favourited ? "text-primary" : "text-slate-400 hover:text-primary transition-colors"}`}
                    onClick={() => handleAddToFavorites(r.recipe_id)}
                  >
                    <span
                      className={`material-symbols-outlined text-xl ${r.is_favourited ? "fill-icon" : ""}`}
                    >
                      favorite
                    </span>
                  </button>
                )}
                <div className="absolute bottom-3 left-3">
                  <span className="flex items-center gap-1 px-2 py-1 bg-primary text-white rounded-lg text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>{" "}
                    {r.preparation_time + r.cooking_time} mins
                  </span>
                </div>
              </>
            )}
          </div>
          <div
            className={` ${recipeView.gridView ? "p-4 flex flex-col justify-between" : "flex-1 w-full"}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3
                  className={`text-slate-900  ${recipeView.gridView} ? "font-bold mb-1 leading-tight group-hover:text-primary transition-colors" : "text-lg font-bold group-hover:text-primary transition-colors"}`}
                >
                  {r.title}
                </h3>
                {!recipeView.gridView && (
                  <p className="text-sm text-slate-500 line-clamp-1">
                    {r.description}
                  </p>
                )}
              </div>
              {!recipeView.gridView && userId !== "guest" && (
                <button
                  className={`${r.is_favourited ? "text-primary" : "text-slate-300 hover:text-primary transition-colors"}`}
                  onClick={() => handleAddToFavorites(r.recipe_id)}
                >
                  <span
                    className={`material-symbols-outlined text-2xl ${r.is_favourited ? "fill-icon" : ""}`}
                  >
                    favorite
                  </span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-wide">
              {!recipeView.gridView && (
                <>
                  <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md">
                    {r.meal_type}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="material-symbols-outlined text-base">
                      schedule
                    </span>
                    {r.preparation_time + r.cooking_time} mins
                  </div>
                </>
              )}
              <div className="flex items-center gap-1 text-slate-500">
                <span className="material-symbols-outlined text-base">
                  local_fire_department
                </span>
                {r.Calories} kcal
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <span className="material-symbols-outlined text-base">
                  monitoring
                </span>
                {r.difficulty_level}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0 max-[768px]:w-full">
            <Link
              to={`/FullRecipe/${r.recipe_id}`}
              className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-6 py-2 rounded-lg text-sm font-bold transition-all text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecipeView;
