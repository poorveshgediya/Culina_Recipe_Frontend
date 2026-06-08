import "../App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Featured from "./HomeScreen/Featured";
import CategoryRecipe from "./HomeScreen/CategoryRecipe";
import HeroSection from "./HomeScreen/HeroSection";

const Homescreen = () => {
  return (
    <div>
      <div className="bg-background-light text-slate-900 min-h-screen">
        {/* <!-- Navigation Bar --> */}
        <NavBar/>

        {/* <!-- Hero Section --> */}
        <HeroSection/>
        
        {/* <!-- Category Bar Section --> */}
        <CategoryRecipe/>
        
        {/* <!-- Featured Section --> */}
        <Featured/>
        
        {/* <!-- Footer --> */}
        <Footer/>
      </div>
    </div>
  );
};

export default Homescreen;
