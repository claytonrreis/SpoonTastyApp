const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

//MIDDLEWARE
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("MONGODB connected");
  } catch (error) {
    console.error("Error connecting MONGODB");
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`The SpoonTasty server runnning on port: ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.send("SpoonTasty backend!");
});
