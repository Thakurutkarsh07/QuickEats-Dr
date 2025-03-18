import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: [String],  // Now supports multiple categories
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 10 // Default stock quantity
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
