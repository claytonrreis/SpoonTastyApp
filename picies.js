//server

// // Get all grocery lists
// app.get("/grocery-lists");

// // Get a single grocery list
// app.get("/grocery-lists/:id");

// // Create a new grocery list
// app.post("/grocery-lists");

// // Update a grocery list
// app.put("/grocery-lists/:id");

// // Delete a grocery list
// app.delete("/grocery-lists/:id");

//groceryrouters

// const express = require("express");
// const GroceryList = require("../models/GroceryList");

// const getLists = async (req, res) => {
//   try {
//     const groceryLists = await GroceryList.find();
//     res.json({ groceryLists });
//   } catch (error) {
//     console.error("Error fetching grocery lists:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// const getList = async (req, res) => {
//   try {
//     const gListId = req.params.id;
//     const groceryList = await GroceryList.findById(gListId);
//     if (!groceryList) {
//       return res.status(404).json({ error: "Grocery list not found" });
//     }
//     res.json({ groceryList });
//   } catch (error) {
//     console.error("Error fetching grocery list:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// const createList = async (req, res) => {
//   try {
//     const { listName, items, SpoonerName } = req.body;

//     if (!listName || !SpoonerName) {
//       return res
//         .status(400)
//         .json({ error: "List name and Spooner name are required" });
//     }

//     const newGroceryList = new GroceryList({ listName, items, SpoonerName });
//     await newGroceryList.save();
//     res.status(201).json(newGroceryList);
//   } catch (error) {
//     console.error("Error creating grocery list:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateList = async (req, res) => {
//   try {
//     const gListId = req.params.id;
//     const updateFields = req.body;

//     // Validate the ID format
//     if (!mongoose.Types.ObjectId.isValid(gListId)) {
//       return res.status(400).json({ error: "Invalid ID format" });
//     }

//     // Log the update request for debugging
//     console.log("Updating grocery list with ID:", gListId);
//     console.log("Update fields:", updateFields);

//     // Perform the update
//     const updatedGroceryList = await GroceryList.findByIdAndUpdate(
//       gListId,
//       updateFields,
//       {
//         new: true, // Return the updated document
//         runValidators: true, // Ensure validation of updates
//         context: "query", // Ensure that `runValidators` applies to query context
//       }
//     );

//     // Check if the document was found and updated
//     if (!updatedGroceryList) {
//       return res.status(404).json({ error: "Grocery list not found" });
//     }

//     res.status(200).json(updatedGroceryList);
//   } catch (error) {
//     console.error("Error updating grocery list:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteList = async (req, res) => {
//   try {
//     const gListId = req.params.id;
//     const result = await GroceryList.deleteOne({ _id: gListId });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: "Grocery list not found" });
//     }

//     res.json({ success: "Grocery List deleted" });
//   } catch (error) {
//     console.error("Error deleting grocery list:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { getLists, getList, createList, updateList, deleteList };

// // Get a single grocery list
// router.get("/:id", async (req, res) => {
//   try {
//     const gListId = req.params.id;
//     const groceryList = await GroceryList.findById(gListId);
//     if (!groceryList) {
//       return res.status(404).json({ error: "Grocery list not found" });
//     }
//     res.json({ groceryList });
//   } catch (error) {
//     console.error("Error fetching grocery list:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Create a new grocery list
// router.post("/", async (req, res) => {
//   try {
//     const { listName, items, SpoonerName } = req.body;

//     if (!listName || !SpoonerName) {
//       return res
//         .status(400)
//         .json({ error: "List name and Spooner name are required" });
//     }

//     const newGroceryList = new GroceryList({ listName, items, SpoonerName });
//     await newGroceryList.save();
//     res.status(201).json(newGroceryList);
//   } catch (error) {
//     console.error("Error creating grocery list:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// Update a grocery list alternative route to update
//   router.put("/:id", async (req, res) => {

// try {
//   const gListId = req.params.id;
//   const updateFields = req.body;
//   // Validate the ID format
//   if (!mongoose.Types.ObjectId.isValid(gListId)) {
//     return res.status(400).json({ error: "Invalid ID format" });
//   }
//   const updatedGroceryList = await GroceryList.findByIdAndUpdate(
//     gListId,
//     updateFields,
//     {
//       new: true,
//       runValidators: true,
//       context: "query",
//     }
//   );
//   if (!updatedGroceryList) {
//     return res.status(404).json({ error: "Grocery list not found" });
//   }
//   res.status(200).json(updatedGroceryList);
// } catch (error) {
//   console.error("Error updating grocery list:", error.message);
//   res.status(500).json({ error: error.message });
// }
//   });

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