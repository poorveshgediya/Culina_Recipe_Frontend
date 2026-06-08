import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <div>
      <header className="relative w-full h-150 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background-light z-10"></div>
            <img
              alt="Gourmet Meal"
              className="w-full h-full object-cover"
              data-alt="High-resolution overhead shot of a gourmet plated meal"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVBoGBl-MWyWQq3Tcd_P2m1gvLu4vap6p1jATQuUEaW-dfWRt-on64XJX0TNWz23AefaGRP98Ce6h-4VPZkYkSQrR4XRdX7HXgnR7_NuPekq8-qsncycEcraW2laUJZWF4fv2gvJYBuikTVF65HW79vz1Qg60sK_XADtGxpYysceTiBouzc16J1yM2qxLUOdSQ7rUaDQ_T9JvYeRRMKlfry6GsWJnkJJZ7x3rO3fRdLIKxzMfR78ot6CsO4Jr7o9i9ipKjBH2U0xE8"
            />
          </div>
          <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-6">
              Culinary Inspiration Awaits
            </span>
            <h1 className="text-5xl md:text-7xl font-800 text-white mb-6 leading-[1.1] tracking-tight font-display">
              Discover Your Next{" "}
              <span className="text-primary">Favorite Meal</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium">
              Join a community of food lovers and explore thousands of
              hand-picked recipes from award-winning chefs and home cooks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/25"
              to={"/AllRecipeList"}
              >
                Get Started Free
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl text-lg hover:bg-white/20 transition-all">
                Browse Trending
              </button>
            </div>
          </div>
        </header>
    </div>
  )
}

export default HeroSection
