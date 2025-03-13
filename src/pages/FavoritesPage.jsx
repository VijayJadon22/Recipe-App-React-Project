import React from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils.js";

const FavoritesPage = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return (
    <div className="bg-[#faf9fb] flex-1 p-10 min-h-screen ">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-semibold text-2xl md:text-3xl my-4">
          Favorite Recipes
        </p>

        {favorites.length === 0 && (
          <div className="h-[72vh] flex flex-col items-center gap-4">
            <img src="/404.svg" className="h-3/4" alt="404 svg" />
          </div>
        )}

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              {...getRandomColor()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
