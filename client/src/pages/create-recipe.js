import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

import "../styles/create-recipe.css";

export const CreateRecipe = () => {
    const userID = useGetUserID();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddIngredient = () => {
        setRecipe(() => ({
            ...recipe,
            ingredients: [...recipe.ingredients, ""],
        }));
    };

    const handleRemoveIngredient = (index) => {
      const updatedIngredients = [...recipe.ingredients];
      updatedIngredients.splice(index, 1);
      setRecipe(() => ({
        ...recipe,
        ingredients: updatedIngredients,
      }));
    };

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe(() => ({
            ...recipe,
            ingredients,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(recipe)
        try {
            await axios.post("http://localhost:4000/recipes", recipe);
            alert("Recipe created!");
            navigate("/");
        } catch(error) {
            console.error(error);
        }
    };

    return (
      <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                name="ingredients"
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
                className="form-control"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddIngredient}
          className="btn btn-secondary mb-3"
        >
          Add Ingredient
        </button>
    
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="form-input"
          ></textarea>
        </div>
    
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            className="form-input"
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            className="form-input"
          />
        </div>
    
        <button type="submit" className="btn btn-primary my-3">
          Create Recipe
        </button>
      </form>
    </div>
    
      );
};