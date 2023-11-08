const express = require("express");
const Model = require("../models/model");
const router = express.Router();

// Error handling function
const handleRouteError = (res, error) => {
  console.error(error.message);
  res.status(500).json({ message: "Internal Server Error" });
};

// Create a dev
router.post("/devs", async (req, res) => {
  try {
    const { name, nickname, birth_date, stack } = req.body.dev;
    const data = new Model({ name, nickname, birth_date, stack });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    handleRouteError(res, error);
  }
});

// Get all devs
router.get("/devs", async (req, res) => {
  try {
    const data = await Model.find().select("_id name");
    res.json(data);
  } catch (error) {
    handleRouteError(res, error);
  }
});

// Get devs by search terms
router.get("/devs/:terms", async (req, res) => {
  try {
    const terms = req.params.terms;

    // Check if terms can be parsed into a valid date
    const date = new Date(terms);

    // Create an array to store the search conditions
    const searchConditions = [
      { name: { $regex: terms, $options: "i" } },
      { nickname: { $regex: terms, $options: "i" } },
      { stack: { $regex: terms, $options: "i" } },
    ];

    if (!isNaN(date.getTime())) {
      // If it's a valid date, add the date-based search condition
      searchConditions.push({ birth_date: date });
    }

    // Construct the final query using $or for all conditions
    const query = {
      $or: searchConditions,
    };

    const data = await Model.find(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dev by ID
router.get("/dev/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    handleRouteError(res, error);
  }
});

// Update dev by ID
router.patch("/devs/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    handleRouteError(res, error);
  }
});

// Delete dev by ID
router.delete("/devs/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Dev with the nickname ${data.name} has been deleted.`);
  } catch (error) {
    handleRouteError(res, error);
  }
});

module.exports = router;
