const {Profile} = require("../models/UserSchema");

const UserProfile = async (req, res) => {
    try {
        const {
            userId,
            careerPreferences,
            currentSkills,
            qualifications,
            workExperience,
            goals,
            studentDetails
        } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        let user = await Profile.findOne({ userId });

        if (!user) {
            user = new Profile({
                userId,
                careerPreferences,
                currentSkills,
                qualifications,
                workExperience,
                goals,
                studentDetails
            });
        } else {
            user.careerPreferences = careerPreferences || user.careerPreferences;
            user.currentSkills = currentSkills || user.currentSkills;
            user.qualifications = qualifications || user.qualifications;
            user.workExperience = workExperience || user.workExperience;
            user.goals = goals || user.goals;
            user.studentDetails = studentDetails || user.studentDetails;
        }

        await user.save();
        res.status(200).json({ success: true, message: "Profile updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error", details: error.message });
    }
};

// ✅ Ensure correct export
module.exports = { UserProfile };
