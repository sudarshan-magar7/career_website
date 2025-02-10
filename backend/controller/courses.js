const axios = require("axios");
const COURSERA_API_URL = "https://api.coursera.org/api/courses.v1";
const EDX_API_URL = "https://courses.edx.org/api/courses/v1/courses/";

// 🚀 Fetch Coursera Courses
async function fetchCourseraCourses(query) {
    try {
        const response = await axios.get(COURSERA_API_URL, {
            params: { q: "search", query }
        });

        return response.data.elements.map(course => ({
            title: course.name,
            image: `https://coursera.org/course-image/${course.id}`,
            url: `https://www.coursera.org/learn/${course.slug || course.id}`,
            price: "Free/Paid",
            rating: "N/A", // Coursera doesn't provide ratings directly
            platform: "Coursera"
        }));
    } catch (error) {
        console.error("Coursera API Error:", error.response ? error.response.data : error.message);
        return [];
    }
}

// 🚀 Fetch edX Courses (Fixed Undefined URL Issue)
async function fetchEdxCourses(query) {
    try {
        const response = await axios.get(EDX_API_URL, {
            params: { search: query }
        });

        return response.data.results.map(course => ({
            title: course.title,
            image: course.image?.src || "https://www.edx.org/default-image.jpg",
            url: course.marketing_url 
                ? `https://www.edx.org${course.marketing_url}`  // Ensure proper URL format
                : `https://www.edx.org/course/${course.slug || ""}`, // Fallback URL
            price: "Free/Paid",
            rating: "N/A",
            platform: "edX"
        }));
    } catch (error) {
        console.error("edX API Error:", error.response ? error.response.data : error.message);
        return [];
    }
}

// 🏆 Unified API to Fetch All Courses
const course = async (req, res) => {
    const { query, price } = req.body;
    if (!query) {
        return res.status(400).json({ error: "Query parameter is required." });
    }

    try {
        const [coursera, edx] = await Promise.all([
            fetchCourseraCourses(query),
            fetchEdxCourses(query)
        ]);

        const allCourses = [...coursera, ...edx];
        res.json(allCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = course;




