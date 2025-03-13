import { Heart, HeartPulse, Soup } from "lucide-react";
import React, { useState } from "react";

const RecipeCard = ({ recipe, badge, bg }) => {
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe?.idMeal)
  );
  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.idMeal === recipe.idMeal
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  return (
    <div
      className={`flex flex-col rounded-md border shadow-md ${bg} overflow-hidden p-3 relative`}
    >
      <a href={recipe?.strYoutube} target="_blank" className="relative h-32">
        <img
          src={recipe?.strMealThumb}
          alt="recipe image"
          className="rounded-md w-full h-full object-cover cursor-pointer"
        />
        <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
          <Soup size={"16"} /> {recipe?.strMeasure1.split("")[0]} Servings
        </div>
        <div
          className="absolute top-1 right-2 bg-white p-1 rounded-full cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavorites();
          }}
        >
          {!isFavorite && (
            <Heart
              size={"16"}
              className="hover:fill-red-500 hover:text-red-500"
            />
          )}
          {isFavorite && (
            <Heart size={"16"} className="fill-red-500 text-red-500" />
          )}
        </div>
      </a>
      <div className="flex mt-1">
        <p>{recipe?.strMeal}</p>
      </div>
      <p className="my-2">{recipe?.strArea}</p>
      <div className="flex gap-2 mt-auto">
        <div className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
          <HeartPulse size={"16"} />
          <span className="text-sm tracking-tighter font-medium">
            Gluten-Free
          </span>
        </div>
        <div className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
          <HeartPulse size={"16"} />
          <span className="text-sm tracking-tighter font-medium">
            {recipe?.strCategory}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
