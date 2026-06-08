import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import ReviewRecipeForm from "./ReviewRecipeForm";
import EditRecipeForm from "./EditRecipeForm";
import LogoLoader from "../../LogoLoader";
dayjs.extend(relativeTime);

const Recipe = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [recipe, setRecipe] = useState({
    reviewRecipe: false,
    editRecipe: false,
    selectedRecipe: null,
    loading: false,
  });
  const [selectedRec, setSelectedRec] = useState({
    selectedState: "all",
    selectedChef: "",
  });

  const uniqueChefs = [...new Set(allRecipes.map((r) => r.creator_name))];

  const closeReviewForm = () => {
    setRecipe({ reviewRecipe: false, selectedRecipe: null });
  };

  const closeEditForm = () => {
    setRecipe({ editRecipe: false, selectedRecipe: null });
  };

  const showRecipes = useCallback(async () => {
    setIsLoading(true);
    setRecipe({ ...recipe, loading: true });
    await axios
      .get(`${import.meta.env.VITE_RECIPE_APP_API}/recipes/all`, {
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
          setAllRecipes([]);
        }
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Failed to fetch recipes"),
      )
      .finally(() => {
        setIsLoading(false);
        setRecipe({ ...recipe, loading: false });
      });
  }, []);

  const handleDeleteRecipe = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      axios
        .delete(
          `${import.meta.env.VITE_RECIPE_APP_API}/recipes/deleteRecipe/`,
          {
            data: { id },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((res) => {
          alert(res.data.message || "Recipe deleted successfully");
          closeReviewForm(); // Close the review form if it's open  
          showRecipes(); // Refresh the recipe list after deletion
        })
        .catch((err) =>
          alert(err.response?.data?.message || "Failed to delete recipe"),
        );
    }
  };

  useEffect(() => {
    showRecipes();
  }, [showRecipes]);

  return (
    <>
      <div className="p-8 max-w-7xl w-full mx-auto">
        {/* <!-- Page Header --> */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-headline text-4xl font-black tracking-tight text-primary mb-2">
              Recipe Management
            </h2>
            <p className="text-on-surface-variant">
              Curate and refine the editorial calendar. Approve pending
              submissions or manage existing masterpieces.
            </p>
          </div>
        </div>
        {/* <!-- Filters & Stats Bento --> */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-8 bg-surface-container-low rounded-xl p-6 flex items-center justify-between">
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">
                  Status
                </span>
                <select
                  className="bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
                  onChange={(e) =>
                    setSelectedRec({
                      ...selectedRec,
                      selectedState: e.target.value,
                    })
                  }
                >
                  <option value={""}>All States</option>
                  <option value={"approved"}>Approved</option>
                  <option value={"pending"}>Pending Review</option>
                  <option value={"rejected"}>Rejected</option>
                </select>
              </div>
              <div className="flex flex-col border-l border-outline-variant/30 pl-8">
                <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">
                  Chef
                </span>
                <select
                  className="bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
                  onChange={(e) =>
                    setSelectedRec({
                      ...selectedRec,
                      selectedChef: e.target.value,
                    })
                  }
                >
                  <option>All Contributors</option>
                  {uniqueChefs.map((chef, index) => (
                    <option key={index}>{chef}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-span-4 bg-primary-container rounded-xl p-6 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-on-primary-container/60 uppercase tracking-widest mb-1">
              Total Recipes
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-headline font-black text-white">
                {allRecipes.length}
              </span>
            </div>
          </div>
        </div>
        {/* <!-- Recipe Table --> */}
        {isLoading ? (
          <LogoLoader />
        ) : allRecipes.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">
            No recipes found. Try adjusting your filters or check back later.
          </div>
        ) : (
          <div className="bg-surface-container-low rounded-xl overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Recipe Title
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Chef
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Category
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {/* <!-- Row 1: Approved --> */}
                {allRecipes.map((recipe, index) => (
                  <tr
                    className="hover:bg-surface-container transition-colors group overflow-x-scroll"
                    key={index}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-variant overflow-hidden shrink-0">
                          <img
                            alt="Recipe Image"
                            className="w-full h-full object-cover"
                            data-alt="vibrant healthy bowl with quinoa avocado and fresh greens styled with dramatic overhead lighting and high contrast"
                            src={recipe.image_url}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-primary group-hover:text-secondary transition-colors">
                            {recipe.title}
                          </div>
                          <div className="text-[11px] text-on-surface-variant italic">
                            {recipe.modifiedAt
                              ? `Last updated ${dayjs(recipe.modifiedAt).fromNow()}`
                              : `Submitted ${dayjs(recipe.created_at).fromNow()}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium">
                        Chef {recipe.creator_name}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold text-primary uppercase tracking-tight">
                        {recipe.meal_type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {recipe.status === "approved" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-container/10 text-primary-container rounded-full text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>{" "}
                          Approved
                        </span>
                      )}
                      {recipe.status === "pending" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>{" "}
                          Pending
                        </span>
                      )}
                      {recipe.status === "rejected" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container/10 text-secondary rounded-full text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" "}
                          Rejected
                        </span>
                      )}
                    </td>
                    {recipe.status === "approved" ? (
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="p-2 hover:bg-white rounded-lg transition-all text-on-surface-variant hover:text-primary"
                            onClick={() =>
                              setRecipe({
                                ...recipe,
                                editRecipe: true,
                                selectedRecipe: recipe,
                              })
                            }
                          >
                            <span className="material-symbols-outlined text-lg">
                              edit
                            </span>
                          </button>
                          <button
                            className="p-2 hover:bg-white rounded-lg transition-all text-on-surface-variant hover:text-error"
                            onClick={() => handleDeleteRecipe(recipe.recipe_id)}
                          >
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    ) : (
                      <td className="px-6 py-5 text-right">
                        <button
                          className="px-4 py-1.5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:shadow-lg transition-all active:scale-95"
                          onClick={() =>
                            setRecipe({
                              ...recipe,
                              reviewRecipe: true,
                              selectedRecipe: recipe,
                            })
                          }
                        >
                          Review
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {recipe.editRecipe && (
        <EditRecipeForm recipe={recipe} closeEditForm={closeEditForm} />
      )}
      {recipe.reviewRecipe && (
        <ReviewRecipeForm
          recipe={recipe.selectedRecipe}
          closeReviewForm={closeReviewForm}
          handleDeleteRecipe={handleDeleteRecipe}
          showRecipes={showRecipes}
        />
      )}
    </>
  );
};

export default Recipe;
