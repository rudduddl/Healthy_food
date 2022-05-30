const {
  MongoClient,
  ServerApiVersion,
  MongoGridFSChunkError,
  ObjectId,
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

async function getDisease(id) {
  try {
    const disease = await db
      .collection("disease")
      .findOne({ _id: ObjectId(id) });
    return disease;
  } catch (e) {
    console.error(e);
  }
}
module.exports.getDisease = getDisease;

async function getAllDisease() {
  try {
    const disease = await db
      .collection("disease")
      .find({})
      .sort({ name: 1 })
      .toArray();

    return disease;
  } catch (e) {
    console.error(e);
    return [];
  }
}
module.exports.getAllDisease = getAllDisease;

async function searchReceipe(keyword) {
  try {
    const receipe = await db
      .collection("receipe")
      .find({ $text: { $search: keyword } }, { projection: { RCP_NM: 1 } })
      .toArray();
    return receipe;
  } catch (e) {
    console.error(e);
    return [];
  }
}
module.exports.searchReceipe = searchReceipe;

async function getReceipe(receipeId) {
  try {
    const receipe = db
      .collection("receipe")
      .findOne({ _id: ObjectId(receipeId) });
    return receipe;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
module.exports.getReceipe = getReceipe;

async function getCautionReceipe(caution) {
  try {
    const receipe = db
      .collection("receipe")
      .find({}, { projection: { RCP_NM: 1, ATT_FILE_NO_MK: 1 } })
      .limit(25)
      .toArray();
    return receipe;
  } catch (e) {
    console.error(e);
    return [];
  }
}
module.exports.getCautionReceipe = getCautionReceipe;

async function favoriteReciepe(user, receipeName) {
  try {
    await db.collection("favoriteReceipe").insertOne({
      id: user,
      receipeId: receipeName,
    });
    return true;
  } catch (e) {
    return false;
  }
}
module.exports.favoriteReciepe = favoriteReciepe;

async function getFavoriteReceipe(userId) {
  try {
    const result = [];
    const favoriteReceipeIds = await db
      .collection("favoriteReceipe")
      .find({ id: userId })
      .toArray();

    for (const favoriteReciepe of favoriteReceipeIds) {
      var receipe = await db
        .collection("receipe")
        .findOne(
          { _id: ObjectId(favoriteReciepe.receipeId) },
          { projection: { RCP_NM: 1, ATT_FILE_NO_MK: 1 } }
        );

      result.push(receipe);
    }

    return result;
  } catch (e) {
    console.error(e);
  }
}
module.exports.getFavoriteReceipe = getFavoriteReceipe;
