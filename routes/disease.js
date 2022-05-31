const express = require("express");
const router = express.Router();
const mongodb = require("../src/mongodb");

router.get("/", async (req, res) => {
  const disease = await mongodb.searchDisease(req.query.search);
  console.log(disease);
  res.render("next", { disease: disease });
});

module.exports = router;
