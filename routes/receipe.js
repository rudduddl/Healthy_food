const express = require("express");
const router = express.Router();
const receipeApi = require("../src/json_receipe");
const db = require("../src/mongodb");

// router.get("/", (req, res) => {
//   res.render("receipe_search");
// });

// router.post("/", async (req, res) => {
//   const search = req.body.name;

//   const receipes = await db.searchReceipe(search);
//   res.render("receipe_search", { receipes: receipes });
// });

// router.post("/how", async (req, res) => {
//   const receipeName = req.body.name;

//   const receipe = await db.getReceipe(receipeName);
//   res.render("receipe", {
//     receipe: receipe,
//   });
// });

router.post("/favorite", async (req, res) => {
  const receipeName = req.body.name;

  if (req.session.user === undefined) {
    res.send({ result: "로그인 후 이용해주세요" });
    return;
  }
  const result = await db.favoriteReciepe(req.session.user.id, receipeName);
  if (result === true) {
    res.send({ result: "success" });
  } else {
    res.send({ result: "즐겨찾기 추가 실패" });
  }
});
module.exports = router;
