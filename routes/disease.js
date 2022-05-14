const express = require("express");
const router = express.Router();
const mongodb = require("../src/mongodb");

router.get("/", (req, res) => {
  mongodb.getDisease(function (disease) {
    res.render("next", { disease: disease });
  });
});

module.exports = router;
