const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const member = require("./routes/member");
const receipe = require("./routes/receipe");
const disease = require("./routes/disease");
const mongodb = require("./src/mongodb");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

let rsp = [
  {
    _id: "6288b9ac3d6a655ec5674412",
    ATT_FILE_NO_MK:
      "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00017_1.png",
    RCP_NM: "칼륨 듬뿍 고구마죽",
  },
  {
    _id: "6288b9ac3d6a655ec5674413",
    ATT_FILE_NO_MK:
      "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00016_1.png",
    RCP_NM: "누룽지 두부 계란죽",
  },
  {
    _id: "6288b9ac3d6a655ec5674414",
    ATT_FILE_NO_MK:
      "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00009_1.png",
    RCP_NM: "오색지라시 스시",
  },
];

app.use(
  expressSession({
    secret: "HF20220525",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  if (req.session.user) res.locals.user = req.session.user;
  else res.locals.user = undefined;
  next();
});

//apply routes
app.use("/member", member);
app.use("/receipe", receipe);
app.use("/disease", disease);

//홈화면 표시 (index.ejs 렌더링)
app.get("/", function (req, res) {
  res.render("index"); //index.ejs 파일 렌더링 (view engine을 ejs로 지정했기 때문에 확장자 생략)
});

app.get("/recipe_list", async function (req, res) {
  let favoriteReceipes = [];
  if (req.session.user) {
    favoriteReceipes = await mongodb.getFavoriteReceipe(req.session.user.id);
  }
  const disease = await mongodb.getDisease(req.query.disease_id);
  const cautionReceipes = await mongodb.getCautionReceipe(
    disease.caution,
    req.query.search
  );
  rsp = cautionReceipes;
  res.render("recipe_list", {
    favoriteReceipes: favoriteReceipes,
    disease: disease,
    cautionReceipes: cautionReceipes,
  });
});

app.get("/recipe_view", async function (req, res) {
  let favoriteReceipes = [];
  if (req.session.user) {
    favoriteReceipes = await mongodb.getFavoriteReceipe(req.session.user.id);
  }
  const receipe = await mongodb.getReceipe(req.query.receipe_id);

  console.log(rsp, "gg");

  let randomIndexArray = [];
  for (i = 0; i < 3; i++) {
    randomNum = Math.floor(Math.random() * (rsp.length - 1));
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum);
    } else {
      i--;
    }
  }
  console.log(rsp.length - 1, randomIndexArray);
  res.render("recipe_view", {
    favoriteReceipes: favoriteReceipes,
    receipe: receipe,
    cautionReceipes: rsp,
    number: randomIndexArray,
  });
});

//서버 실행
app.listen(app.get("port"), function () {
  console.log("server on! http://localhost:" + app.get("port"));
});
