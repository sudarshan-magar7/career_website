const path = require('path');  // Make sure this line is at the top of your file
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

// API endpoint to upload file & send to FastAPI
const parse = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Define the directory where you want to save the uploaded file
        const uploadPath = path.join(__dirname, "../uploads");
        
        // Ensure the 'uploads' directory exists, if not create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        // Define the path where the file will be saved
        const filePath = path.join(uploadPath, req.file.originalname);

        // Save the file to the upload directory
        fs.writeFileSync(filePath, req.file.buffer);
        console.log("File saved at:", filePath);

        // Prepare form data for FastAPI
        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath));

        // Send the file to FastAPI backend
        const response = await axios.post("http://127.0.0.1:8000/parse-resume/", formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        // Send response back to the client
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("Error uploading file:", error.message);
        res.status(500).json({ error: "Error processing file: " + error.message });
    }
};

module.exports = parse;
