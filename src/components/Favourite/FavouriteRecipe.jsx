import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import LogoLoader from "../../LogoLoader";
import { useCallback } from "react";

const FavouriteRecipe = ({ handleChangeRecipeNavToAllRecipes }) => {
  const [favRecipes, setFavRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tkn = localStorage.getItem("token");
  const userId = tkn ? jwtDecode(tkn).user_id : "guest";

  const fetchFavorites = useCallback(async () => {
    if (userId === "guest" || !userId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_RECIPE_APP_API}/favorites/getMyFavourite/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setFavRecipes(res.data.result || []);
    } catch (err) {
      console.error("Frontend Favourite Display Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (isLoading) return <LogoLoader />;

  const handleAddToFavorites = (recipeId) => {
    axios
      .post(
        `${import.meta.env.VITE_RECIPE_APP_API}/favorites/AddToFavourite`,
        {
          userId,
          recipeId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        if (response.status === 201 || response.status === 200) {
          alert(response.data.message);
          fetchFavorites();
        } else {
          alert("Something went wrong while adding recipe to favourite");
        }
      })
      .catch((error) => {
        alert(
          error.response?.data?.message ||
            "Something went wrong while adding recipe to favourite",
        );
        console.error("Error creating recipe: ", error);
      });
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-secondary/30 selection:text-on-surface">
      {/* <!-- Main Content --> */}
      <main className="pt-10 pb-20 px-6 max-w-7xl mx-auto">
        {/* <!-- Hero Header Section --> */}
        {userId === "guest" || !userId ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-32 h-32 bg-surface-container-high rounded-full flex items-center justify-center mb-8">
              <span
                className="material-symbols-outlined text-primary/20 text-6xl"
                data-icon="lock"
              >
                lock
              </span>
            </div>
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">
              Login Required
            </h2>
            <p className="text-on-surface-variant max-w-md mb-8">
              You need to be logged in to view your dynamic curated favorites
              collection. Access your account to preserve your saved recipes.
            </p>
            <Link
              to="/login"
              className="bg-primary rounded-full px-10 py-4 text-white font-label font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:scale-105 transition-transform editorial-shadow"
            >
              Sign In to Account
              <span
                className="material-symbols-outlined text-lg"
                data-icon="login"
              >
                login
              </span>
            </Link>
          </div>
        ) : favRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-32 h-32 bg-surface-container-high rounded-full flex items-center justify-center mb-8">
              <span
                className="material-symbols-outlined text-primary/20 text-6xl"
                data-icon="heart_broken"
              >
                heart_broken
              </span>
            </div>
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">
              No favorites yet
            </h2>
            <p className="text-on-surface-variant max-w-md mb-8">
              Your curated collection is currently empty. Start exploring our
              world-className recipes and save your favorites to see them here.
            </p>
            <button
              className="bg-secondary rounded-full px-10 py-4 text-white font-label font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:scale-105 transition-transform editorial-shadow"
              style={{
                backgroundColor:
                  "radial-gradient(circle at center, #fd712c, #a43d00)",
              }}
              onClick={handleChangeRecipeNavToAllRecipes}
            >
              Explore Recipes
              <span
                className="material-symbols-outlined text-lg"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favRecipes.map((fav, idx) => (
              <article
                className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-transform duration-500 hover:-translate-y-2"
                key={idx}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="A high-angle, gourmet shot of a vibrant Buddha bowl on a rustic stone table. The bowl is filled with roasted sweet potatoes, quinoa, fresh avocado slices, and crisp kale, illuminated by warm, directional kitchen lighting. The scene is styled for an editorial food magazine with a palette of deep forest greens and warm terracotta tones, exuding a healthy and premium culinary atmosphere."
                    src={fav.image_url}
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <button
                      className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all editorial-shadow"
                      onClick={() => handleAddToFavorites(fav.recipe_id)}
                    >
                      <span
                        className="material-symbols-outlined fill-icon"
                        data-icon="favorite"
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 relative -mt-12 bg-surface-container-lowest mx-4 rounded-xl editorial-shadow transition-all group-hover:mx-2">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-label font-bold px-2 py-0.5 rounded tracking-widest uppercase">
                      {fav.meal_type}
                    </span>
                    <div className="flex items-center gap-1 text-on-surface-variant/60 text-xs font-medium">
                      <span
                        className="material-symbols-outlined text-sm"
                        data-icon="schedule"
                      >
                        schedule
                      </span>
                      {fav.cooking_time + fav.preparation_time} min
                    </div>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-2 leading-tight">
                    {fav.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm line-clamp-2">
                    {fav.description}
                  </p>
                  <Link
                    className="mt-6 w-full py-3 bg-primary-form text-white rounded-lg font-label text-xs uppercase tracking-widest hover:bg-primary-form/90 transition-colors flex items-center justify-center gap-2 group/btn"
                    to={`/FullRecipe/${fav.recipe_id}`}
                  >
                    View Recipe
                    <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* <!-- Kitchen Mode Toggle FAB --> */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button className="glass-card px-8 py-4 rounded-full flex items-center gap-3 border border-white/20 editorial-shadow text-primary font-label font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
          <span
            className="material-symbols-outlined text-secondary"
            data-icon="restaurant_menu"
          >
            restaurant_menu
          </span>
          Kitchen Mode
        </button>
      </div>

      {/* <!-- Background Decoration --> */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-40">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-secondary-fixed/20 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
};

export default FavouriteRecipe;
