// const {
//   MongoClient,
//   ServerApiVersion,
//   MongoGridFSChunkError,
//   ObjectId,
// } = require("mongodb");
// const bcrypt = require("bcrypt");
// const { get } = require("express/lib/response");

// const uri =
//   "mongodb+srv://admin:admin@cluster0.qpfrt.mongodb.net/Cluster0?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// const db = client.db("mydb");

// connect();

// //몽고DB 접속
// function connect() {
//   client.connect((err) => {
//     if (err) console.error(err);
//     else console.log("mongodb connected");

//     //something to do
//   });
// }

let str = "해조류, 어패류";

if (str.includes("해조류")) {
  str = str.replace("해조류", "미역,다시마,김,파래,톳,우뭇가사리,청각");
}
if (str.includes("어패류")) {
  str = str.replace(
    "어패류",
    "게,어,갈치,삼치,낙지,조개,바지락,굴,해삼,개불,날치,고래,가오리,아구"
  );
}
console.log(str);
