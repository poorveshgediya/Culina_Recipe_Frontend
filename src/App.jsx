import { Navigate, Route, Router, Routes } from "react-router";
import "./App.css";
import Homescreen from "./components/Homescreen";
import LogIn from "./components/LogIn";
import FullRecipePage from "./pages/FullRecipePage";
import AdminDashboard from "./admin/AdminDashboard";
import Dashboard from "./admin/wrapper/Dashboard";
import Recipe from "./admin/wrapper/Recipe";
import UserDirectory from "./admin/wrapper/UserDirectory";
import ProtectedRoute from "./components/ProtectedRoute";
import FavouriteRecipe from "./components/Favourite/favouriteRecipe";
import AllRecipeListWrapper from "./components/AllRecipes/AllRecipeListWrapper";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/AllRecipeList" element={<AllRecipeListWrapper />} />
        <Route path="/FullRecipe/:id" element={<FullRecipePage />} />
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
