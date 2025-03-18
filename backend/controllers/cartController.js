import userModel from "../models/userModel.js";

// Add Item to User Cart (with Lead Scoring)
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
        }

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        let leadScore = userData.leadScore || 0; // Default lead score if not present

        cartData[itemId] = (cartData[itemId] || 0) + 1;
        leadScore += 10; // Increase lead score when adding an item

        const updatedUser = await userModel.findByIdAndUpdate(userId, { cartData, leadScore }, { new: true });

        res.json({ success: true, message: "Added to cart", cartData: updatedUser.cartData, leadScore: updatedUser.leadScore });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
    }
};

// Remove Item from User Cart (with Lead Scoring)
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
        }

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        let leadScore = userData.leadScore || 0;

        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            leadScore = Math.max(0, leadScore - 5); // Reduce lead score (not below 0)

            if (cartData[itemId] === 0) {
                delete cartData[itemId]; // Remove item if count reaches 0
            }
        } else {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, { cartData, leadScore }, { new: true });

        res.json({ success: true, message: "Removed from cart", cartData: updatedUser.cartData, leadScore: updatedUser.leadScore });

    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, message: "Error removing from cart", error: error.message });
    }
};

// Get User Cart Data (Lead Score remains unchanged)
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        let leadScore = userData.leadScore || 0;

        res.json({ success: true, cartData, leadScore });

    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: "Error fetching cart data", error: error.message });
    }
};

export { addToCart, removeFromCart, getCart };
