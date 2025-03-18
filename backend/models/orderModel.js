import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true, min: 0 }
        }
    ],
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["Food Processing", "Out for Delivery", "Delivered", "Cancelled"],
        default: "Food Processing"
    },
    orderStatusHistory: [
        {
            status: String,
            timestamp: { type: Date, default: Date.now }
        }
    ],
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    date: {
        type: Date,
        default: Date.now
    },
    payment: {
        type: Boolean,
        default: false
    },
    paymentMode: {
        type: String,
        enum: ["Cash", "Card", "UPI", "Net Banking"],
        default: "Cash"
    },
    leadScore: {
        type: Number,
        default: 0 // Initialize with 0
    }
});

// Middleware to auto-update orderStatusHistory and leadScore
orderSchema.pre("save", async function (next) {
    if (this.isModified("status")) {
        this.orderStatusHistory.push({ status: this.status });
    }

    if (this.isNew || this.isModified("amount") || this.isModified("status")) {
        const user = await mongoose.model("user").findById(this.userId);

        if (user) {
            let score = user.leadScore || 0;

            // Increase score for high-value orders & successful deliveries
            if (this.amount > 500) score += 10;
            if (this.status === "Delivered") score += 5;

            // Deduct points for cancellations or unpaid orders
            if (this.status === "Cancelled") score -= 10;
            if (!this.payment) score -= 5;

            user.leadScore = Math.max(0, score); // Ensure score doesn't go negative
            await user.save();
        }
    }

    next();
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
