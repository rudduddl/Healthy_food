const express = require("express");
const router = express.Router();
const receipeApi = require("../src/json_receipe");

router.get("/", (req, res) => {
  res.render("receipe_search");
});

router.post("/", (req, res) => {
  const search = req.body.name.replace(" ", "_");

  console.log("레시피 검색 : " + search);
  receipeApi.searchReceipe(search, function (receipes) {
    res.render("receipe_search", { receipes: receipes });
  });
});

router.post("/how", (req, res) => {
  const receipe = Object.entries(JSON.parse(req.body.receipe));

  res.render("receipe", {
    receipe: receipe,
    receipeName: req.body.name,
  });
});
module.exports = router;
