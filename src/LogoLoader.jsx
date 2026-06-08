import React from "react";

const LogoLoader = () => {
  return (
    // <div className=" text-on-surface font-body overflow-hidden">
      <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* <!-- Asymmetric Editorial Image Component (Glassmorphism Overlay) --> */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            className="w-full h-full object-cover opacity-5 scale-110"
            data-alt="A high-end overhead photograph of a minimalist kitchen counter featuring fresh organic ingredients like rosemary sprigs and sea salt. The lighting is soft and natural, coming from a large side window, creating a serene and appetizing atmosphere. The color palette is dominated by soft creams and deep emerald greens, reflecting a premium culinary editorial style with a focus on tactile textures and intentional white space."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkavEXjKbSAgiUcO0cqJJfwniXzMUd4UGQZJnkZziEoooTG3mVsaC3HDvgkkiwwB0-e4qlbg-XlPBwlkUxGuQ_acRI-xpm55EOUty_T0f9gTz5oyo_iT8Mw0IwewphUyu9zdnHMqVbIjONQq3jRVkfMUVwZs8ILNyNTuA_sJExh7DRw8qXfNMtqQkJzeT5kz741bss5_Fs8OiBuUapueFD5pd1sqv360lW6M_4En8AIWPJjc9tZy9sS7NHLTWHGkTIFRKsBtWyv4Vv"
          />
          <div className="absolute inset-0 glass-overlay"></div>
        </div>
        {/* <!-- Central Loading Hub --> */}
        <div className="relative z-10 flex flex-col items-center">
          {/* <!-- Logo & Loader Assembly --> */}
          <div className="relative flex items-center justify-center w-28 h-28">
            {/* <!-- The Spinning Blur Ring --> */}
            <div className="absolute inset-0 rounded-full blur-ring animate-subtle-spin opacity-80"></div>
            {/* <!-- Inner Decorative Ring --> */}
            <div className="absolute inset-4 border border-outline-variant/20 rounded-full"></div>
            {/* <!-- Central Branding Element --> */}
            <div className="relative flex flex-col items-center justify-center bg-surface-bright p-8 rounded-full shadow-[0_12px_40px_rgba(28,28,25,0.06)] animate-pulse-slow">
              <span
                className="material-symbols-outlined text-5xl text-primary-container"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                restaurant_menu
              </span>
            </div>
          </div>
        </div>
        {/* <!-- Loading Text --> */}
        <div
          className="mt-12 text-center reveal-delay"
          style={{ animationDelay: "0.3s" }}
        >
          <h1 className="font-display text-xl font-bold text-primary-container tracking-tight">
            CulinaShare
          </h1>
          <p className="mt-2 font-body text-sm font-medium uppercase tracking-[0.2em] text-on-surface-variant/70">
            Loading Excellence
          </p>
          {/* <!-- Animated Progress Dots --> */}
          <div className="mt-6 flex justify-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 rounded-full bg-primary-container animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default LogoLoader;
