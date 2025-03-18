import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import path from "path";

// Add Food Item
const addFood = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Food image is required" });
        }

        const { name, description, price, category, adminId } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const image_filename = req.file.filename;
        const food = new foodModel({ name, description, price, category, image: image_filename });

        await food.save();

        // Increase lead score for admin adding food
        if (adminId) {
            await userModel.findByIdAndUpdate(adminId, { $inc: { leadScore: 5 } });
        }

        res.status(201).json({ success: true, message: "Food item added successfully", data: food });

    } catch (err) {
        console.error("Error adding food item:", err);
        res.status(500).json({ success: false, message: "Error adding food item", error: err.message });
    }
};

// List All Food Items
const listFood = async (req, res) => {
    try {
        const foodList = await foodModel.find();
        res.status(200).json({ success: true, data: foodList });
    } catch (err) {
        console.error("Error fetching food items:", err);
        res.status(500).json({ success: false, message: "Error fetching food items", error: err.message });
    }
};

// Remove Food Item
const removeFood = async (req, res) => {
    try {
        const { id, adminId } = req.body;

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete food image file if exists
        const imagePath = path.join("uploads", food.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await foodModel.findByIdAndDelete(id);

        // Decrease lead score for admin removing food
        if (adminId) {
            await userModel.findByIdAndUpdate(adminId, { $inc: { leadScore: -3 } });
        }

        res.status(200).json({ success: true, message: "Food item removed successfully" });

    } catch (err) {
        console.error("Error removing food item:", err);
        res.status(500).json({ success: false, message: "Error removing food item", error: err.message });
    }
};

export { addFood, listFood, removeFood };
