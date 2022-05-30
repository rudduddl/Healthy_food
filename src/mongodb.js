const {
  MongoClient,
  ServerApiVersion,
  MongoGridFSChunkError,
} = require("mongodb");
const bcrypt = require("bcrypt");
const { get } = require("express/lib/response");

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
module.exports.disconnect = disconnect;

async function login(id, password) {
  try {
    const user = await db.collection("user").findOne({ id: id });
    const same = bcrypt.compareSync(password, user.password);
    if (same) {
      return user;
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
module.exports.login = login;

//회원가입 (bcry)
async function signup(signupObj) {
  try {
    const user = await db.collection("user").findOne({ userid: signupObj.id });
    if (user) return "ERR_DUPLICATE";

    const encryptedPW = bcrypt.hashSync(signupObj.pswd1, 10);
    delete signupObj.pswd1;
    signupObj.password = encryptedPW;

    await db.collection("user").insertOne(signupObj);
    return "SUCCESS";
  } catch (e) {
    console.error(e);
    return "ERR";
  }
}
module.exports.signup = signup;

async function getDisease() {
  try {
    const disease = await db
      .collection("disease")
      .find({})
      .sort({ name: 1 })
      .toArray();

    return disease;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
module.exports.getDisease = getDisease;

async function searchReceipe(keyword) {
  try {
    const receipe = await db
      .collection("receipe")
      .find({ $text: { $search: keyword } }, { projection: { RCP_NM: 1 } })
      .toArray();
    return receipe;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
module.exports.searchReceipe = searchReceipe;

async function getReceipe(receipeName) {
  try {
    const receipe = db.collection("receipe").findOne({ RCP_NM: receipeName });
    return receipe;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
module.exports.getReceipe = getReceipe;

async function favoriteReciepe(user, receipeName) {
  try {
    await db.collection("favoriteReceipe").insertOne({
      id: user,
      receipe: receipeName,
    });
    return true;
  } catch (e) {
    return false;
  }
}
module.exports.favoriteReciepe = favoriteReciepe;
