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
  client.connect((err) => {
    if (err) console.error(err);
    else console.log("mongodb connected");

    db.collection("disease").createIndex({ name: "text" });
  });
}
