import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Link } from "react-router-dom";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  console.log(savedRecipes)

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  
  return (
    <div className="home-container">
      <h1 className="mt-4">Saved Recipes</h1>
      <ul className="list-unstyled">
        {savedRecipes.length === 0 ? (
          <p className="no-saved-recipes">No saved recipes! Go to the<Link className="link" to="/">browse page</Link>to explore new recepies!</p>
        ) : (
          savedRecipes.map((recipe) => (
            <li key={recipe._id} className="card mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h2 className="card-title">{recipe.name}</h2>
              </div>
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
          ))
        )}
      </ul>
    </div>
  );
};