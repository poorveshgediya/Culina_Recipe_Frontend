// import React, { use, useState } from "react";
// import ReviewRecipeForm from "./ReviewRecipeForm";
// import { useEffect } from "react";
// import { useCallback } from "react";
// import axios from "axios";
// import LogoLoader from "../../LogoLoader";

// const Dashboard = () => {
//   const [recipe, setRecipe] = useState({
//     reviewRecipe: false,
//     selectedRecipe: null,
//   });
//   const [allRecipes, setAllRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const closeReviewForm = () => {
//     setRecipe({ reviewRecipe: false, selectedRecipe: null });
//   };

//   const showRecipes = useCallback(() => {
//     setLoading(true);
//     axios
//       .get(`${import.meta.env.VITE_RECIPE_APP_API}/recipes/pendingRecipes`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => res.data)
//       .then((data) => {
//         if (data && Array.isArray(data.rows)) {
//           setAllRecipes(data.rows);
//         } else {
//           console.error("API success but recipes array is missing:", data);
//           setAllRecipes([]); // Fallback to empty array
//         }
//       })
//       .catch((err) => console.error("Error fetching recipes:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     showRecipes();
//   }, [showRecipes]);

//   const handleAproveAndReject = async (id, status) => {
//     await axios
//       .post(`${import.meta.env.VITE_RECIPE_APP_API}/recipes/updateStatus`, {
//         recipe_id: id,
//         status,
//       },{
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         alert(
//           `Recipe ${status === "approved" ? "approved" : "rejected"} successfully!`,
//         );
//         closeReviewForm();
//         showRecipes();
//       })
//       .catch((error) => {
//         console.error("Error updating recipe status:", error);
//       });
//   };

//   return (
//     <>
//       <main className="flex-1 p-10 bg-surface">
//         {/* <!-- Header Section --> */}
//         <div className="mb-12 flex justify-between items-end">
//           <div>
//             <h1 className="text-5xl font-headline font-black text-primary leading-tight tracking-tighter">
//               Pending Approvals
//             </h1>
//             <p className="text-on-surface-variant mt-2 text-lg italic font-headline">
//               Reviewing the latest culinary submissions for the editorial
//               collection.
//             </p>
//           </div>
//           <div className="flex gap-4">
//             <div className="bg-surface-container-low px-6 py-3 rounded-xl flex items-center gap-4">
//               <span className="text-3xl font-headline font-bold text-secondary">
//                 {allRecipes.length}
//               </span>
//               <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant leading-tight">
//                 Recipes
//                 <br />
//                 Waiting
//               </span>
//             </div>
//           </div>
//         </div>
//         {/* <!-- Content Canvas --> */}
//         <div className="rounded-xl editorial-shadow overflow-hidden">
//           {loading ? (
//             <LogoLoader />
//           ) : allRecipes.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-20 gap-4">
//               <span
//                 className="material-symbols-outlined text-6xl text-on-surface-variant"
//                 data-icon="hourglass_empty"
//               >
//                 hourglass_empty
//               </span>
//               <p className="text-sm text-on-surface-variant">
//                 No pending recipes at the moment.
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-surface-container-low">
//                     <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
//                       Recipe &amp; Author
//                     </th>
//                     <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
//                       Submission Date
//                     </th>
//                     <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
//                       Status
//                     </th>
//                     <th className="px-8 py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold text-right">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-surface-container">
//                   {/* <!-- Row 1 --> */}
//                   {allRecipes.map((recipe, index) => (
//                     <tr
//                       className="group hover:bg-surface-container-low transition-colors"
//                       key={index}
//                     >
//                       <td className="px-8 py-6">
//                         <div className="flex items-center gap-4">
//                           <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
//                             <img
//                               alt="Fresh salad"
//                               className="w-full h-full object-cover"
//                               data-alt="Gourmet salad bowl with roasted vegetables, quinoa, and avocado slices on a textured ceramic plate"
//                               src={recipe.image_url}
//                             />
//                           </div>
//                           <div>
//                             <div className="font-headline font-bold text-lg text-primary">
//                               {recipe.title}
//                             </div>
//                             <div className="text-sm text-on-surface-variant">
//                               by Chef {recipe.creator_name}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-8 py-6 text-sm text-on-surface-variant font-medium">
//                         {new Date(recipe.created_at).toLocaleDateString(
//                           "en-US",
//                           {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           },
//                         )}
//                       </td>
//                       <td className="px-8 py-6">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-label font-bold uppercase tracking-widest bg-secondary-container/10 text-secondary ring-1 ring-inset ring-secondary/20">
//                           {recipe.status === "pending"
//                             ? "Pending Review"
//                             : recipe.status === "approved"
//                               ? "Approved"
//                               : "Rejected"}
//                         </span>
//                       </td>
//                       <td className="px-8 py-6">
//                         <div className="flex justify-end gap-3">
//                           <button
//                             className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary-container hover:text-white transition-all text-primary"
//                             title="View Details"
//                             onClick={() =>
//                               setRecipe({
//                                 ...recipe,
//                                 reviewRecipe: true,
//                                 selectedRecipe: recipe,
//                               })
//                             }
//                           >
//                             <span
//                               className="material-symbols-outlined text-sm"
//                               data-icon="visibility"
//                             >
//                               visibility
//                             </span>
//                           </button>
//                           <button
//                             className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-green-600 hover:text-white transition-all text-green-700"
//                             title="Approve"
//                             onClick={() =>
//                               handleAproveAndReject(
//                                 recipe.recipe_id,
//                                 "approved",
//                               )
//                             }
//                           >
//                             <span
//                               className="material-symbols-outlined text-sm"
//                               data-icon="check_circle"
//                             >
//                               check_circle
//                             </span>
//                           </button>
//                           <button
//                             className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-error hover:text-white transition-all text-error"
//                             title="Reject"
//                             onClick={() =>
//                               handleAproveAndReject(
//                                 recipe.recipe_id,
//                                 "rejected",
//                               )
//                             }
//                           >
//                             <span
//                               className="material-symbols-outlined text-sm"
//                               data-icon="cancel"
//                             >
//                               cancel
//                             </span>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//       {recipe.reviewRecipe && (
//         <ReviewRecipeForm recipe={recipe.selectedRecipe} closeReviewForm={closeReviewForm} showRecipes={showRecipes} />
//       )}
//     </>
//   );
// };

// export default Dashboard;


import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ReviewRecipeForm from "./ReviewRecipeForm";
import LogoLoader from "../../LogoLoader";

const Dashboard = () => {
  const [recipeState, setRecipeState] = useState({
    reviewRecipe: false,
    selectedRecipe: null,
  });

  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const closeReviewForm = () => {
    setRecipeState({
      reviewRecipe: false,
      selectedRecipe: null,
    });
  };

  const showRecipes = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_RECIPE_APP_API}/recipes/pendingRecipes`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (Array.isArray(response.data?.rows)) {
        setAllRecipes(response.data.rows);
      } else {
        console.error(
          "API success but recipes array is missing:",
          response.data
        );

        setAllRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch pending recipes."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    showRecipes();
  }, [showRecipes]);

  const handleApproveAndReject = async (recipeId, status) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_RECIPE_APP_API}/recipes/updateStatus`,
        {
          recipe_id: recipeId,
          status,
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

      closeReviewForm();
      await showRecipes();
    } catch (error) {
      console.error("Error updating recipe status:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update recipe status."
      );
    }
  };

  return (
    <>
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 bg-surface">
        {/* Page header */}
        <div className="mb-8 lg:mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5">
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black text-primary leading-tight tracking-tighter">
              Pending Approvals
            </h1>

            <p className="text-on-surface-variant mt-2 text-sm sm:text-base lg:text-lg italic font-headline">
              Reviewing the latest culinary submissions for the
              editorial collection.
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0 bg-surface-container-low px-5 sm:px-6 py-3 rounded-xl flex items-center justify-center sm:justify-start gap-4">
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

        {/* Content */}
        <div className="rounded-xl editorial-shadow overflow-hidden">
          {loading ? (
            <div className="min-h-72 flex items-center justify-center">
              <LogoLoader />
            </div>
          ) : allRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 sm:py-20 gap-4 text-center">
              <span
                className="material-symbols-outlined text-5xl sm:text-6xl text-on-surface-variant"
                aria-hidden="true"
              >
                hourglass_empty
              </span>

              <p className="text-sm text-on-surface-variant">
                No pending recipes at the moment.
              </p>
            </div>
          ) : (
            <>
              <p className="sm:hidden px-4 pt-3 text-xs text-on-surface-variant/60">
                Swipe horizontally to see all details.
              </p>

              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[760px] text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="px-4 lg:px-8 py-4 lg:py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold whitespace-nowrap">
                        Recipe &amp; Author
                      </th>

                      <th className="px-4 lg:px-8 py-4 lg:py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold whitespace-nowrap">
                        Submission Date
                      </th>

                      <th className="px-4 lg:px-8 py-4 lg:py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold whitespace-nowrap">
                        Status
                      </th>

                      <th className="px-4 lg:px-8 py-4 lg:py-5 text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold text-right whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-surface-container">
                    {allRecipes.map((recipeItem) => (
                      <tr
                        key={recipeItem.recipe_id}
                        className="group hover:bg-surface-container-low transition-colors"
                      >
                        <td className="px-4 lg:px-8 py-5 lg:py-6">
                          <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                              <img
                                alt={recipeItem.title}
                                className="w-full h-full object-cover"
                                src={recipeItem.image_url}
                              />
                            </div>

                            <div className="min-w-0">
                              <div
                                className="max-w-48 lg:max-w-72 truncate font-headline font-bold text-base lg:text-lg text-primary"
                                title={recipeItem.title}
                              >
                                {recipeItem.title}
                              </div>

                              <div className="max-w-48 truncate text-sm text-on-surface-variant">
                                by Chef {recipeItem.creator_name}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 lg:px-8 py-5 lg:py-6 text-sm text-on-surface-variant font-medium whitespace-nowrap">
                          {new Date(
                            recipeItem.created_at
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>

                        <td className="px-4 lg:px-8 py-5 lg:py-6 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-label font-bold uppercase tracking-widest bg-secondary-container/10 text-secondary ring-1 ring-inset ring-secondary/20">
                            {recipeItem.status === "pending"
                              ? "Pending Review"
                              : recipeItem.status}
                          </span>
                        </td>

                        <td className="px-4 lg:px-8 py-5 lg:py-6">
                          <div className="flex justify-end gap-2 lg:gap-3">
                            <button
                              type="button"
                              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary-container hover:text-white transition-all text-primary"
                              title="View Details"
                              aria-label={`View ${recipeItem.title}`}
                              onClick={() =>
                                setRecipeState({
                                  reviewRecipe: true,
                                  selectedRecipe: recipeItem,
                                })
                              }
                            >
                              <span
                                className="material-symbols-outlined text-sm"
                                aria-hidden="true"
                              >
                                visibility
                              </span>
                            </button>

                            <button
                              type="button"
                              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-surface-container hover:bg-green-600 hover:text-white transition-all text-green-700"
                              title="Approve"
                              aria-label={`Approve ${recipeItem.title}`}
                              onClick={() =>
                                handleApproveAndReject(
                                  recipeItem.recipe_id,
                                  "approved"
                                )
                              }
                            >
                              <span
                                className="material-symbols-outlined text-sm"
                                aria-hidden="true"
                              >
                                check_circle
                              </span>
                            </button>

                            <button
                              type="button"
                              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-surface-container hover:bg-error hover:text-white transition-all text-error"
                              title="Reject"
                              aria-label={`Reject ${recipeItem.title}`}
                              onClick={() =>
                                handleApproveAndReject(
                                  recipeItem.recipe_id,
                                  "rejected"
                                )
                              }
                            >
                              <span
                                className="material-symbols-outlined text-sm"
                                aria-hidden="true"
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
            </>
          )}
        </div>
      </main>

      {recipeState.reviewRecipe && (
        <ReviewRecipeForm
          recipe={recipeState.selectedRecipe}
          closeReviewForm={closeReviewForm}
          showRecipes={showRecipes}
        />
      )}
    </>
  );
};

export default Dashboard;