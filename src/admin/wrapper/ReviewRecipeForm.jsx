import axios from "axios";
import { useEffect, useMemo, useState } from "react";
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

const ReviewRecipeForm = ({
  recipe,
  closeReviewForm,
  handleDeleteRecipe,
  showRecipes,
}) => {
  const [adminFeedback, setAdminFeedback] = useState(
    recipe?.admin_feedback || ""
  );

  const [isLoading, setIsLoading] = useState(false);

  const ingredients = useMemo(
    () => parseArray(recipe?.ingredients),
    [recipe?.ingredients]
  );

  const processSteps = useMemo(
    () => parseArray(recipe?.process),
    [recipe?.process]
  );

  // Prevent background scrolling
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Close with Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && !isLoading) {
        closeReviewForm();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeReviewForm, isLoading]);

  const handleApproveAndReject = async (recipeId, status) => {
    try {
      setIsLoading(true);

      await axios.post(
        `${import.meta.env.VITE_RECIPE_APP_API}/recipes/updateStatus`,
        {
          recipe_id: recipeId,
          status,
          admin_feedback: adminFeedback.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(
        `Recipe ${
          status === "approved" ? "approved" : "rejected"
        } successfully!`
      );

      if (showRecipes) {
        await showRecipes();
      }

      closeReviewForm();
    } catch (error) {
      console.error("Error updating recipe status:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update recipe status."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermanentDelete = async () => {
    if (!handleDeleteRecipe) {
      alert("Delete functionality is not available.");
      return;
    }

    await handleDeleteRecipe(recipe.recipe_id);
  };

  const totalTime =
    Number(recipe?.preparation_time || 0) +
    Number(recipe?.cooking_time || 0);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-recipe-title"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isLoading
        ) {
          closeReviewForm();
        }
      }}
    >
      <div className="min-h-full flex items-start sm:items-center justify-center sm:p-4">
        <div
          className="relative w-full max-w-5xl min-h-dvh sm:min-h-0 sm:max-h-[calc(100dvh-2rem)] bg-surface-container-lowest sm:rounded-2xl shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row"
          onMouseDown={(event) => event.stopPropagation()}
        >
          {/* Left: Recipe details */}
          <section className="w-full md:w-1/2 p-4 sm:p-6 lg:p-10 md:overflow-y-auto">
            <div className="flex justify-between items-start gap-4 mb-6">
              <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest rounded-full">
                {recipe.status === "pending"
                  ? "New Submission"
                  : recipe.status}
              </span>

              <button
                type="button"
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50"
                onClick={closeReviewForm}
                disabled={isLoading}
                aria-label="Close recipe review"
              >
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true"
                >
                  close
                </span>
              </button>
            </div>

            {recipe.image_url && (
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-surface-container-low mb-6">
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h3
              id="review-recipe-title"
              className="font-headline text-2xl sm:text-3xl font-black text-primary mb-4 leading-tight break-words"
            >
              {recipe.title}
            </h3>

            <div className="flex items-center gap-3 sm:gap-4 mb-8">
              <div className="w-10 h-10 shrink-0 rounded-full bg-primary text-white flex items-center justify-center font-bold uppercase">
                {recipe.creator_name?.charAt(0) || "C"}
              </div>

              <div className="min-w-0">
                <p className="text-xs text-on-surface-variant">
                  Submitted by
                </p>

                <p className="text-sm font-bold truncate">
                  Chef {recipe.creator_name}
                </p>
              </div>
            </div>

            <div className="space-y-7">
              {/* Story */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">
                  The Story
                </h4>

                <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap break-words">
                  {recipe.description || "No description provided."}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-surface-container-low p-4 rounded-xl">
                  <span className="text-[10px] font-bold uppercase tracking-tighter block mb-1">
                    Total Time
                  </span>

                  <span className="text-sm font-bold">
                    {totalTime} Minutes
                  </span>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl">
                  <span className="text-[10px] font-bold uppercase tracking-tighter block mb-1">
                    Difficulty
                  </span>

                  <span className="text-sm font-bold capitalize">
                    {recipe.difficulty_level || "Not provided"}
                  </span>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl">
                  <span className="text-[10px] font-bold uppercase tracking-tighter block mb-1">
                    Meal Type
                  </span>

                  <span className="text-sm font-bold capitalize">
                    {recipe.meal_type || "Not provided"}
                  </span>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl">
                  <span className="text-[10px] font-bold uppercase tracking-tighter block mb-1">
                    Calories
                  </span>

                  <span className="text-sm font-bold">
                    {recipe.Calories || 0} kcal
                  </span>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3">
                  Ingredients
                </h4>

                {ingredients.length > 0 ? (
                  <ul className="text-sm text-on-surface-variant space-y-2 list-disc pl-5">
                    {ingredients.map((ingredient, index) => (
                      <li key={`${ingredient}-${index}`}>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-on-surface-variant">
                    No ingredients provided.
                  </p>
                )}
              </div>

              {/* Process */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3">
                  Preparation Steps
                </h4>

                {processSteps.length > 0 ? (
                  <ol className="space-y-3">
                    {processSteps.map((step, index) => (
                      <li
                        key={`${step}-${index}`}
                        className="flex items-start gap-3 text-sm text-on-surface-variant"
                      >
                        <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                          {index + 1}
                        </span>

                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-on-surface-variant">
                    No preparation steps provided.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Right: Admin decision */}
          <section className="w-full md:w-1/2 bg-[#f6f3ee] p-4 sm:p-6 lg:p-10 border-t md:border-t-0 md:border-l border-outline-variant/10 flex flex-col md:overflow-y-auto">
            <div className="flex-1">
              <h4 className="font-headline text-xl font-bold text-primary mb-6">
                Editorial Decision
              </h4>

              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="admin-feedback"
                    className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    Reviewer Notes
                  </label>

                  <textarea
                    id="admin-feedback"
                    className="w-full bg-surface-container-lowest border-outline-variant/20 rounded-xl p-4 text-sm focus:ring-secondary/30 min-h-32 outline-none border transition-all resize-y"
                    placeholder="Add feedback for the contributor or internal notes..."
                    value={adminFeedback}
                    onChange={(event) =>
                      setAdminFeedback(event.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Received On
                  </span>

                  <div className="flex items-start sm:items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3">
                    <span
                      className="material-symbols-outlined text-lg text-outline shrink-0"
                      aria-hidden="true"
                    >
                      calendar_today
                    </span>

                    <span className="text-sm font-medium">
                      {new Date(
                        recipe.created_at
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(
                        recipe.created_at
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {recipe.admin_feedback && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      Previous Feedback
                    </span>

                    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3 text-sm">
                      {recipe.admin_feedback}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 lg:pt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {recipe.status === "rejected" ? (
                <>
                  <button
                    type="button"
                    className="w-full py-3 sm:py-4 editorial-gradient text-white text-xs font-black uppercase tracking-widest rounded-full shadow-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                    onClick={() =>
                      handleApproveAndReject(
                        recipe.recipe_id,
                        "approved"
                      )
                    }
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Approve"}
                  </button>

                  <button
                    type="button"
                    className="w-full py-3 sm:py-4 border-2 border-error/50 text-error text-xs font-black uppercase tracking-wider rounded-full hover:bg-error hover:text-white transition-all active:scale-95 disabled:opacity-50"
                    onClick={handlePermanentDelete}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processing..."
                      : "Delete Permanently"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="w-full py-3 sm:py-4 border-2 border-error/50 text-error text-xs font-black uppercase tracking-widest rounded-full hover:bg-error hover:text-white transition-all active:scale-95 disabled:opacity-50"
                    onClick={() =>
                      handleApproveAndReject(
                        recipe.recipe_id,
                        "rejected"
                      )
                    }
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Reject"}
                  </button>

                  <button
                    type="button"
                    className="w-full py-3 sm:py-4 editorial-gradient text-white text-xs font-black uppercase tracking-widest rounded-full shadow-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                    onClick={() =>
                      handleApproveAndReject(
                        recipe.recipe_id,
                        "approved"
                      )
                    }
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Approve"}
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReviewRecipeForm;