
import { CategoryByRecipe } from "../../js/CategoryRecipe";

const CategoryRecipe = () => {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-30">
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-primary/5">
          <div className="flex items-center justify-between gap-4 overflow-x-auto hide-scrollbar pb-2">
            {CategoryByRecipe.map((data) => (
              <a
                className="flex flex-col items-center gap-3 min-w-25 group"
                key={data.id}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary transition-all p-0.5">
                  <img
                    alt={data.categorytext}
                    className="w-full h-full object-cover rounded-full"
                    data-alt="Authentic Italian pasta dish with tomato sauce"
                    src={data.image}
                  />
                </div>
                <span className="text-sm font-bold group-hover:text-primary transition-colors">
                  {data.categorytext}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryRecipe;
