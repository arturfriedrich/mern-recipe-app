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
    <div className="saved-recipes-container">
      <h1 className="saved-recipes-heading">Saved Recipes</h1>
      <ul className="list-unstyled">
        {savedRecipes.length === 0 ? (
          <p className="no-saved-recipes">No saved recipes! Go to the<Link className="link" to="/">browse page</Link>to explore new recepies!</p>
        ) : (
          savedRecipes.map((recipe) => (
            <li key={recipe._id} className="recipe-item">
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <p>{recipe.description}</p>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};