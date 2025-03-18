import axios from "axios";

export const updateLeadScore = async (userId, action) => {
    try {
        const response = await axios.post("/api/lead-score/update", { userId, action });
        return response.data;
    } catch (error) {
        console.error("Error updating lead score:", error);
    }
};

export const getUserProfile = async () => {
    try {
        const response = await axios.get("/api/users/profile");
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};
