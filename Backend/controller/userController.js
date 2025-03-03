const User = require("../models/User");

// Update user data
const updateUserData = async (req, res) => {
    try {
        const { email, ...updatedData } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { email },   
            { $set: updatedData },
            { new: true } 
        );
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User data updated successfully!", updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user data." });
    }
};

module.exports = { updateUserData };
