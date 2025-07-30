const mongoose = require('mongoose');
const gridfsStream = require('gridfs-stream');
const mongoURI = "mongodb+srv://magarsudarshan77:HZ0lE82JpDK9whWF@cluster0.derb2.mongodb.net/CareerAI";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true })
  //   .then(() => {
  //   console.log("MongoDB connection established");

  //   // Initialize GridFS after connection is established
  //   const gfs = gridfsStream(mongoose.connection.db, mongoose.mongo);
  //   gfs.collection('uploads');
  //   console.log("GridFS is ready.");
  // })
  // .catch((err) => {
  //   console.error('MongoDB connection error:', err);
  // });
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = connectToMongo;