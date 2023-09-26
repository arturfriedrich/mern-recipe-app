import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:4000/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-container">
      <h1 className="mt-4">Recipes</h1>
      <ul className="list-unstyled">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="card mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h2 className="card-title">{recipe.name}</h2>
              </div>
              <button
                onClick={() => saveRecipe(recipe._id)}
                className={`btn ${isRecipeSaved(recipe._id) ? "btn-success" : "btn-primary"}`}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="card-body">
              <div className="instructions">
                <p className="card-text">{recipe.instructions}</p>
              </div>
              <h5>Ingredients</h5>
              {
                recipe.ingredients.map((ingredient) => (
                  <ul className="ingredient-list">
                    <li className="card-text">{ingredient}</li>
                  </ul>
                ))
              }
              <p className="card-text">Cooking Time: {recipe.cookingTime} minutes</p>
              <img src={recipe.imageUrl} alt={recipe.name} className="img-fluid" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};