import axios from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const parseArray = (value) => {
  if (Array.isArray(value)) return value;

  try {
    const parsedValue = JSON.parse(value || "[]");
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

const EditRecipeForm = ({
  recipe,
  closeEditForm,
  showRecipes,
}) => {
  const [recipeData, setRecipeData] = useState({
    title: recipe?.title || "",
    description: recipe?.description || "",
    cooking_time: recipe?.cooking_time || "",
    preparation_time: recipe?.preparation_time || "",
    meal_type: recipe?.meal_type || "",
    difficulty_level: recipe?.difficulty_level || "",
    image_url: recipe?.image_url || "",
    Calories: recipe?.Calories || "",
    Protein: recipe?.Protein || "",
    Fats: recipe?.Fats || "",
    Carbs: recipe?.Carbs || "",
    tips: recipe?.tips || "",
    ingredients: parseArray(recipe?.ingredients),
    process: parseArray(recipe?.process),
    creator_name: recipe?.creator_name || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Disable background scrolling while modal is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Close modal using Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && !isLoading) {
        closeEditForm();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeEditForm, isLoading]);

  const updateField = (fieldName, value) => {
    setRecipeData((previous) => ({
      ...previous,
      [fieldName]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!recipeData.title.trim()) {
      alert("Recipe title is required.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.patch(
        `${import.meta.env.VITE_RECIPE_APP_API}/recipes/updateRecipe`,
        {
          recipeData,
          id: recipe.recipe_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.message || "Recipe updated successfully.");

      if (showRecipes) {
        await showRecipes();
      }

      closeEditForm();
    } catch (error) {
      console.error("Error updating recipe:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update recipe. Check if the server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddIngredient = () => {
    setRecipeData((previous) => ({
      ...previous,
      ingredients: [...previous.ingredients, ""],
    }));
  };

  const handleIngredientChange = (index, value) => {
    setRecipeData((previous) => {
      const updatedIngredients = [...previous.ingredients];
      updatedIngredients[index] = value;

      return {
        ...previous,
        ingredients: updatedIngredients,
      };
    });
  };

  const handleDeleteIngredient = (index) => {
    setRecipeData((previous) => ({
      ...previous,
      ingredients: previous.ingredients.filter(
        (_, ingredientIndex) => ingredientIndex !== index
      ),
    }));
  };

  const handleAddProcessStep = () => {
    setRecipeData((previous) => ({
      ...previous,
      process: [...previous.process, ""],
    }));
  };

  const handleProcessStepChange = (index, value) => {
    setRecipeData((previous) => {
      const updatedProcess = [...previous.process];
      updatedProcess[index] = value;

      return {
        ...previous,
        process: updatedProcess,
      };
    });
  };

  const handleDeleteProcessStep = (index) => {
    setRecipeData((previous) => ({
      ...previous,
      process: previous.process.filter(
        (_, processIndex) => processIndex !== index
      ),
    }));
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-recipe-title"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isLoading
        ) {
          closeEditForm();
        }
      }}
    >
      <div className="min-h-full flex items-start sm:items-center justify-center sm:p-4">
        <div
          className="relative w-full max-w-6xl min-h-dvh sm:min-h-0 sm:max-h-[calc(100dvh-2rem)] bg-surface sm:rounded-2xl shadow-2xl overflow-y-auto"
          onMouseDown={(event) => event.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeEditForm}
            disabled={isLoading}
            aria-label="Close edit recipe form"
            className="sticky top-3 float-right mr-3 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-lg hover:bg-error hover:text-white transition-colors disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              close
            </span>
          </button>

          <main className="w-full p-4 sm:p-6 lg:p-10 xl:p-12">
            {/* Heading */}
            <div className="mb-8 lg:mb-12 pr-12">
              <span className="text-secondary font-label text-[10px] uppercase tracking-[0.2em] font-bold">
                Administrative Interface
              </span>

              <h1
                id="edit-recipe-title"
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight mt-2 break-words"
              >
                Edit Recipe:{" "}
                <span className="italic">
                  {recipeData.title}
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main form */}
              <div className="lg:col-span-8 space-y-8 lg:space-y-12">
                {/* Basic information */}
                <section className="bg-surface-container-lowest p-4 sm:p-6 lg:p-10 rounded-xl border border-outline-variant/10 shadow-sm">
                  <div className="grid gap-6 lg:gap-8">
                    <div className="space-y-1">
                      <label
                        htmlFor="recipe-title"
                        className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
                      >
                        Recipe Title
                      </label>

                      <input
                        id="recipe-title"
                        className="editorial-input w-full font-display text-xl sm:text-2xl lg:text-3xl text-primary italic"
                        type="text"
                        value={recipeData.title}
                        onChange={(event) =>
                          updateField("title", event.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="recipe-creator"
                        className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
                      >
                        Creator
                      </label>

                      <input
                        id="recipe-creator"
                        className="editorial-input w-full font-body text-base sm:text-lg"
                        type="text"
                        value={recipeData.creator_name}
                        onChange={(event) =>
                          updateField(
                            "creator_name",
                            event.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="recipe-description"
                        className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
                      >
                        The Narrative
                      </label>

                      <textarea
                        id="recipe-description"
                        className="editorial-input w-full font-body text-base leading-relaxed resize-y"
                        placeholder="Tell the story behind this dish..."
                        rows={5}
                        value={recipeData.description}
                        onChange={(event) =>
                          updateField(
                            "description",
                            event.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </section>

                {/* Image */}
                <section>
                  <div className="aspect-video sm:aspect-[16/7] w-full rounded-xl overflow-hidden bg-surface-container-high">
                    {recipeData.image_url ? (
                      <img
                        alt={recipeData.title || "Recipe"}
                        className="w-full h-full object-cover"
                        src={recipeData.image_url}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                        No recipe image
                      </div>
                    )}
                  </div>

                  <div className="mt-4 space-y-1">
                    <label
                      htmlFor="recipe-image"
                      className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
                    >
                      Image URL
                    </label>

                    <input
                      id="recipe-image"
                      className="editorial-input w-full font-body text-sm"
                      type="url"
                      value={recipeData.image_url}
                      onChange={(event) =>
                        updateField(
                          "image_url",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </section>

                {/* Ingredients */}
                <section className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 border-b border-outline-variant/30 pb-2">
                    <h2 className="font-display text-2xl font-bold text-primary italic">
                      Ingredients
                    </h2>

                    <button
                      type="button"
                      className="self-start sm:self-auto text-secondary font-label text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 hover:opacity-70"
                      onClick={handleAddIngredient}
                    >
                      <span className="material-symbols-outlined text-sm">
                        add_circle
                      </span>
                      Add Ingredient
                    </button>
                  </div>

                  {recipeData.ingredients.length === 0 ? (
                    <p className="text-sm text-on-surface-variant">
                      No ingredients added.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4">
                      {recipeData.ingredients.map(
                        (ingredient, index) => (
                          <div
                            className="flex items-center gap-3 group"
                            key={index}
                          >
                            <input
                              className="editorial-input flex-1 min-w-0 font-body text-sm"
                              type="text"
                              aria-label={`Ingredient ${index + 1}`}
                              value={ingredient}
                              onChange={(event) =>
                                handleIngredientChange(
                                  index,
                                  event.target.value
                                )
                              }
                            />

                            <button
                              type="button"
                              className="shrink-0 text-error opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                              aria-label={`Delete ingredient ${
                                index + 1
                              }`}
                              onClick={() =>
                                handleDeleteIngredient(index)
                              }
                            >
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </section>

                {/* Process */}
                <section className="space-y-6 lg:space-y-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 border-b border-outline-variant/30 pb-2">
                    <h2 className="font-display text-2xl font-bold text-primary italic">
                      Preparation Steps
                    </h2>

                    <button
                      type="button"
                      className="self-start sm:self-auto text-secondary font-label text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 hover:opacity-70"
                      onClick={handleAddProcessStep}
                    >
                      <span className="material-symbols-outlined text-sm">
                        add_task
                      </span>
                      Add Step
                    </button>
                  </div>

                  {recipeData.process.length === 0 ? (
                    <p className="text-sm text-on-surface-variant">
                      No preparation steps added.
                    </p>
                  ) : (
                    <div className="space-y-8 lg:space-y-12">
                      {recipeData.process.map((step, index) => (
                        <div
                          className="relative pl-10 sm:pl-16 flex gap-2 group"
                          key={index}
                        >
                          <span className="absolute left-0 top-0 text-4xl sm:text-7xl font-display font-bold text-primary/5 select-none">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="space-y-2 flex-1 min-w-0">
                            <label
                              htmlFor={`process-step-${index}`}
                              className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
                            >
                              Step {index + 1}
                            </label>

                            <textarea
                              id={`process-step-${index}`}
                              className="editorial-input w-full font-body text-base leading-relaxed resize-y"
                              rows={3}
                              value={step}
                              onChange={(event) =>
                                handleProcessStepChange(
                                  index,
                                  event.target.value
                                )
                              }
                            />
                          </div>

                          <button
                            type="button"
                            className="self-start shrink-0 text-error opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                            aria-label={`Delete step ${index + 1}`}
                            onClick={() =>
                              handleDeleteProcessStep(index)
                            }
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              {/* Right sidebar */}
              <div className="lg:col-span-4 space-y-6 lg:space-y-8">
                {/* Recipe metadata */}
                <section className="bg-surface-container-low p-4 sm:p-6 lg:p-8 rounded-xl space-y-6">
                  <h3 className="font-display text-xl font-bold text-primary italic border-b border-outline-variant/30 pb-2">
                    Recipe Meta
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                    <div className="space-y-1">
                      <label
                        htmlFor="cooking-time"
                        className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
                      >
                        Cook Time
                      </label>

                      <div className="flex items-center gap-2">
                        <input
                          id="cooking-time"
                          className="editorial-input w-full min-w-0 text-sm"
                          type="number"
                          min="0"
                          value={recipeData.cooking_time}
                          onChange={(event) =>
                            updateField(
                              "cooking_time",
                              event.target.value
                            )
                          }
                        />

                        <span className="text-[10px] font-label font-bold text-on-surface-variant">
                          MIN
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="preparation-time"
                        className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
                      >
                        Prep Time
                      </label>

                      <div className="flex items-center gap-2">
                        <input
                          id="preparation-time"
                          className="editorial-input w-full min-w-0 text-sm"
                          type="number"
                          min="0"
                          value={recipeData.preparation_time}
                          onChange={(event) =>
                            updateField(
                              "preparation_time",
                              event.target.value
                            )
                          }
                        />

                        <span className="text-[10px] font-label font-bold text-on-surface-variant">
                          MIN
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="difficulty-level"
                        className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
                      >
                        Level
                      </label>

                      <select
                        id="difficulty-level"
                        className="editorial-input w-full text-sm cursor-pointer"
                        value={recipeData.difficulty_level}
                        onChange={(event) =>
                          updateField(
                            "difficulty_level",
                            event.target.value
                          )
                        }
                      >
                        <option value="">Select level</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="meal-type"
                        className="font-label text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
                      >
                        Meal Type
                      </label>

                      <select
                        id="meal-type"
                        className="editorial-input w-full text-sm cursor-pointer"
                        value={recipeData.meal_type}
                        onChange={(event) =>
                          updateField(
                            "meal_type",
                            event.target.value
                          )
                        }
                      >
                        <option value="">Select meal</option>
                        <option value="anytime">AnyTime</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Nutrition */}
                <section className="bg-primary text-on-primary p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-on-primary/5 rounded-full blur-2xl" />

                  <h3 className="font-display text-xl font-bold italic mb-6">
                    Nutrition Profile
                  </h3>

                  <div className="space-y-4 relative">
                    {[
                      ["Calories", "Calories"],
                      ["Protein (g)", "Protein"],
                      ["Fats (g)", "Fats"],
                      ["Carbs (g)", "Carbs"],
                    ].map(([label, field]) => (
                      <label
                        key={field}
                        className="flex justify-between items-center gap-4 border-b border-on-primary/10 pb-2"
                      >
                        <span className="font-label text-[10px] uppercase tracking-widest">
                          {label}
                        </span>

                        <input
                          className="bg-transparent border-none p-0 text-right font-body text-sm w-20 focus:ring-0"
                          type="number"
                          min="0"
                          value={recipeData[field]}
                          onChange={(event) =>
                            updateField(field, event.target.value)
                          }
                        />
                      </label>
                    ))}
                  </div>
                </section>

                {/* Tips */}
                <section className="bg-secondary-fixed text-on-secondary-fixed p-4 sm:p-6 lg:p-8 rounded-xl border border-secondary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="material-symbols-outlined text-secondary"
                      aria-hidden="true"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      restaurant_menu
                    </span>

                    <h3 className="font-display text-xl font-bold italic">
                      Chef&apos;s Pro Tip
                    </h3>
                  </div>

                  <textarea
                    className="w-full bg-transparent border-none font-body text-sm leading-relaxed p-0 italic focus:ring-0 resize-y"
                    placeholder="Secret kitchen wisdom..."
                    rows={5}
                    value={recipeData.tips}
                    onChange={(event) =>
                      updateField("tips", event.target.value)
                    }
                  />
                </section>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  <button
                    type="button"
                    className="order-2 sm:order-1 lg:order-1 bg-error text-on-error px-6 py-3 rounded-full font-label uppercase tracking-widest text-[10px] font-bold hover:bg-error/90 transition-all disabled:opacity-50"
                    onClick={closeEditForm}
                    disabled={isLoading}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="order-1 sm:order-2 lg:order-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label uppercase tracking-widest text-[10px] font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditRecipeForm;