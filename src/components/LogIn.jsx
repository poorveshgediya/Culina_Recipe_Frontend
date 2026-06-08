import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMess, setErrMess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const CheckLoginData = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (email && password) {
      axios
        .post(`${import.meta.env.VITE_RECIPE_APP_API}/user/login`, {
          email,
          password,
        })
        .then((response) => {
          console.log(response.data);
          const { token } = response.data;
          localStorage.setItem("token", token);
          const user = jwtDecode(token);

          if (user.role === "admin") {
            navigate("/admin");
          } else if (user) {
            navigate("/AllRecipeList");
          } else {
            console.error("User data missing in response");
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
          const serverErrMess =
            error.response.data.message || "Login failed. Please try again.";
          setErrMess(serverErrMess);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div className="bg-background-light text-slate-900 min-h-screen">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* <!-- Left Side: Visual Inspiration (Desktop Only) --> */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              data-alt="Close up of fresh organic vegetables and artisanal bread on a wooden table"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdFDiyeZK3bDt-JjIuWA_kQHcV2JANetKVdIERLGdbUjaJzQZ6_l3jnHMoRTB9bUSctrVtadqalb_JZ-ovJ2v-XNrzbPeVcMhrtaBk3qG4NVGLQtHxY-5DfH0Puk_FekDMBBZC3lzbKi8iw3WtVNekHvXdI9E6e19hRBKK8CDuXk4mpUmzo8A5VVCGvfbFYhy8m_uUf6aMSsEyG8e1dL-HlS2F1BL_RMJiKOqHMmVKJd5CJWw3Pdb1HjkJ0hOu-TfbgUARsYT_hoVb')",
              }}
            >
              {/* <!-- Warm Overlay --> */}
              <div className="absolute inset-0 bg-orange-900/10 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            {/* <!-- Logo / Branding Overlay --> */}
            <div className="absolute top-12 left-12 flex items-center gap-3 text-white">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-3xl">
                  restaurant
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">CulinaShare</h1>
            </div>
            {/* <!-- Testimonial / Quote Overlay --> */}
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <p className="text-2xl font-medium italic leading-relaxed mb-4">
                "The best recipes are the ones shared with the people you love."
              </p>
              <p className="text-sm uppercase tracking-widest opacity-80">
                — Chef Julian Rossi
              </p>
            </div>
          </div>
          {/* <!-- Right Side: Login Form --> */}
          <div className="flex-1 flex flex-col justify-center items-center bg-soft-cream px-6 py-12 lg:px-20 ">
            <div className="w-full max-w-md space-y-8">
              {/* <!-- Form Header --> */}
              <div className="text-center lg:text-left">
                <div className="lg:hidden flex justify-center mb-6">
                  <div className="size-12 bg-primary rounded-lg flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-white text-3xl">
                      restaurant
                    </span>
                  </div>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
                  Welcome Back!
                </h2>
                <p className="text-slate-600 text-lg">
                  Sign in to explore your saved recipes and new inspirations.
                </p>
                {errMess && (
                  <div className="mt-6 p-4 bg-red-50  border border-red-100 rounded-lg flex items-start gap-3 text-red-800 animate-in fade-in slide-in-from-top-1 duration-300">
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-red-500 flex-shrink-0"
                    >
                      error
                    </span>
                    <p className="text-sm font-medium leading-relaxed font-display italic">
                      {errMess}
                    </p>
                  </div>
                )}
              </div>
              {/* <!-- Login Form --> */}
              <form onSubmit={CheckLoginData} className="space-y-6">
                {/* <!-- Email Field --> */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-semibold text-slate-700 "
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative  flex">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-terracotta transition-colors">
                      mail
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-3 bg-white  border border-slate-200 rounded-lg focus-terracotta transition-all placeholder:text-slate-400"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      type="email"
                    />
                  </div>
                </div>
                {/* <!-- Password Field --> */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-semibold text-slate-700 "
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-terracotta transition-colors">
                      lock
                    </span>
                    <input
                      className="w-full pl-10 pr-12 py-3 bg-white  border border-slate-200 rounded-lg focus-terracotta transition-all placeholder:text-slate-400"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/4 text-slate-400 hover:text-slate-600"
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined"
                        onClick={HandlePasswordToggle}
                      >
                        visibility
                      </span>
                    </button>
                  </div>
                </div>
                {/* <!-- Submit Button --> */}
                <button
                  className="w-full py-4 bg-primary hover:bg-[#14b348] text-white font-bold text-lg rounded-lg shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Log In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
