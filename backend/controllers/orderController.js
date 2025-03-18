import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    
    try {
        const { userId, items, amount, address, payment } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create a new order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            payment
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Lead Scoring: Increase score based on order amount
        let scoreIncrease = Math.floor(amount / 1000); // Example: ₹5000 = +5 points
        await userModel.findByIdAndUpdate(userId, { $inc: { leadScore: scoreIncrease } });

        // Create Razorpay order
        const totalAmount = amount * 100;
        const options = {
            amount: totalAmount,
            currency: "INR",
            receipt: `order_rcptid_${newOrder._id}`,
            payment_capture: 1
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        res.status(200).json({
            success: true,
            msg: "Order Created",
            ord_id: newOrder._id,
            order_id: razorpayOrder.id,
            amount: totalAmount,
            key_id: process.env.RAZORPAY_KEY_ID,
            product_name: items.map(item => item.name).join(", "),
            description: "Order payment for products",
            name: user.name,
            email: user.email,
            contact: user.phone,
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error placing the order" });
    }
};

// Verify Razorpay payment
const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id, userId } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign)
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Lead Scoring: Increase on successful payment
            await userModel.findByIdAndUpdate(userId, { $inc: { leadScore: 5 } });

            return res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
};

// Mark order as verified (completed)
const verifiedOrder = async (req, res) => {
    try {
        const { order_id, userId } = req.body;
        
        await orderModel.findByIdAndUpdate(order_id, { payment: true });

        // Lead Scoring: Increase when the order is completed
        await userModel.findByIdAndUpdate(userId, { $inc: { leadScore: 10 } });

        res.status(200).json({ success: true, message: "Order updated successfully" });
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Fetch user orders
const usersOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// List all orders for admin panel
const listOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (err) {
        res.json({ success: false, message: "Error" });
    }
};

// Update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { placeOrder, verifyOrder, verifiedOrder, usersOrders, listOrder, updateStatus };
