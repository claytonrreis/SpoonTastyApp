const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const GroceryList = require("./models/GroceryList");
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

// Routes

// Home Route
app.get("/", (req, res) => {
  res.send("SpoonTasty backend!");
});

// Get all grocery lists
app.get("/grocery-lists", async (req, res) => {
  try {
    const groceryLists = await GroceryList.find();
    res.json({ groceryLists });
  } catch (error) {
    console.error("Error fetching grocery lists:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get a single grocery list
app.get("/grocery-lists/:id", async (req, res) => {
  try {
    const gListId = req.params.id;
    const groceryList = await GroceryList.findById(gListId);
    if (!groceryList) {
      return res.status(404).json({ error: "Grocery list not found" });
    }
    res.json({ groceryList });
  } catch (error) {
    console.error("Error fetching grocery list:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Create a new grocery list
app.post("/grocery-lists", async (req, res) => {
  try {
    const { listName, items, SpoonerName } = req.body;

    if (!listName || !SpoonerName) {
      return res
        .status(400)
        .json({ error: "List name and Spooner name are required" });
    }

    const newGroceryList = new GroceryList({ listName, items, SpoonerName });
    await newGroceryList.save();
    res.status(201).json(newGroceryList);
  } catch (error) {
    console.error("Error creating grocery list:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Update a grocery list
app.put("/grocery-lists/:id", async (req, res) => {
  try {
    const gListId = req.params.id;
    const updateFields = req.body;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(gListId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // Log the update request for debugging
    console.log("Updating grocery list with ID:", gListId);
    console.log("Update fields:", updateFields);

    // Perform the update
    const updatedGroceryList = await GroceryList.findByIdAndUpdate(
      gListId,
      updateFields,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation of updates
        context: "query", // Ensure that `runValidators` applies to query context
      }
    );

    // Check if the document was found and updated
    if (!updatedGroceryList) {
      return res.status(404).json({ error: "Grocery list not found" });
    }

    res.status(200).json(updatedGroceryList);
  } catch (error) {
    console.error("Error updating grocery list:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete a grocery list
app.delete("/grocery-lists/:id", async (req, res) => {
  try {
    const gListId = req.params.id;
    const result = await GroceryList.deleteOne({ _id: gListId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Grocery list not found" });
    }

    res.json({ success: "Grocery List deleted" });
  } catch (error) {
    console.error("Error deleting grocery list:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`The SpoonTasty server running on port: ${PORT}`);
});

// app.get("/", (req, res) => {
//   res.send("SpoonTasty backend!");
// });

// //get all Lists
// app.get("/grocery-lists", async (req, res) => {
//   const groceryLists = await GroceryList.find();
//   res.json({ groceryLists: groceryLists });
// });

// //get a single list
// app.get("/grocery-lists/:id", async (req, res) => {
//   const gListId = req.params.id;
//   const groceryLists = await GroceryList.findById(gListId);
//   res.json({ groceryLists: groceryLists });
// });

// //create a list
// app.post("/grocery-lists", async (req, res) => {
//   try {
//     const { listName, items, SpoonerName } = req.body;

//     if (!listName || !SpoonerName) {
//       return res
//         .status(400)
//         .json({ error: "List name and Spooner name are required" });
//     }

//     // Create a new GroceryList document
//     const newGroceryList = new GroceryList({
//       listName,
//       items,
//       SpoonerName,
//     });

//     // Save the document to MongoDB
//     await newGroceryList.save();

//     // Send response
//     res.status(201).json(newGroceryList);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// //uptudate list
// app.put("/grocery-lists/:id", async (req, res) => {
//   try {
//     const gListId = req.params.id;
//     const updateFields = req.body;

//     // Find the grocery list by ID and update it with the new fields
//     const updatedGroceryList = await GroceryList.findByIdAndUpdate(
//       gListId,
//       updateFields,
//       {
//         new: true, // Return the updated document
//         runValidators: true, // Validate the update operation
//       }
//     );

//     if (!updatedGroceryList) {
//       return res.status(404).json({ error: "Grocery list not found" });
//     }

//     // Send response
//     res.status(200).json(updatedGroceryList);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // app.delete("/grocery-lists/:id", async (req, res) => {
// //   const gListId = req.params.id;
// //   await GroceryList.deleteOne({ id: gListId });
// //   res.json({ success: "Grocery List deleted" });
// // });

// app.listen(process.env.PORT);
