import express from "express";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
// import foodModel from "../models/foodModel.js";

const router = express.Router();

// Get Total Users
router.get("/total-users", async (req, res) => {
    try {
        const userCount = await userModel.countDocuments();
        res.json({ totalUsers: userCount });
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// Get Total Orders
router.get("/total-orders", async (req, res) => {
    try {
        const orderCount = await orderModel.countDocuments();
        res.json({ totalOrders: orderCount });
    } catch (error) {
        res.status(500).json({ error: "Error fetching orders" });
    }
});

// Get Monthly Revenue
router.get("/monthly-revenue", async (req, res) => {
    try {
        const currentDate = new Date();
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        const monthlyRevenue = await orderModel.aggregate([
            {
                $match: {
                    date: { $gte: firstDay },
                    payment: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" }
                }
            }
        ]);

        res.json({ monthlyRevenue: monthlyRevenue[0]?.totalRevenue || 0 });
    } catch (error) {
        res.status(500).json({ error: "Error fetching revenue" });
    }
});

// Get High-Rated Customers (Based on Frequent Orders)
router.get("/high-rated-customers", async (req, res) => {
    try {
        const customers = await orderModel.aggregate([
            {
                $group: {
                    _id: "$userId",
                    orderCount: { $sum: 1 },
                    totalSpent: { $sum: "$amount" }
                }
            },
            {
                $sort: { orderCount: -1 }
            },
            {
                $limit: 10 // Top 10 most frequent customers
            }
        ]);

        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching high-rated customers" });
    }
});

// Get Most Popular Items
router.get("/popular-items", async (req, res) => {
    try {
        const popularItems = await orderModel.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.name",
                    totalOrdered: { $sum: 1 }
                }
            },
            { $sort: { totalOrdered: -1 } },
            { $limit: 5 } // Top 5 selling items
        ]);

        res.json(popularItems);
    } catch (error) {
        res.status(500).json({ error: "Error fetching popular items" });
    }
});

export default router;
