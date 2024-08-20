const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    default: "unit", // You can adjust this to suit your needs, e.g., 'kg', 'liters'
  },
  purchased: {
    type: Boolean,
    default: false,
  },
});

const groceryListSchema = new Schema({
  listName: {
    type: String,
    required: true,
  },
  items: [itemSchema],
  SpoonerName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const GroceryList = mongoose.model("GroceryList", groceryListSchema);

module.exports = GroceryList;
