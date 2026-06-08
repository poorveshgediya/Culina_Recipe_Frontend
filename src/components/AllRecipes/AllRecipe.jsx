import React from "react";
import RecipeView from "./RecipeView";
import { useState } from "react";
import RecipeList from "./RecipeList";
import FavouriteRecipe from "../Favourite/FavouriteRecipe";

const AllRecipe = ({ recipeNav, handleChangeRecipeNavToAllRecipes }) => {
  
  return (
    <>
      {recipeNav === "AllRecipes" && <RecipeList />}
      {recipeNav === "FavouriteRecipes" && <FavouriteRecipe handleChangeRecipeNavToAllRecipes={handleChangeRecipeNavToAllRecipes}/>}
    </>
  );
};

export default AllRecipe;
