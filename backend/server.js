const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const groceryListsRoute = require("./routes/groceryLists");
const spoonerRoute = require("./routes/spooners");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI;

//Config express app
app.use(express.json());
app.use(cors());

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
