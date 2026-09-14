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

    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const fullName = decodedToken.full_name || "";

      const nameParts = fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const surname = nameParts.at(-1) || "";

      const shortName =
        nameParts.length > 1
          ? `${firstName.charAt(0)}${surname.charAt(0)}`.toUpperCase()
          : firstName.slice(0, 2).toUpperCase();

      setUser({
        full_name: fullName,
        short_name: shortName,
      });
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
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

          <AllRecipe
            recipeNav={recipeNav}
            handleChangeRecipeNavToAllRecipes={
              handleChangeRecipeNavToAllRecipes
            }
          />
        </div>
      )}

      {recipeView.createForm && (
        <CreateRecipeForm handleCreateUserClick={handleCreateUserClick} />
      )}
    </div>
  );
};

export default AllRecipeListWrapper;
