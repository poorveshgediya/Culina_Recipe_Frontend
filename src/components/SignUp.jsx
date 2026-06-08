import React from "react";
import { Link } from "react-router";

const SignUp = () => {
  return (
    <div>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center">
        <div className="flex w-full min-h-screen">
          {/* <!-- Left Side: Hero Image (Desktop Only) --> */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              data-alt="A warm and inviting communal dinner table with various rustic Mediterranean dishes and fresh herbs."
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXx0o1d1jWt5LFywdabxkOYPCvjoSdr26-J28L5QNkN3OFpgQmj216Vi-0FgRDXC1HzS5OotULuxaYU-58_dr0rNKWV6_vm8I2svYe5rLPMmXmPKhEarkxbNsGOKE39VENCC3toX4JFibcxmGzAMr5-R0i8HvQXq51oeqeDOwVmIhNBGMiUiJlrjzyWVYQl4--0wSxZokV9_wCu2Akgi-zmD69HORwi49cxK1ljjw3S31lqxMWF_43Bah81xkqymuUNR_wbqGkLZzc')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-4xl text-primary">
                  restaurant_menu
                </span>
                <h2 className="text-3xl font-bold tracking-tight">
                  CulinaShare
                </h2>
              </div>
              <h1 className="text-5xl font-extrabold leading-tight mb-4">
                Discover your next favorite meal.
              </h1>
              <p className="text-xl text-slate-200 max-w-md">
                Join a community of 50,000+ home chefs sharing authentic recipes
                from around the world.
              </p>
            </div>
          </div>
          {/* <!-- Right Side: Sign Up Form --> */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 bg-background-light dark:bg-background-dark">
            <div className="w-full max-w-md space-y-8 custom-scrollbar">
              {/* <!-- Logo & Header --> */}
              <div className="text-center lg:text-left">
                <div className="lg:hidden flex justify-center mb-6">
                  <span className="material-symbols-outlined text-5xl text-primary">
                    restaurant_menu
                  </span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Create Your Account
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Welcome to the table! Let's get you started.
                </p>
              </div>
              <form className="mt-8 space-y-6">
                {/* <!-- Personal Info --> */}
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"
                      for="full-name"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        person
                      </span>
                      <input
                        className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-slate-100"
                        id="full-name"
                        name="name"
                        placeholder="Jane Doe"
                        required=""
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"
                      for="email-address"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        mail
                      </span>
                      <input
                        autocomplete="email"
                        className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-slate-100"
                        id="email-address"
                        name="email"
                        placeholder="jane@example.com"
                        required=""
                        type="email"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1"
                      for="password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        lock
                      </span>
                      <input
                        autocomplete="new-password"
                        className="block w-full pl-11 pr-12 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-slate-100"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        required=""
                        type="password"
                      />
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/4 text-slate-400 hover:text-slate-600"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-xl">
                          visibility
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- Onboarding: Cuisine Preferences --> */}
                
                {/* <!-- Terms --> */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                      id="terms"
                      name="terms"
                      required=""
                      type="checkbox"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      className="text-slate-600 dark:text-slate-400"
                      for="terms"
                    >
                      I agree to the{" "}
                      <a
                        className="text-primary font-semibold hover:underline"
                        href="#"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        className="text-primary font-semibold hover:underline"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                </div>
                {/* <!-- Action Button --> */}
                <div>
                  <button
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/20"
                    type="submit"
                  >
                    Create Account
                  </button>
                </div>
                {/* <!-- Social Login Divider --> */}
                <div className="relative my-8">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background-light dark:bg-background-dark text-slate-500 uppercase tracking-widest text-xs font-bold">
                      Or continue with
                    </span>
                  </div>
                </div>
                {/* <!-- Social Buttons --> */}
                <div className="flex flex-col">
                  <button
                    className="flex items-center justify-center border border-slate-200 rounded-lg bg-white"
                    type="button"
                  >
                    <img
                      alt="Google"
                      className="h-25 w-25 mr-2"
                      data-alt="Google colorful logo icon"
                      src="https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.60c498c559810aa0.webp"
                    />
                  </button>
                </div>
                {/* <!-- Footer Link --> */}
                <p className="mt-10 text-center text-sm text-slate-600 dark:text-slate-400">
                  Already have an account?
                  <Link
                    className="font-bold text-primary hover:underline transition-all"
                    to="/login"
                  >
                    Log in here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
