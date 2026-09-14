import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ReviewRecipeForm from "./ReviewRecipeForm";
import EditRecipeForm from "./EditRecipeForm";
import LogoLoader from "../../LogoLoader";

dayjs.extend(relativeTime);

const Recipe = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [recipeState, setRecipeState] = useState({
    reviewRecipe: false,
    editRecipe: false,
    selectedRecipe: null,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    selectedState: "all",
    selectedChef: "",
  });

  const uniqueChefs = useMemo(() => {
    return [
      ...new Set(
        allRecipes.map((recipeItem) => recipeItem.creator_name).filter(Boolean),
      ),
    ];
  }, [allRecipes]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipeItem) => {
      const matchesStatus =
        selectedFilters.selectedState === "all" ||
        recipeItem.status === selectedFilters.selectedState;

      const matchesChef =
        selectedFilters.selectedChef === "" ||
        recipeItem.creator_name === selectedFilters.selectedChef;

      return matchesStatus && matchesChef;
    });
  }, [allRecipes, selectedFilters]);

  const closeReviewForm = () => {
    setRecipeState((previous) => ({
      ...previous,
      reviewRecipe: false,
      selectedRecipe: null,
    }));
  };

  const closeEditForm = () => {
    setRecipeState((previous) => ({
      ...previous,
      editRecipe: false,
      selectedRecipe: null,
    }));
  };

  const showRecipes = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_RECIPE_APP_API}/recipes/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (Array.isArray(response.data?.rows)) {
        setAllRecipes(response.data.rows);
      } else {
        console.error(
          "API success but recipes array is missing:",
          response.data,
        );

        setAllRecipes([]);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch recipes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    showRecipes();
  }, [showRecipes]);

  const handleDeleteRecipe = async (recipeId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this recipe?",
    );

    if (!shouldDelete) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_RECIPE_APP_API}/recipes/deleteRecipe/`,
        {
          data: {
            id: recipeId,
          },

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert(response.data.message || "Recipe deleted successfully");

      setRecipeState({
        reviewRecipe: false,
        editRecipe: false,
        selectedRecipe: null,
      });

      await showRecipes();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete recipe");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "approved") {
      return {
        container: "bg-primary-container/10 text-primary-container",
        dot: "bg-primary-container",
        label: "Approved",
      };
    }

    if (status === "pending") {
      return {
        container: "bg-primary/5 text-primary",
        dot: "bg-primary animate-pulse",
        label: "Pending",
      };
    }

    return {
      container: "bg-secondary-container/10 text-secondary",
      dot: "bg-secondary",
      label: "Rejected",
    };
  };

  return (
    <>
      <main className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Page header */}
        <div className="mb-7 lg:mb-10">
          <h2 className="font-headline text-3xl sm:text-4xl font-black tracking-tight text-primary mb-2">
            Recipe Management
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant">
            Curate and refine the editorial calendar. Approve pending
            submissions or manage existing masterpieces.
          </p>
        </div>

        {/* Filters and statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mb-8">
          <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <label className="flex flex-col">
                <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                  Status
                </span>

                <select
                  className="w-full bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
                  value={selectedFilters.selectedState}
                  onChange={(event) =>
                    setSelectedFilters((previous) => ({
                      ...previous,
                      selectedState: event.target.value,
                    }))
                  }
                >
                  <option value="all">All States</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </label>

              <label className="flex flex-col border-t sm:border-t-0 sm:border-l border-outline-variant/30 pt-4 sm:pt-0 sm:pl-8">
                <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                  Chef
                </span>

                <select
                  className="w-full bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
                  value={selectedFilters.selectedChef}
                  onChange={(event) =>
                    setSelectedFilters((previous) => ({
                      ...previous,
                      selectedChef: event.target.value,
                    }))
                  }
                >
                  <option value="">All Contributors</option>

                  {uniqueChefs.map((chef) => (
                    <option key={chef} value={chef}>
                      {chef}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="lg:col-span-4 bg-primary-container rounded-xl p-5 sm:p-6 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center">
            <span className="text-[10px] font-bold text-on-primary-container/60 uppercase tracking-widest">
              Filtered Recipes
            </span>

            <span className="text-3xl sm:text-4xl font-headline font-black text-white">
              {filteredRecipes.length}
            </span>
          </div>
        </div>

        {/* Recipe list */}
        {isLoading ? (
          <div className="min-h-72 flex items-center justify-center">
            <LogoLoader />
          </div>
        ) : allRecipes.length === 0 ? (
          <div className="text-center px-4 py-16 sm:py-20 text-on-surface-variant">
            No recipes are currently available.
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center px-4 py-16 sm:py-20 text-on-surface-variant">
            No recipes match the selected filters.
          </div>
        ) : (
          <div className="bg-surface-container-low rounded-xl overflow-hidden editorial-shadow">
            <p className="sm:hidden px-4 pt-3 text-xs text-on-surface-variant/60">
              Swipe horizontally to see all recipe details.
            </p>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[850px] text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/50">
                    <th className="px-4 lg:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant whitespace-nowrap">
                      Recipe Title
                    </th>

                    <th className="px-4 lg:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant whitespace-nowrap">
                      Chef
                    </th>

                    <th className="px-4 lg:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant whitespace-nowrap">
                      Category
                    </th>

                    <th className="px-4 lg:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center whitespace-nowrap">
                      Status
                    </th>

                    <th className="px-4 lg:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/10">
                  {filteredRecipes.map((recipeItem) => {
                    const statusStyle = getStatusStyle(recipeItem.status);

                    return (
                      <tr
                        key={recipeItem.recipe_id}
                        className="hover:bg-surface-container transition-colors group"
                      >
                        <td className="px-4 lg:px-6 py-5">
                          <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-12 h-12 rounded-lg bg-surface-variant overflow-hidden shrink-0">
                              <img
                                alt={recipeItem.title}
                                className="w-full h-full object-cover"
                                src={recipeItem.image_url}
                              />
                            </div>

                            <div className="min-w-0">
                              <div
                                className="max-w-52 lg:max-w-72 truncate font-bold text-primary group-hover:text-secondary transition-colors"
                                title={recipeItem.title}
                              >
                                {recipeItem.title}
                              </div>

                              <div className="text-[11px] text-on-surface-variant italic whitespace-nowrap">
                                {recipeItem.modifiedAt
                                  ? `Last updated ${dayjs(
                                      recipeItem.modifiedAt,
                                    ).fromNow()}`
                                  : `Submitted ${dayjs(
                                      recipeItem.created_at,
                                    ).fromNow()}`}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 lg:px-6 py-5">
                          <div className="max-w-44 truncate text-sm font-medium">
                            Chef {recipeItem.creator_name}
                          </div>
                        </td>

                        <td className="px-4 lg:px-6 py-5 whitespace-nowrap">
                          <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold text-primary uppercase tracking-tight">
                            {recipeItem.meal_type}
                          </span>
                        </td>

                        <td className="px-4 lg:px-6 py-5 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyle.container}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                            />

                            {statusStyle.label}
                          </span>
                        </td>

                        <td className="px-4 lg:px-6 py-5 text-right whitespace-nowrap">
                          {recipeItem.status === "approved" ? (
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                className="p-2 hover:bg-white rounded-lg transition-all text-on-surface-variant hover:text-primary"
                                aria-label={`Edit ${recipeItem.title}`}
                                onClick={() =>
                                  setRecipeState({
                                    reviewRecipe: false,
                                    editRecipe: true,
                                    selectedRecipe: recipeItem,
                                  })
                                }
                              >
                                <span
                                  className="material-symbols-outlined text-lg"
                                  aria-hidden="true"
                                >
                                  edit
                                </span>
                              </button>

                              <button
                                type="button"
                                className="p-2 hover:bg-white rounded-lg transition-all text-on-surface-variant hover:text-error"
                                aria-label={`Delete ${recipeItem.title}`}
                                onClick={() =>
                                  handleDeleteRecipe(recipeItem.recipe_id)
                                }
                              >
                                <span
                                  className="material-symbols-outlined text-lg"
                                  aria-hidden="true"
                                >
                                  delete
                                </span>
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="px-4 py-1.5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:shadow-lg transition-all active:scale-95"
                              onClick={() =>
                                setRecipeState({
                                  reviewRecipe: true,
                                  editRecipe: false,
                                  selectedRecipe: recipeItem,
                                })
                              }
                            >
                              Review
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {recipeState.editRecipe && (
        <EditRecipeForm
          recipe={recipeState.selectedRecipe}
          closeEditForm={closeEditForm}
          showRecipes={showRecipes}
        />
      )}

      {recipeState.reviewRecipe && (
        <ReviewRecipeForm
          recipe={recipeState.selectedRecipe}
          closeReviewForm={closeReviewForm}
          handleDeleteRecipe={handleDeleteRecipe}
          showRecipes={showRecipes}
        />
      )}
    </>
  );
};

export default Recipe;
