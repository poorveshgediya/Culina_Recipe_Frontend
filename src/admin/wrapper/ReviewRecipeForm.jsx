import axios from "axios";
import React, { useState } from "react";
import { useCallback } from "react";

const ReviewRecipeForm = ({
  recipe,
  closeReviewForm,
  handleDeleteRecipe,
  showRecipes,
}) => {

  const [adminFeedback, setAdminFeedback] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const handleAproveAndReject = useCallback(async (id, status) => {
    setIsLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_RECIPE_APP_API}/recipes/updateStatus`,
        {
          recipe_id: id,
          status,
          admin_feedback: adminFeedback,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((response) => {
        alert(
          `Recipe ${status === "approved" ? "approved" : "rejected"} successfully!`,
        );
        closeReviewForm();
        showRecipes();
      })
      .catch((error) => {
        console.error("Error updating recipe status:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary/20 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-surface-container-lowest rounded-2xl shadow-2xl flex flex-col md:flex-row max-h-170 overflow-y-scroll">
        {/* <!-- Modal Left: Content Preview --> */}
        <div className="md:w-1/2 p-10 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-widest rounded-full">
              New Submission
            </span>
            <button
              className="text-on-surface-variant hover:text-primary transition-colors"
              onClick={closeReviewForm}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <h3 className="font-headline text-3xl font-black text-primary mb-4 leading-tight">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-surface-variant border-2 border-surface-container-high"></div>
            <div>
              <div className="text-sm font-bold">{recipe.creator_name}</div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">
                The Story
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {recipe.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-tighter block mb-1">
                  Time
                </span>
                <span className="text-sm font-bold">
                  {recipe.preparation_time + recipe.cooking_time} Minutes
                </span>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-tighter block mb-1">
                  Difficulty
                </span>
                <span className="text-sm font-bold">
                  {recipe.difficulty_level}
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">
                Ingredients Preview
              </h4>
              <ul className="text-sm text-on-surface-variant space-y-2 list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- Modal Right: Editorial Decision --> */}
        <div className="md:w-1/2 bg-[#f6f3ee] p-10 border-l border-outline-variant/10 flex flex-col">
          <div className="mb-auto">
            <h4 className="font-headline text-xl font-bold text-primary mb-6">
              Editorial Decision
            </h4>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Reviewer Notes (Internal)
                </label>
                <textarea
                  className="w-full bg-surface-container-lowest border-outline-variant/20 rounded-xl p-4 text-sm focus:ring-secondary/30 min-h-[120px] outline-none border transition-all"
                  placeholder="Add feedback for the contributor or internal notes..."
                  onChange={(e) => setAdminFeedback(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Received On
                </label>
                <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-3">
                  <span className="material-symbols-outlined text-lg text-outline">
                    calendar_today
                  </span>
                  <span className="text-sm font-medium">
                    {new Date(recipe.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    at{" "}
                    {new Date(recipe.created_at).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 flex gap-4">
            {recipe.status === "rejected" ? (
              <>
                <button
                  className="flex-1 py-4 editorial-gradient text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-xl hover:opacity-90 transition-all active:scale-95"
                  onClick={() =>
                    handleAproveAndReject(recipe.recipe_id, "approved")
                  }
                  disabled={isloading}
                >
                  {isloading ? "Processing..." : "Approve"}
                </button>
                <button
                  className="flex-1 py-4 border-2 border-error/50 text-error text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-error hover:text-white transition-all active:scale-95"
                  onClick={() => handleDeleteRecipe(recipe.recipe_id)}
                  disabled={isloading}
                >
                  {isloading ? "Processing..." : "Delete Permanently"}
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex-1 py-4 border-2 border-error/50 text-error text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-error hover:text-white transition-all active:scale-95"
                  onClick={() =>
                    handleAproveAndReject(recipe.recipe_id, "rejected")
                  }
                  disabled={isloading}
                >
                  {isloading ? "Processing..." : "Reject"}
                </button>
                <button
                  className="flex-1 py-4 editorial-gradient text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-xl hover:opacity-90 transition-all active:scale-95"
                  onClick={() =>
                    handleAproveAndReject(recipe.recipe_id, "approved")
                  }
                  disabled={isloading}
                >
                  {isloading ? "Processing..." : "Approve"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewRecipeForm;
