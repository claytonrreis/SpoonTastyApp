const express = require("express");
const mongoose = require("mongoose");
const Spooner = require("../models/Spooner");
const router = express.Router();

// Get all spooners
router.get("/", async (req, res) => {
  try {
    const spooners = await Spooner.find({});
    res.json(spooners);
  } catch (error) {
    console.error(error.massage);
    res.status(500), json({ msg: "Something went wrong!" });
  }
});

// get one Spooner
router.get("/:id", async (req, res) => {
  try {
    const oneSpooner = await Spooner.findById(req.params.id);
    if (!oneSpooner) {
      return res.status(404).json({ msg: "Spooner not found!" });
    }
    res.json(oneSpooner);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something wet wrong!" });
  }
});

//create a new Spooner
router.post("/", async (req, res) => {
  const { name, spoonerName, email } = req.body;
  if (!name || !spoonerName || !email) {
    return (
      res.status(400),
      json({
        msg: "Please provide all required fields: name, Spooner Name, email",
      })
    );
  }
  try {
    const exixtingSpooner = await Spooner.findOne({ spoonerName });
    if (exixtingSpooner) {
      return res.status(409).json({ msg: "Spooner name already taken!" });
    }
    const newSpooner = new Spooner(req.body);
    await newSpooner.save();
    res.status(201).json(newSpooner);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ msg: "Spooner name or email already exists" });
    }
    res.status(500).json({ msg: "Error creating Spooner!" });
  }
});

//update Spooner

router.patch("/:id", async (req, res) => {
  try {
    const updatedSpooner = await Spooner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSpooner) {
      return res.status(404).json({ msg: "Spooner not found" });
    }
    res.json(updatedSpooner);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error uptudating Spooner" });
  }
});

//delete Spooner
router.delete("/:id", async (req, res) => {
  try {
    const deletedSpooner = await Spooner.findByIdAndDelete(req.params.id);
    if (!deletedSpooner) {
      return res.status(404).json({ msg: "Spooner not found" });
    }
    res.json({ msg: "Spooner deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error deleting Spooner" });
  }
});

module.exports = router;
