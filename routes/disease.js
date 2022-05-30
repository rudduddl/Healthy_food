const express = require("express");
const router = express.Router();
const mongodb = require("../src/mongodb");

router.get("/", async (req, res) => {
  const disease = await mongodb.getDisease();
  res.render("next", { disease: disease });
});

module.exports = router;
