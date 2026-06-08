import React from "react";

const FavRecSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <article className="bg-surface-container-low rounded-xl overflow-hidden">
        <div className="aspect-[4/5] bg-surface-container-highest relative shimmer">
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container-low/50"></div>
        </div>
        <div className="p-6 relative -mt-12 bg-surface-container-lowest mx-4 rounded-xl editorial-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-4 bg-surface-container-highest rounded shimmer"></div>
            <div className="w-12 h-4 bg-surface-container-highest rounded shimmer"></div>
          </div>
          <div className="w-full h-8 bg-surface-container-highest rounded mb-3 shimmer"></div>
          <div className="space-y-2 mb-6">
            <div className="w-full h-3 bg-surface-container-highest rounded shimmer"></div>
            <div className="w-2/3 h-3 bg-surface-container-highest rounded shimmer"></div>
          </div>
          <div className="w-full h-12 bg-surface-container-highest rounded-lg shimmer"></div>
        </div>
      </article>
      <article className="bg-surface-container-low rounded-xl overflow-hidden">
        <div className="aspect-[4/5] bg-surface-container-highest relative shimmer">
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container-low/50"></div>
        </div>
        <div className="p-6 relative -mt-12 bg-surface-container-lowest mx-4 rounded-xl editorial-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-4 bg-surface-container-highest rounded shimmer"></div>
            <div className="w-12 h-4 bg-surface-container-highest rounded shimmer"></div>
          </div>
          <div className="w-full h-8 bg-surface-container-highest rounded mb-3 shimmer"></div>
          <div className="space-y-2 mb-6">
            <div className="w-full h-3 bg-surface-container-highest rounded shimmer"></div>
            <div className="w-2/3 h-3 bg-surface-container-highest rounded shimmer"></div>
          </div>
          <div className="w-full h-12 bg-surface-container-highest rounded-lg shimmer"></div>
        </div>
      </article>
      <article className="bg-surface-container-low rounded-xl overflow-hidden">
        <div className="aspect-[4/5] bg-surface-container-highest relative shimmer">
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container-low/50"></div>
        </div>
        <div className="p-6 relative -mt-12 bg-surface-container-lowest mx-4 rounded-xl editorial-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-4 bg-surface-container-highest rounded shimmer"></div>
            <div className="w-12 h-4 bg-surface-container-highest rounded shimmer"></div>
          </div>
          <div className="w-full h-8 bg-surface-container-highest rounded mb-3 shimmer"></div>
          <div className="space-y-2 mb-6">
            <div className="w-full h-3 bg-surface-container-highest rounded shimmer"></div>
            <div className="w-2/3 h-3 bg-surface-container-highest rounded shimmer"></div>
          </div>
          <div className="w-full h-12 bg-surface-container-highest rounded-lg shimmer"></div>
        </div>
      </article>
    </div>
  );
};

export default FavRecSkeleton;
