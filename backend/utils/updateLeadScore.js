import User from "../models/userModel.js";

const updateLeadScore = async (userId, action) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log("❌ User not found");
            return;
        }

        const leadScoreMap = {
            SIGNUP: 10,
            FIRST_ORDER: 30,
            FREQUENT_ORDERS: 50,
            HIGH_VALUE_ORDER: 40,
            CART_ABANDON: -20,
            EMAIL_OPEN: 10,
            DISCOUNT_USED: 20,
            REFERRAL: 50,
            POSITIVE_REVIEW: 25,
            NEGATIVE_REVIEW: -20,
            UNSUBSCRIBE: -30
        };

        if (!(action in leadScoreMap)) {
            console.log("⚠️ Invalid action:", action);
            return;
        }

        user.leadScore += leadScoreMap[action];
        await user.save();

        console.log(`✅ Lead score updated for ${user.email}: ${user.leadScore} (+${leadScoreMap[action]})`);
    } catch (error) {
        console.error("❌ Error updating lead score:", error);
    }
};

export default updateLeadScore;
