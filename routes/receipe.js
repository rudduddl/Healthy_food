const express = require("express");
const router = express.Router();
const receipeApi = require("../src/json_receipe");
const db = require("../src/mongodb");

router.get("/", (req, res) => {
  res.render("receipe_search");
});

router.post("/", (req, res) => {
  const search = req.body.name;

  console.log("레시피 검색 : " + search);
  db.searchReceipe(search, function (receipes) {
    console.log(receipes);
    res.render("receipe_search", { receipes: receipes });
  });
});

router.post("/how", (req, res) => {
  const receipeName = req.body.name;

  db.getReceipe(receipeName, function (receipe) {
    res.render("receipe", {
      receipe: receipe,
    });
  });
});

router.post("/favorite", (req, res) => {
  const receipeName = req.body.name;

  db.favoriteReciepe("asdad", receipeName, function (result) {
    if (result === true) {
      res.send({ result: "success" });
    } else {
      res.send({ result: "fail" });
    }
  });
});
module.exports = router;
