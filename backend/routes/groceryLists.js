const express = require("express");
const GroceryList = require("../models/GroceryList");
const router = express.Router();

// Get all grocery lists
router.get("/", async (req, res) => {
  try {
    const groceryLists = await GroceryList.find();
    res.json({ groceryLists });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error fetching grocery lists:" });
  }
});

// Get a single grocery list
router.get("/:id", async (req, res) => {
  try {
    const gListId = req.params.id;
    const groceryList = await GroceryList.findById(gListId);
    if (!groceryList) {
      return res.status(404).json({ msg: "Grocery list not found" });
    }
    res.json({ groceryList });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error fetching grocery list:" });
  }
});

// Create a new grocery list
router.post("/", async (req, res) => {
  try {
    const { listName, items, SpoonerName } = req.body;

    if (!listName || !SpoonerName) {
      return res
        .status(400)
        .json({ msg: "List name and Spooner name are required" });
    }

    const newGroceryList = new GroceryList({ listName, items, SpoonerName });
    await newGroceryList.save();
    res.status(201).json(newGroceryList);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error creating grocery list:" });
  }
});

// Update a grocery list
router.put("/:id", async (req, res) => {
  try {
    const updatedGList = await GroceryList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGList) {
      return res.status(404).json({ msg: "Grocery List not found!" });
    }
    res.json(updatedGList);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error updating Grocery List!" });
  }
});

// Delete a grocery list
router.delete("/:id", async (req, res) => {
  try {
    const gListId = req.params.id;
    const result = await GroceryList.deleteOne({ _id: gListId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Grocery list not found" });
    }

    res.json({ msg: "Grocery List deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error deleting grocery list:" });
  }
});

module.exports = router;
