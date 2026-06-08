import React, { use, useState } from "react";
import ReviewRecipeForm from "./ReviewRecipeForm";
import { useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";
import LogoLoader from "../../LogoLoader";

const Dashboard = () => {
  const [recipe, setRecipe] = useState({
    reviewRecipe: false,
    selectedRecipe: null,
  });
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const closeReviewForm = () => {
    setRecipe({ reviewRecipe: false, selectedRecipe: null });
  };

  const showRecipes = useCallback(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_RECIPE_APP_API}/recipes/pendingRecipes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        if (data && Array.isArray(data.rows)) {
          setAllRecipes(data.rows);
        } else {
          console.error("API success but recipes array is missing:", data);
          setAllRecipes([]); // Fallback to empty array
        }
      })
      .catch((err) => console.error("Error fetching recipes:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    showRecipes();
  }, [showRecipes]);

  const handleAproveAndReject = async (id, status) => {
    await axios
      .post(`${import.meta.env.VITE_RECIPE_APP_API}/recipes/updateStatus`, {
        recipe_id: id,
        status,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert(
          `Recipe ${status === "approved" ? "approved" : "rejected"} successfully!`,
        );
        closeReviewForm();
        showRecipes();
      })
      .catch((error) => {
        console.error("Error updating recipe status:", error);
      });
  };

  return (
    <>
      <main className="flex-1 p-10 bg-surface">
        {/* <!-- Header Section --> */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-headline font-black text-primary leading-tight tracking-tighter">
              Pending Approvals
            </h1>
            <p className="text-on-surface-variant mt-2 text-lg italic font-headline">
              Reviewing the latest culinary submissions for the editorial
              collection.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-low px-6 py-3 rounded-xl flex items-center gap-4">
              <span className="text-3xl font-headline font-bold text-secondary">
                {allRecipes.length}
              </span>
              <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant leading-tight">
                Recipes
                <br />
                Waiting
              </span>
            </div>
          </div>
        </div>
        {/* <!-- Content Canvas --> */}
        <div className="rounded-xl editorial-shadow overflow-hidden">
          {loading ? (
            <LogoLoader />
          ) : allRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <span
                className="material-symbols-outlined text-6xl text-on-surface-variant"
                data-icon="hourglass_empty"
              >
                hourglass_empty
              </span>
              <p className="text-sm text-on-surface-variant">
                No pending recipes at the moment.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
                      Recipe &amp; Author
                    </th>
                    <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
                      Submission Date
                    </th>
                    <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
                      Status
                    </th>
                    <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {/* <!-- Row 1 --> */}
                  {allRecipes.map((recipe, index) => (
                    <tr
                      className="group hover:bg-surface-container-low transition-colors"
                      key={index}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                            <img
                              alt="Fresh salad"
                              className="w-full h-full object-cover"
                              data-alt="Gourmet salad bowl with roasted vegetables, quinoa, and avocado slices on a textured ceramic plate"
                              src={recipe.image_url}
                            />
                          </div>
                          <div>
                            <div className="font-headline font-bold text-lg text-primary">
                              {recipe.title}
                            </div>
                            <div className="text-sm text-on-surface-variant">
                              by Chef {recipe.creator_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-on-surface-variant font-medium">
                        {new Date(recipe.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-label font-bold uppercase tracking-widest bg-secondary-container/10 text-secondary ring-1 ring-inset ring-secondary/20">
                          {recipe.status === "pending"
                            ? "Pending Review"
                            : recipe.status === "approved"
                              ? "Approved"
                              : "Rejected"}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-3">
                          <button
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary-container hover:text-white transition-all text-primary"
                            title="View Details"
                            onClick={() =>
                              setRecipe({
                                ...recipe,
                                reviewRecipe: true,
                                selectedRecipe: recipe,
                              })
                            }
                          >
                            <span
                              className="material-symbols-outlined text-sm"
                              data-icon="visibility"
                            >
                              visibility
                            </span>
                          </button>
                          <button
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-green-600 hover:text-white transition-all text-green-700"
                            title="Approve"
                            onClick={() =>
                              handleAproveAndReject(
                                recipe.recipe_id,
                                "approved",
                              )
                            }
                          >
                            <span
                              className="material-symbols-outlined text-sm"
                              data-icon="check_circle"
                            >
                              check_circle
                            </span>
                          </button>
                          <button
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-error hover:text-white transition-all text-error"
                            title="Reject"
                            onClick={() =>
                              handleAproveAndReject(
                                recipe.recipe_id,
                                "rejected",
                              )
                            }
                          >
                            <span
                              className="material-symbols-outlined text-sm"
                              data-icon="cancel"
                            >
                              cancel
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      {recipe.reviewRecipe && (
        <ReviewRecipeForm recipe={recipe.selectedRecipe} closeReviewForm={closeReviewForm} showRecipes={showRecipes} />
      )}
    </>
  );
};

export default Dashboard;
