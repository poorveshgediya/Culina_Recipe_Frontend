import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-background-dark text-slate-400 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-primary text-white p-1 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">
                      restaurant_menu
                    </span>
                  </div>
                  <h1 className="text-lg font-800 tracking-tight text-white font-display uppercase">
                    CulinaShare
                  </h1>
                </div>
                <p className="text-sm leading-relaxed">
                  Sharing the world's best recipes since 2024. Join our
                  community of culinary enthusiasts.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Platform</h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      How it Works
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      Community Guidelines
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Discover</h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      Trending Recipes
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      Expert Tips
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      Meal Planning
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      Cuisines
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Newsletter</h4>
                <p className="text-sm mb-4">
                  Get the best recipes delivered to your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    className="bg-white/5 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-primary"
                    placeholder="Email"
                    type="email"
                  />
                  <button className="bg-primary text-white p-2 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 text-center text-xs">
              © 2026 CulinaShare. All rights reserved. Designed for Food Lovers.
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer
