const express = require('express');
const connectToMongo = require('./config/db');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/User");

const port = 8080;
app.use(cors());
app.use(express.json());
connectToMongo();



app.use("/api/user", authRoutes);


app.get('/', (req, res) => {
    res.send('Hello from Express!');
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});