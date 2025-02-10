const express = require("express");
const router = express.Router();
const userCreate = require('../controller/userCreate');
const userLogin=require('../controller/loginUser');
const {UserProfile}=require('../controller/profile');
const apiCall=require('../ai/openai.js');
const course=require('../controller/courses.js');
const authMiddleware=require('../middleware/userFetch.js');
const parse=require('../controller/resume/resumeParser.js')
const multer = require('multer');
//new push



// Multer setup for file uploads
const storage = multer.memoryStorage(); // Store file in memory (you can change this to store on disk)
const upload = multer({ storage: storage });

// Endpoint to handle file upload
router.post('/upload-file', upload.single('file'), parse);





router.post('/create', userCreate);
router.post('/login',userLogin);
router.post('/profile',UserProfile);
router.post('/ai',apiCall);

router.get("/courses",authMiddleware,course);
router.post('/parse',parse);
















module.exports = router;