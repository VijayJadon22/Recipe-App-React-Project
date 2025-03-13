import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeSkeleton from "../components/skeleton/RecipeSkeleton";
import { getRandomColor } from "../lib/utils.js";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const fetchRecipes = async (searchQuery = "chicken") => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await res.json();
      setRecipes(data.meals);
    } catch (error) {
      console.log("Error fetching recipes: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    if (input.trim().length !== 0) {
      fetchRecipes(input);
    } else {
      fetchRecipes();
    }
  };
  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto ">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2 w-full">
            <Search size={"24"} />
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="text-sm md:text-md grow"
              placeholder="Search for dish"
            />
          </label>
        </form>
        <h1 className="font-bold text-2xl md:text-3xl mt-4">
          Recommended Recipes
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular Choices
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            recipes?.map((recipe, index) => (
              <RecipeCard recipe={recipe} key={index} {...getRandomColor()} />
            ))}
          {loading &&
            [...Array(9)].map((_, index) => <RecipeSkeleton key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
