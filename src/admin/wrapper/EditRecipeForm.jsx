import axios from "axios";
import React, { useState } from "react";

const EditRecipeForm = ({ recipe, closeEditForm }) => {
  const [recipeData, setRecipeData] = useState({
    title: recipe.title,
    description: recipe.description,
    cooking_time: recipe.cooking_time,
    preparation_time: recipe.preparation_time,
    meal_type: recipe.meal_type,
    difficulty_level: recipe.difficulty_level,
    image_url: recipe.image_url,
    Calories: recipe.Calories,
    Protein: recipe.Protein,
    Fats: recipe.Fats,
    Carbs: recipe.Carbs,
    tips: recipe.tips,
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : JSON.parse(recipe.ingredients || "[]"),
    process: Array.isArray(recipe.process)
      ? recipe.process
      : JSON.parse(recipe.process || "[]"),
    creator_name: recipe.creator_name,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = () => {
    setIsLoading(true);
    axios
      .patch(`${import.meta.env.VITE_RECIPE_APP_API}/recipes/updateRecipe`, {
        recipeData,
        id: recipe.recipe_id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        closeEditForm(); // Close the form after saving
      })
      .catch((error) => {
        alert(
          error.response?.data?.message ||
            "Failed to update recipe. Check if the server is running.",
        );
        console.error("Error updating recipe:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteIngredient = (index) => {
    setRecipeData({
      ...recipeData,
      ingredients: recipeData.ingredients.filter((_, i) => i !== index),
    });
  };

  const handleDeleteProcessStep = (index) => {
    setRecipeData({
      ...recipeData,
      process: recipeData.process.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary/20 backdrop-blur-sm">
        <div className="w-full max-w-6xl bg-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-180 overflow-y-auto">
          <main className=" w-full min-h-screen bg-surface p-12 max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="text-secondary font-label text-[10px] uppercase tracking-[0.2em] font-bold">
                Administrative Interface
              </span>
              <h1 className="font-display text-5xl text-primary font-bold tracking-tight mt-2">
                Edit Recipe: <span className="italic">{recipeData.title}</span>
              </h1>
            </div>
            {/* <!-- Form Grid --> */}
            <div className="grid grid-cols-12 gap-12">
              {/* <!-- Main Editorial Section --> */}
              <div className="col-span-12 lg:col-span-8 space-y-12">
                <section className="bg-surface-container-lowest p-10 rounded-xl border border-outline-variant/10 shadow-sm">
                  <div className="grid gap-8">
                    <div className="space-y-1">
                      <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                        Recipe Title
                      </label>
                      <input
                        className="editorial-input w-full font-display text-3xl text-primary italic"
                        type="text"
                        value={recipeData.title}
                        onChange={(e) =>
                          setRecipeData({
                            ...recipeData,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                        Creator
                      </label>
                      <input
                        className="editorial-input w-full font-body text-lg"
                        type="text"
                        value={recipeData.creator_name}
                        onChange={(e) =>
                          setRecipeData({
                            ...recipeData,
                            creator_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                        The Narrative
                      </label>
                      <textarea
                        className="editorial-input w-full font-body text-base leading-relaxed"
                        placeholder="Tell the story behind this dish..."
                        rows="4"
                        value={recipeData.description}
                        onChange={(e) =>
                          setRecipeData({
                            ...recipeData,
                            description: e.target.value,
                          })
                        }
                      >
                        {recipeData.description}
                      </textarea>
                    </div>
                  </div>
                </section>
                {/* <!-- Hero Image Section --> */}
                <section className="relative group">
                  <div className="aspect-[16/7] w-full rounded-xl overflow-hidden bg-surface-container-high relative">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="dramatic close-up of charred octopus tentacle on a dark stone plate with bright yellow saffron sauce droplets and herbs"
                      src={recipeData.image_url}
                    />
                  </div>
                </section>
                {/* <!-- Ingredients --> */}
                <section className="space-y-6">
                  <div className="flex justify-between items-end border-b border-outline-variant/30 pb-2">
                    <h2 className="font-display text-2xl font-bold text-primary italic">
                      Ingredients
                    </h2>
                    <button
                      className="text-secondary font-label text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 hover:opacity-70 transition-all"
                      onClick={() =>
                        setRecipeData({
                          ...recipeData,
                          ingredients: [...recipeData.ingredients, ""],
                        })
                      }
                    >
                      <span className="material-symbols-outlined text-sm">
                        add_circle
                      </span>
                      Add Ingredient
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {recipeData.ingredients.map((ingredient, index) => (
                      <div
                        className="flex items-center gap-4 group"
                        key={index}
                      >
                        <input
                          className="editorial-input flex-1 font-body text-sm"
                          type="text"
                          value={ingredient}
                          onChange={(e) => {
                            const newIngredients = [...recipeData.ingredients];
                            newIngredients[index] = e.target.value;
                            setRecipeData({
                              ...recipeData,
                              ingredients: newIngredients,
                            });
                          }}
                        />
                        <button
                          className="opacity-0 group-hover:opacity-100 text-error"
                          onClick={() => handleDeleteIngredient(index)}
                        >
                          <span
                            className="material-symbols-outlined"
                            data-icon="delete"
                          >
                            delete
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
                {/* <!-- Preparation Steps --> */}
                <section className="space-y-8">
                  <div className="flex justify-between items-end border-b border-outline-variant/30 pb-2">
                    <h2 className="font-display text-2xl font-bold text-primary italic">
                      Preparation Steps
                    </h2>
                    <button
                      className="text-secondary font-label text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 hover:opacity-70 transition-all"
                      onClick={() =>
                        setRecipeData({
                          ...recipeData,
                          process: [...recipeData.process, ""],
                        })
                      }
                    >
                      <span className="material-symbols-outlined text-sm">
                        add_task
                      </span>
                      Add Step
                    </button>
                  </div>
                  <div className="space-y-12">
                    {recipeData.process.map((step, index) => (
                      // {(JSON.parse(recipeData.process)).map((step, index) => (
                      <div className="relative pl-16 flex group" key={index}>
                        <span className="absolute left-0 top-0 text-7xl font-display font-bold text-primary/5 select-none">
                          0{index + 1}
                        </span>
                        <div className="space-y-2 flex-1">
                          <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                            The Blanch
                          </label>
                          <textarea
                            className="editorial-input w-full font-body text-base leading-relaxed"
                            rows="2"
                            value={step}
                            onChange={(e) => {
                              const newProcess = [...recipeData.process];
                              newProcess[index] = e.target.value;
                              setRecipeData({
                                ...recipeData,
                                process: newProcess,
                              });
                            }}
                          ></textarea>
                        </div>
                        <button
                          className="opacity-0 group-hover:opacity-100 text-error"
                          onClick={() => handleDeleteProcessStep(index)}
                        >
                          <span
                            className="material-symbols-outlined"
                            data-icon="delete"
                          >
                            delete
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              {/* <!-- Sidebar Content --> */}
              <div className="col-span-12 lg:col-span-4 space-y-8">
                {/* <!-- Recipe Meta Bento --> */}
                <div className="bg-surface-container-low p-8 rounded-xl space-y-8">
                  <h3 className="font-display text-xl font-bold text-primary italic border-b border-outline-variant/30 pb-2">
                    Recipe Meta
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                        Cook Time
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          className="editorial-input w-full text-sm"
                          type="text"
                          value={recipeData.cooking_time}
                          onChange={(e) =>
                            setRecipeData({
                              ...recipeData,
                              cooking_time: e.target.value,
                            })
                          }
                        />
                        <span className="text-[10px] font-label font-bold text-on-surface-variant">
                          MIN
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                        Prep Time
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          className="editorial-input w-full text-sm"
                          type="text"
                          value={recipeData.preparation_time}
                          onChange={(e) =>
                            setRecipeData({
                              ...recipeData,
                              preparation_time: e.target.value,
                            })
                          }
                        />
                        <span className="text-[10px] font-label font-bold text-on-surface-variant">
                          MIN
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                        Level
                      </label>
                      <select className="editorial-input w-full text-sm appearance-none cursor-pointer">
                        <option>{recipeData.difficulty_level}</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                        Meal Type
                      </label>
                      <select className="editorial-input w-full text-sm appearance-none cursor-pointer">
                        <option>{recipeData.meal_type}</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* <!-- Nutrition Profile Card --> */}
                <div className="bg-primary text-on-primary p-8 rounded-xl shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-on-primary/5 rounded-full blur-2xl"></div>
                  <h3 className="font-display text-xl font-bold italic mb-6">
                    Nutrition Profile
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-on-primary/10 pb-2">
                      <span className="font-label text-[10px] uppercase tracking-widest">
                        Calories
                      </span>
                      <input
                        className="bg-transparent border-none p-0 text-right font-body text-sm w-12 focus:ring-0"
                        type="text"
                        value={recipeData.Calories}
                        onChange={(e) =>
                          setRecipeData({
                            ...recipeData,
                            Calories: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center border-b border-on-primary/10 pb-2">
                      <span className="font-label text-[10px] uppercase tracking-widest">
                        Protein (g)
                      </span>
                      <input
                        className="bg-transparent border-none p-0 text-right font-body text-sm w-12 focus:ring-0"
                        type="text"
                        value={recipeData.Protein}
                        onChange={(e) =>
                          setRecipeData({
                            ...recipeData,
                            Protein: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center border-b border-on-primary/10 pb-2">
                      <span className="font-label text-[10px] uppercase tracking-widest">
                        Fats (g)
                      </span>
                      <input
                        className="bg-transparent border-none p-0 text-right font-body text-sm w-12 focus:ring-0"
                        type="text"
                        value={recipeData.Fats}
                        onChange={(e) =>
                          setRecipeData({ ...recipeData, Fats: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center border-b border-on-primary/10 pb-2">
                      <span className="font-label text-[10px] uppercase tracking-widest">
                        Carbs (g)
                      </span>
                      <input
                        className="bg-transparent border-none p-0 text-right font-body text-sm w-12 focus:ring-0"
                        type="text"
                        value={recipeData.Carbs}
                        onChange={(e) =>
                          setRecipeData({
                            ...recipeData,
                            Carbs: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- Pro Tip Section --> */}
                <div className="bg-secondary-fixed text-on-secondary-fixed p-8 rounded-xl border border-secondary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      restaurant_menu
                    </span>
                    <h3 className="font-display text-xl font-bold italic">
                      Chef's Pro Tip
                    </h3>
                  </div>
                  <textarea
                    className="w-full bg-transparent border-none font-body text-sm leading-relaxed p-0 italic focus:ring-0"
                    placeholder="Secret kitchen wisdom..."
                    rows="4"
                    value={recipeData.tips}
                    onChange={(e) =>
                      setRecipeData({ ...recipeData, tips: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-error text-on-error px-6 py-3 rounded-full font-label uppercase tracking-widest text-[10px] font-bold hover:bg-error/90 transition-all"
                    onClick={() => {
                      closeEditForm(); // Close the form after saving
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary text-on-primary px-6 py-3 rounded-full font-label uppercase tracking-widest text-[10px] font-bold hover:bg-primary/90 transition-all"
                    onClick={() => {
                      handleSaveChanges();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
                {/* <!-- Kitchen Mode Toggle --> */}
                <div className="fixed bottom-12 right-12 z-50">
                  <div className="bg-white/80 backdrop-blur-xl p-4 rounded-full shadow-xl border border-outline-variant/30 flex items-center gap-6 px-8">
                    <span className="font-label text-[10px] uppercase tracking-widest font-bold text-primary">
                      Kitchen Mode
                    </span>
                    <button className="w-12 h-6 bg-surface-container-highest rounded-full relative p-1 transition-colors hover:bg-secondary/20">
                      <div className="w-4 h-4 bg-secondary rounded-full absolute right-1 top-1 shadow-sm"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EditRecipeForm;
