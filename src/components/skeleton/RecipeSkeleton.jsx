import React from "react";

const RecipeSkeleton = () => {
  return (
    <div className="flex flex-col rounded-md gap-4">
      <div className="skeleton h-36 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-32"></div>
      <div className="flex gap-1 h-4 w-full">
        <div className="skeleton h-4 w-1/3"></div>
        <div className="skeleton h-4 w-1/3"></div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;
