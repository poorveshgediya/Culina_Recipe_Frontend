import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import LogoLoader from "../../LogoLoader";

const Featured = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RECIPE_APP_API}/recipes/showThreeRecipes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.data;
        setRecipes(data.rows);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-800 text-slate-900 font-display">
              Popular This Week
            </h2>
            <p className="text-slate-500 mt-1">
              Trending recipes that everyone is talking about.
            </p>
          </div>
          <Link
            to={"/AllRecipeList"}
            className="flex items-center gap-2 text-primary font-bold hover:underline"
          >
            View All Recipes
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        {loading ? (
          <LogoLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((RecipeData, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt={`${RecipeData.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Healthy Buddha bowl with avocado and quinoa"
                    src={RecipeData.image_url}
                  />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-md">
                      {RecipeData.meal_type}
                    </span>
                    <span className="px-3 py-1 bg-black/60 text-white text-[10px] font-bold uppercase rounded-md backdrop-blur-sm">
                      {RecipeData.cooking_time + RecipeData.preparation_time}{" "}
                      mins
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {RecipeData.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {RecipeData.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                        <img
                          alt="Author"
                          className="w-full h-full object-cover"
                          data-alt="Chef portrait profile picture"
                          // src={RecipeData.author.image}
                        />
                      </div>
                      <span className="text-xs font-semibold">
                        {RecipeData.creator_name}
                      </span>
                    </div>
                    <Link
                      to={`/FullRecipe/${RecipeData.recipe_id}`}
                      className="text-primary text-sm font-bold flex items-center gap-1"
                    >
                      View Recipe{" "}
                      <span className="material-symbols-outlined text-sm">
                        chevron_right
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Featured;
