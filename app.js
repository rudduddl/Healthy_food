const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const member = require("./routes/member");
const receipe = require("./routes/receipe");
const disease = require("./routes/disease");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//apply routes
app.use("/member", member);
app.use("/receipe", receipe);
app.use("/disease", disease);

//홈화면 표시 (index.ejs 렌더링)
app.get("/", function (req, res) {
  res.render("index"); //index.ejs 파일 렌더링 (view engine을 ejs로 지정했기 때문에 확장자 생략)
});

//서버 실행
app.listen(app.get("port"), function () {
  console.log("server on! http://localhost:" + app.get("port"));
});
