const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const groceryListsRoute = require("./routes/groceryLists");
const spoonerRoute = require("./routes/spooners");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI;

//MIDDLEWARE
app.use(express.json());

//CONNECT TO DB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI, {});
//     console.log("MONGODB connected");
//   } catch (error) {
//     console.error("Error connecting MONGODB");
//   }
// };

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`The SpoonTasty server runnning on port: ${PORT}`);
//   });
// });

connectDB();

// Home Route
app.get("/", (req, res) => {
  res.send("SpoonTasty backend!");
});

// Routes
app.use("/api/groceryList", groceryListsRoute);
app.use("/api/spooner", spoonerRoute);

// Start server
app.listen(PORT, () => {
  console.log(`The SpoonTasty server running on port: ${PORT}`);
});
