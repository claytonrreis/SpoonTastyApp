const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

// async function connectDB() {
//   try {
//     await mongoose.connect(MONGODB_URI, {});
//     console.log("MONGODB connected");
//   } catch (error) {
//     console.error("Error connecting MONGODB");
//   }
// }

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDB;
