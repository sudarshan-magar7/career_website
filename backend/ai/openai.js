const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiCall = async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyCyMaDKBWFtAOQLNLd1mRWTicoF1XxILiQ");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Check if req.body exists and contains a valid prompt
        if (!req.body || typeof req.body.prompt !== "string") {
            return res.status(400).json({ success: false, error: "Invalid prompt format. It should be a string." });
        }

        const prompt = req.body.prompt.trim(); // Remove extra spaces
        console.log("Prompt received:", prompt);

        const result = await model.generateContent(prompt);

        if (!result.response) {
            throw new Error("No response received from Google Generative AI.");
        }

        const text = await result.response.text();

        res.status(200).json({
            success: true,
            msg: text
        });

    } catch (error) {
        console.error("Google Generative AI Error:", error.message);
        res.status(500).json({
            success: false,
            error: "Error processing your request: " + error.message,
        });
    }
};

module.exports = apiCall;
