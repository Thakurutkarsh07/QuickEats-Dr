import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],  // Either "user" or "admin"
        default: "user"
    },
    cartData: {
        type: Object,
        default: {}
    },
    leadScore: {
        type: Number,
        default: 0  // Lead score starts at 0
    },
    referredUsers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"  // References users referred by this user
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
