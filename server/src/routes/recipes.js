import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Create a recipe
router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body);

    try {
        const response = await recipe.save();
        res.status(201).json(response);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Save recepie to user
router.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Get saved recepie ids from user
router.get("/savedRecepies/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.status(200).json({ savedRecipes: user?.savedRecipes });
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
});


// Get saved recepies from user
router.get("/savedRecepies", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedRecepies = RecipeModel.find({ _id: { $in: user?.savedRecipes } });
        res.status(200).json({ savedRecepies });
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
});

export { router as recipesRouter };