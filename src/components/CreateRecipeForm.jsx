import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CreateRecipeForm = ({ handleCreateUserClick }) => {
  const [image, setImage] = useState({
    setFile: null,
    setUrl: null,
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cooking_time: "",
    ingredients: ["", "", "", ""],
    process: ["", "", ""],
    image_url: "",
    meal_type: "anytime",
    difficulty_level: "easy",
    tips: "",
    admin_feedback: "",
    created_by: "",
    preparation_time: "",
    Calories: "",
    Protein: "",
    Fats: "",
    Carbs: "",
    servings: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addIngredients = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const removeIngredient = (index) => {
    const updated = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updated });
  };

  const addProcess = () => {
    setFormData({
      ...formData,
      process: [...formData.process, ""],
    });
  };

  const removeProcess = (index) => {
    const updated = formData.process.filter((_, i) => i !== index);
    setFormData({ ...formData, process: updated });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      let decodedToken = jwtDecode(token);
      setFormData({ ...formData, created_by: decodedToken.user_id });
    } catch (error) {
      console.error("Error decoding JWT token: ", error);
    }
  }, []);

  const handleFormData = () => {
    const data = new FormData();

    if (image.setFile) {
      data.append("image_url", image.setFile);
    }

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("cooking_time", formData.cooking_time);
    data.append("preparation_time", formData.preparation_time);
    data.append("meal_type", formData.meal_type);
    data.append("difficulty_level", formData.difficulty_level);
    data.append("tips", formData.tips);
    data.append("created_by", formData.created_by);
    data.append("Calories", formData.Calories);
    data.append("Protein", formData.Protein);
    data.append("Fats", formData.Fats);
    data.append("Carbs", formData.Carbs);
    data.append("servings", formData.servings);

    const filteredIngredients = formData.ingredients.filter(
      (i) => i.trim() !== "",
    );
    const filteredProcess = formData.process.filter((p) => p.trim() !== "");
    data.append("ingredients", JSON.stringify(filteredIngredients));
    data.append("process", JSON.stringify(filteredProcess));

    axios
      .post(`${import.meta.env.VITE_RECIPE_APP_API}/recipes/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert(
            "Recipe submitted successfully! It will be reviewed by our editorial team within 24 hours.",
          );
          handleCreateUserClick(); // Close the form after successful submission
        } else {
          alert("There was an issue submitting your recipe. Please try again.");
        }
      })
      .catch((error) => {
        alert(
          error.response?.data?.message ||
            "Failed to submit recipe. Check if the server is running.",
        );
        console.error("Error creating recipe: ", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const submitFormData = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    handleFormData();
  };

  return (
    <div className="bg-background text-on-surface font-body antialiased">
      <main className="pt-24 pb-20 max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex justify-between items-center">
            <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-primary-form-form leading-none mb-4">
              Share Your Craft
            </h1>
            <button
              className="text-on-primary bg-primary-form rounded-sm px-3 py-2 flex font-label text-xs font-bold uppercase tracking-[0.15em] editorial-shadow hover:scale-105 active:scale-95 transition-all"
              type="button"
              onClick={handleCreateUserClick}
            >
              <span
                className="material-symbols-outlined text-xl"
                data-icon="close"
              >
                close
              </span>
            </button>
          </div>
          <p className="text-on-surface-variant font-body text-lg max-w-2xl leading-relaxed">
            Document your culinary journey. Transform your unique flavors into a
            curated digital experience for our global community.
          </p>
        </div>
        <form
          className="space-y-16"
          onSubmit={(e) => {
            submitFormData(e);
          }}
        >
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7 space-y-8">
              <div className="group">
                <label className="block text-xs font-bold tracking-widest text-primary-form uppercase mb-2">
                  Recipe Title
                </label>
                <input
                  className="minimalist-input w-full py-4 text-3xl font-headline placeholder:text-surface-variant font-bold"
                  placeholder="e.g., Wood-Fired Heirloom Tomato Tart"
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold tracking-widest text-primary-form uppercase mb-2">
                  The Narrative (Description)
                </label>
                <textarea
                  className="minimalist-input w-full py-4 text-lg font-body placeholder:text-surface-variant resize-none"
                  placeholder="Briefly share the inspiration or history behind this dish..."
                  rows="3"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold tracking-widest text-primary-form/60 uppercase">
                    Prep Time
                  </label>
                  <input
                    className="minimalist-input w-full py-2 font-medium"
                    placeholder="20 min"
                    type="number"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preparation_time: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold tracking-widest text-primary-form/60 uppercase">
                    Cook Time
                  </label>
                  <input
                    className="minimalist-input w-full py-2 font-medium"
                    placeholder="45 min"
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, cooking_time: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold tracking-widest text-primary-form/60 uppercase">
                    Servings
                  </label>
                  <input
                    className="minimalist-input w-full py-2 font-medium"
                    placeholder="4"
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, servings: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold tracking-widest text-primary-form/60 uppercase">
                    Level
                  </label>
                  <select
                    className="minimalist-input w-full py-2 font-medium appearance-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty_level: e.target.value,
                      })
                    }
                  >
                    <option>easy</option>
                    <option>medium</option>
                    <option>hard</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold tracking-widest text-primary-form/60 uppercase">
                    Meal Type
                  </label>
                  <select
                    className="minimalist-input w-full py-2 font-medium appearance-none"
                    onChange={(e) =>
                      setFormData({ ...formData, meal_type: e.target.value })
                    }
                  >
                    <option>Anytime</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="md:col-span-5">
              {/* The hidden real input */}
              <input
                type="file"
                id="recipe-image"
                className="hidden" // Hides the ugly default button
                accept="image/*"
                name="image_url"
                // onChange={(e) => setImageFile(e.target.files[0])}
                onChange={(e) =>
                  setImage({ ...image, setFile: e.target.files[0] })
                }
              />

              {/* The Stylised Label (Acts as the button) */}
              <label
                htmlFor="recipe-image"
                className="relative group cursor-pointer aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center p-8 transition-all hover:bg-surface-container block"
              >
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-cover bg-center"
                  // style={{
                  //   backgroundImage:
                  //     "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqh9JMlaBNwC4HFKOriwgdhxnd7xmqzeie0y0Rc51KWWNTzXK4eqMxejcqCKtLzk6oek22yeoZ8O-P7okN40XZmSOcduIQaOAxz0RNCIRRXad8FcFyO0J76eUu4lX6CJdNEExvNH3qnDLpVwRqRQJF_uaKKQMa0xdhje7_0dXDpCK3EyTYxkX50KOSmEeS7BZAhRq91ZP5-7d6QuvRQQqlCdsIQI9HpZzZLi-F4lhhlsaAFRTD1jgcQLcUQUoJ-32YUIDf7CVAapIO')",
                  // }}
                  style={{
                    backgroundImage: `url(${image.setUrl ? image.setUrl : "https://lh3.googleusercontent.com/aida-public/AB6AXuAqh9JMlaBNwC4HFKOriwgdhxnd7xmqzeie0y0Rc51KWWNTzXK4eqMxejcqCKtLzk6oek22yeoZ8O-P7okN40XZmSOcduIQaOAxz0RNCIRRXad8FcFyO0J76eUu4lX6CJdNEExvNH3qnDLpVwRqRQJF_uaKKQMa0xdhje7_0dXDpCK3EyTYxkX50KOSmEeS7BZAhRq91ZP5-7d6QuvRQQqlCdsIQI9HpZzZLi-F4lhhlsaAFRTD1jgcQLcUQUoJ-32YUIDf7CVAapIO"})`,
                  }}
                ></div>

                <span className="material-symbols-outlined text-4xl text-primary-form/40 mb-4">
                  add_a_photo
                </span>

                <h4 className="font-headline text-xl font-bold text-primary-form mb-2">
                  The Hero Image
                </h4>

                <p className="text-xs text-on-surface-variant font-medium tracking-wide uppercase px-4 leading-relaxed">
                  {formData.image_url
                    ? `Selected: ${formData.image_url}`
                    : "High resolution portrait recommended for editorial style"}
                </p>
              </label>
            </div>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-surface-container-low p-8 rounded-xl editorial-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline text-2xl font-bold text-primary-form">
                    Ingredients
                  </h3>
                  <button
                    className="text-secondary hover:text-secondary-container transition-colors"
                    type="button"
                    onClick={() => addIngredients()}
                  >
                    <span
                      className="material-symbols-outlined"
                      data-icon="add_circle"
                    >
                      add_circle
                    </span>
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.ingredients.map((ingredient, index) => (
                    <div className="flex gap-3" key={index}>
                      <input
                        className="minimalist-input w-full py-2 text-sm"
                        placeholder="2 tsp Smoked Paprika"
                        type="text"
                        onChange={(e) => {
                          const updated = formData.ingredients.map((val, i) =>
                            i === index ? e.target.value : val,
                          );
                          setFormData({ ...formData, ingredients: updated });
                        }}
                      />
                      <button
                        className="text-secondary hover:text-secondary-container transition-colors"
                        type="button"
                        onClick={() => removeIngredient(index)}
                      >
                        <span
                          className="material-symbols-outlined"
                          data-icon="delete"
                        >
                          delete
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary-container text-surface p-8 rounded-xl">
                <h3 className="font-headline text-2xl font-bold mb-6">
                  Nutrition Profile
                </h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest opacity-60 uppercase mb-1">
                      Calories
                    </label>
                    <input
                      className="bg-transparent border flex text-center border-surface/20 w-full py-1 text-sm focus:outline-none focus:border-secondary transition-colors"
                      placeholder="320 kcal"
                      type="number"
                      onChange={(e) =>
                        setFormData({ ...formData, Calories: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest opacity-60 uppercase mb-1">
                      Protein
                    </label>
                    <input
                      className="bg-transparent border flex text-center border-surface/20 w-full py-1 text-sm focus:outline-none focus:border-secondary transition-colors"
                      placeholder="12g"
                      type="number"
                      onChange={(e) =>
                        setFormData({ ...formData, Protein: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest opacity-60 uppercase mb-1">
                      Fats
                    </label>
                    <input
                      className="bg-transparent border flex text-center border-surface/20 w-full py-1 text-sm focus:outline-none focus:border-secondary transition-colors"
                      placeholder="18g"
                      type="number"
                      onChange={(e) =>
                        setFormData({ ...formData, Fats: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest opacity-60 uppercase mb-1">
                      Carbs
                    </label>
                    <input
                      className="bg-transparent border flex text-center border-surface/20 w-full py-1 text-sm focus:outline-none focus:border-secondary transition-colors"
                      placeholder="42g"
                      type="number"
                      onChange={(e) =>
                        setFormData({ ...formData, Carbs: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-12">
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-3xl font-bold text-primary-form">
                  Preparation Steps
                </h3>
                <button
                  className="flex items-center gap-2 text-xs font-bold tracking-widest text-primary-form uppercase hover:text-secondary transition-colors"
                  type="button"
                  onClick={() => addProcess()}
                >
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="add"
                  >
                    add
                  </span>{" "}
                  Add Step
                </button>
              </div>
              <div className="space-y-12">
                {formData.process.map((step, index) => (
                  <div className="flex gap-8" key={index}>
                    <div>
                      <span className="text-6xl font-black text-primary-form-fixed/20 font-headline leading-none select-none">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="flex flex-1">
                      <textarea
                        className="minimalist-input w-full py-2 text-lg leading-relaxed placeholder:text-surface-variant resize-none"
                        placeholder="e.g., In a large bowl, combine the flour, sugar, and salt. Gradually add the cold butter, using your fingers or a pastry cutter to blend until the mixture resembles coarse crumbs..."
                        rows="2"
                        onChange={(e) => {
                          const updated = formData.process.map((val, i) =>
                            i === index ? e.target.value : val,
                          );
                          setFormData({ ...formData, process: updated });
                        }}
                      ></textarea>
                      <button
                        className="p-4 text-secondary hover:text-secondary-container transition-colors"
                        type="button"
                        onClick={() => removeProcess(index)}
                      >
                        <span
                          className="material-symbols-outlined"
                          data-icon="delete"
                        >
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <section className="p-8 rounded-xl border-l-4 border-primary">
                <div className="">
                  <div className="space-y-2">
                    <span className="font-bold text-sm text-primary uppercase">
                      Pro Tip
                    </span>
                    <textarea
                      className="minimalist-input w-full py-2 text-lg leading-relaxed placeholder:text-surface-variant resize-none"
                      placeholder="Preheat the oven to 200°C (400°F). Roll out your pastry on a lightly floured surface..."
                      rows="2"
                      onChange={(e) =>
                        setFormData({ ...formData, tips: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <div className="pt-12 border-t border-surface-container flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <span
                className="material-symbols-outlined"
                data-icon="auto_awesome"
              >
                auto_awesome
              </span>
              <p className="text-sm italic">
                This recipe will be reviewed by our editorial team within 24
                hours.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <button
                className=" w-full bg-linear-to-r from-secondary to-secondary-container px-12 py-4 text-sm font-bold tracking-widest text-white uppercase rounded-full editorial-shadow hover:scale-105 active:scale-95 transition-all"
                type="submit"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Submitting..." : "Submit for Approval"}
              </button>
            </div>
          </div>
        </form>
      </main>
      <footer className="bg-surface-dim py-12 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold text-primary-form font-headline">
            CulinaShare
          </div>
          <div className="flex gap-8">
            <a
              className="text-xs font-bold tracking-widest text-primary-form/60 uppercase hover:text-primary-form transition-colors"
              href="#"
            >
              Guidelines
            </a>
            <a
              className="text-xs font-bold tracking-widest text-primary-form/60 uppercase hover:text-primary-form transition-colors"
              href="#"
            >
              Legal
            </a>
            <a
              className="text-xs font-bold tracking-widest text-primary-form/60 uppercase hover:text-primary-form transition-colors"
              href="#"
            >
              Help Center
            </a>
          </div>
          <p className="text-[10px] text-primary-form/40 uppercase tracking-[0.2em]">
            © 2024 CulinaShare Editorial Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateRecipeForm;
