import "../../App.css";
import { useState } from "react";
import CreateRecipeForm from "../CreateRecipeForm";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import RecipeView from "./RecipeView";
import { jwtDecode } from "jwt-decode";
import Header from "../Header";
import AllRecipe from "./AllRecipe";

const AllRecipeListWrapper = () => {
  const [recipeView, setRecipeView] = useState({
    createForm: false,
  });
  const [user, setUser] = useState(null);
  const [recipeNav, setRecipeNav] = useState("AllRecipes");

  const handleChangeRecipeNavToFavouriteRecipes = () => {
    setRecipeNav("FavouriteRecipes");
  };
  const handleChangeRecipeNavToAllRecipes = () => {
    setRecipeNav("AllRecipes");
  };

  const handleCreateUserClick = () => {
    setRecipeView({ ...recipeView, createForm: !recipeView.createForm });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({ full_name: decodedToken.full_name });
    }
  }, []);

  return (
    <div>
      {!recipeView.createForm && (
        <div className="bg-background-light text-slate-900 min-h-screen">
          {/* <!-- Top Navigation Bar --> */}
          <Header
            user={user}
            handleCreateUserClick={handleCreateUserClick}
            handleChangeRecipeNavToFavouriteRecipes={
              handleChangeRecipeNavToFavouriteRecipes
            }
            handleChangeRecipeNavToAllRecipes={
              handleChangeRecipeNavToAllRecipes
            }
            recipeNav={recipeNav}
          />

          <AllRecipe recipeNav={recipeNav} handleChangeRecipeNavToAllRecipes={handleChangeRecipeNavToAllRecipes} />
        </div>
      )}

      {recipeView.createForm && (
        <CreateRecipeForm handleCreateUserClick={handleCreateUserClick} />
      )}
    </div>
  );
};

export default AllRecipeListWrapper;
