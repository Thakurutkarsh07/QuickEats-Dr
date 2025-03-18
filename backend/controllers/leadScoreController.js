import updateLeadScore from "../utils/updateLeadScore.js";

export const handleLeadScoreUpdate = async (req, res) => {
    try {
        const { userId, action } = req.body;

        if (!userId || !action) {
            return res.status(400).json({ success: false, message: "User ID and action are required" });
        }

        const result = await updateLeadScore(userId, action);

        if (!result) {
            return res.status(400).json({ success: false, message: "Invalid action or user ID" });
        }

        res.status(200).json({ success: true, message: "Lead score updated successfully" });
    } catch (error) {
        console.error("Error updating lead score:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
