import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import LogoLoader from "../LogoLoader";

const FullRecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const params = useParams();
  const recipeId = params.id;

  const fetchRecipe = useCallback(() => {
    if (!recipeId) return;
    axios
      .get(
        `${import.meta.env.VITE_RECIPE_APP_API}/recipes/showRecipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((response) => {
        setRecipe(response.data.rows[0]);
      })
      .catch((error) => {
        const errmsg = error.response.data.message || "Error fetching recipe";
        alert(errmsg);
        console.error("Error fetching recipe:", error);
      });
  }, [recipeId]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  if (!recipe) return <LogoLoader />;

  return (
    <div>
      <div>
        <div className="bg-background-light text-slate-900  min-h-screen">
          <main className="max-w-7xl mx-auto px-6 py-8">
            {/* <!-- Breadcrumbs --> */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 print:hidden">
              <Link className="hover:text-primary" to="/">
                Home
              </Link>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <Link className="hover:text-primary" to="/AllRecipeList">
                Recipes
              </Link>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <span className="hover:text-primary">{recipe.meal_type}</span>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <span className="text-slate-900  font-medium">
                {recipe.title}
              </span>
            </nav>

            {/* <!-- Hero Section --> */}
            <div className="relative w-full h-125 rounded-xl overflow-hidden mb-10 shadow-2xl group">
              <img
                className="w-full h-full absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                data-alt="Glistening honey glazed salmon with roasted vegetables"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)`,
                }}
                src={recipe.image_url}
                alt={recipe.title}
              />
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {recipe.title}
                  </h1>
                  <div className="flex flex-wrap gap-6 text-white/90">
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="material-symbols-outlined text-primary">
                        schedule
                      </span>
                      <span className="text-sm font-medium">
                        Prep: {recipe.preparation_time} • Cook:{" "}
                        {recipe.cooking_time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="material-symbols-outlined text-primary">
                        restaurant
                      </span>
                      <span className="text-sm font-medium">
                        Serves {recipe.servings}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="material-symbols-outlined text-primary">
                        signal_cellular_alt
                      </span>
                      <span className="text-sm font-medium">
                        {recipe.difficulty_level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 print:hidden">
                  <button className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-all shadow-lg">
                    <span className="material-symbols-outlined">
                      play_circle
                    </span>
                    Cook Mode
                  </button>
                  <button
                    className="p-3 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white hover:text-primary transition-all"
                    onClick={() => window.print()}
                  >
                    <span className="material-symbols-outlined">print</span>
                  </button>
                  <button className="p-3 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white hover:text-primary transition-all">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* <!-- Left Column: Ingredients --> */}
              <div className="lg:col-span-4 space-y-8">
                <section className="bg-white  p-8 rounded-xl shadow-sm border border-primary/5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold font-serif italic text-primary">
                      Ingredients
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {recipe.ingredients.map((ingredients, idx) => (
                      <li className="flex items-start gap-3 group" key={idx}>
                        <input
                          className="mt-1 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20"
                          type="checkbox"
                        />
                        <span className="text-slate-700 leading-tight">
                          {ingredients}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
                {/* <!-- Nutrition Benefits Card --> */}
                <section className="sticky top-24 bg-primary/5  p-8 rounded-xl border border-primary/20">
                  <h3 className="text-xl font-bold font-serif italic text-slate-900 mb-6">
                    Nutrition Benefits
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                      <span className="block text-2xl font-bold text-primary">
                        {recipe.Calories}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                        Calories
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                      <span className="block text-2xl font-bold text-slate-800">
                        {recipe.Protein}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                        Protein
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                      <span className="block text-2xl font-bold text-slate-800">
                        {recipe.Fats}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                        Fats
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                      <span className="block text-2xl font-bold text-slate-800">
                        {recipe.Carbs}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                        Carbs
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-primary/10">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary">
                        verified
                      </span>
                      <p className="text-sm text-slate-600 leading-relaxed italic">
                        {/* "{recipe.nutrition.note}" */}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* <!-- Right Column: Instructions --> */}
              <div className="lg:col-span-8 space-y-12 pb-20">
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-3xl font-bold font-serif italic text-slate-900">
                      Preparation Steps
                    </h3>
                    <div className="h-px flex-1 bg-slate-200"></div>
                  </div>
                  <div className="space-y-12">
                    {recipe.process.map((step, index) => (
                      <div className="flex gap-8 group" key={index}>
                        <div className="shrink-0">
                          <span className="text-5xl font-serif italic font-bold text-primary/30 group-hover:text-primary transition-colors duration-500">
                            {index + 1}
                          </span>
                        </div>
                        <div className="space-y-4">
                          {/* <h4 className="text-xl font-bold text-slate-900 ">
                            Step {index + 1}
                          </h4> */}
                          <p className="text-slate-600 leading-relaxed text-lg">
                            {step}
                          </p>
                          {/* {step.image && (
                            <div
                              className="w-full h-64 rounded-xl bg-cover bg-center shadow-md"
                              data-alt="A bowl of honey garlic glaze being whisked"
                              style={{
                                backgroundImage: `url('${step.image}')`,
                              }}
                            ></div>
                          )} */}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* <!-- Tips Section --> */}
                <section className="bg-slate-100  p-8 rounded-xl border-l-4 border-primary">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">
                      tips_and_updates
                    </span>
                    Chef's Notes
                  </h3>
                  <div>
                    <span className="font-bold text-sm text-primary uppercase">
                      Pro Tip
                    </span>
                    <p className="text-slate-600 text-sm">{recipe.tips}</p>
                  </div>
                </section>
              </div>
            </div>
          </main>

          {/* <!-- Footer Action Bar (Mobile/Tablet visible only) --> */}
          <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white  border-t border-slate-200  p-4 flex items-center justify-between z-50 print:hidden">
            <button className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg flex-1 mr-4">
              <span className="material-symbols-outlined">play_circle</span>
              Start Cooking
            </button>
            <div className="flex gap-2">
              <button className="p-3 border border-slate-200  rounded-lg">
                <span className="material-symbols-outlined text-slate-600 ">
                  favorite
                </span>
              </button>
              <button className="p-3 border border-slate-200  rounded-lg">
                <span className="material-symbols-outlined text-slate-600 ">
                  share
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullRecipePage;
