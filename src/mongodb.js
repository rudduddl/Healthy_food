const {
  MongoClient,
  ServerApiVersion,
  MongoGridFSChunkError,
} = require("mongodb");
const bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://admin:admin@cluster0.qpfrt.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const db = client.db("mydb");

connect();

//몽고DB 접속
function connect() {
  client.connect((err) => {});
}

//몽고DB 접속 해제
function disconnect() {
  client.close();
}

//로그인 로직 구현 (몽고DB에서 찾고자 하는 id를 가진 document를 찾아온 뒤 password 비교)
function login(id, password, callback) {
  db.collection("user")
    .find({ name: id })
    .toArray()
    .then(function (items) {
      bcrypt.compare(password, items[0].userpw, (err, same) => {
        if (same) {
          //same == true 비밀번호 맞음
          callback("success");
        } else {
          callback("fail");
        }
      });
    });
}

module.exports.login = login; //다른 .js파일에서 사용할 수 있도록 module.exports

//회원가입 (bcry)
function signup(signupObj, callback) {
  db.collection("user")
    .find({ userid: signupObj.id })
    .toArray()
    .then(function (items) {
      if (items.length > 0) {
        return callback("ERR_DUPLICATE");
      }

      bcrypt.hash(signupObj.pswd1, 10, (err, encryptedPW) => {
        if (err) {
          consolg.log(err);
          return callback("ERR");
        }

        delete signupObj.pswd1;
        signupObj.password = encryptedPW;

        db.collection("user")
          .insertOne(signupObj)
          .then(function (result) {
            callback("SUCCESS");
          });
      });
    });
}
module.exports.signup = signup;

function getDisease(callback) {
  db.collection("disease")
    .find({})
    .sort({ name: 1 })
    .toArray()
    .then(function (items) {
      callback(items);
    });
}
module.exports.getDisease = getDisease;
