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

  if (req.session.user === undefined) {
    res.send({ result: "로그인 후 이용해주세요" });
    return;
  }
  db.favoriteReciepe(req.session.user.id, receipeName, function (result) {
    if (result === true) {
      res.send({ result: "success" });
    } else {
      res.send({ result: "즐겨찾기 추가 실패" });
    }
  });
});
module.exports = router;
