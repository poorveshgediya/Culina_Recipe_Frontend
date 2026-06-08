import React from "react";

const RecipeListSkeleton = () => {
  return (
    <>
      <div className="group relative flex flex-col justify-center items-center md:flex-row gap-8 bg-surface-container-lowest p-4 rounded-xl overflow-hidden">
        {/* <!-- Shimmer Bar Top --> */}
        <div className="absolute top-0 left-0 w-full h-1 shimmer-bg opacity-40"></div>
        {/* <!-- Left: Large Image Placeholder --> */}
        <div className="w-full md:w-48 aspect-[4/3] rounded-xl shimmer-bg flex-shrink-0"></div>
        {/* <!-- Right: Content Placeholder --> */}
        <div className="flex-1 space-y-4 py-2">
          <div className="h-10 w-3/4 shimmer-bg rounded-lg"></div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-11/12 shimmer-bg rounded"></div>
            <div className="h-4 w-4/5 shimmer-bg rounded"></div>
          </div>
          <div className="flex items-center gap-6 pt-4">
            <div className="h-4 w-24 shimmer-bg rounded"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
          </div>
        </div>
        <div className="flex h-6 px-17 py-4 shimmer-bg rounded-lg"></div>
      </div>
      <div className="group relative flex flex-col justify-center items-center md:flex-row gap-8 bg-surface-container-lowest p-4 rounded-xl overflow-hidden">
        {/* <!-- Shimmer Bar Top --> */}
        <div className="absolute top-0 left-0 w-full h-1 shimmer-bg opacity-40"></div>
        {/* <!-- Left: Large Image Placeholder --> */}
        <div className="w-full md:w-48 aspect-[4/3] rounded-xl shimmer-bg flex-shrink-0"></div>
        {/* <!-- Right: Content Placeholder --> */}
        <div className="flex-1 space-y-4 py-2">
          <div className="h-10 w-3/4 shimmer-bg rounded-lg"></div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-11/12 shimmer-bg rounded"></div>
            <div className="h-4 w-4/5 shimmer-bg rounded"></div>
          </div>
          <div className="flex items-center gap-6 pt-4">
            <div className="h-4 w-24 shimmer-bg rounded"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
          </div>
        </div>
        <div className="flex h-6 px-17 py-4 shimmer-bg rounded-lg"></div>
      </div>
      <div className="group relative flex flex-col justify-center items-center md:flex-row gap-8 bg-surface-container-lowest p-4 rounded-xl overflow-hidden">
        {/* <!-- Shimmer Bar Top --> */}
        <div className="absolute top-0 left-0 w-full h-1 shimmer-bg opacity-40"></div>
        {/* <!-- Left: Large Image Placeholder --> */}
        <div className="w-full md:w-48 aspect-[4/3] rounded-xl shimmer-bg flex-shrink-0"></div>
        {/* <!-- Right: Content Placeholder --> */}
        <div className="flex-1 space-y-4 py-2">
          <div className="h-10 w-3/4 shimmer-bg rounded-lg"></div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-11/12 shimmer-bg rounded"></div>
            <div className="h-4 w-4/5 shimmer-bg rounded"></div>
          </div>
          <div className="flex items-center gap-6 pt-4">
            <div className="h-4 w-24 shimmer-bg rounded"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
          </div>
        </div>
        <div className="flex h-6 px-17 py-4 shimmer-bg rounded-lg"></div>
      </div>
    </>
  );
};

export default RecipeListSkeleton;
