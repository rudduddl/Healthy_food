const { MongoClient, ServerApiVersion } = require("mongodb");
var fs = require("fs");

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
  client.connect(async (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("mongodb connected");
    var data = JSON.parse(
      fs.readFileSync("excel/JSON.json", { encoding: "utf8" })
    );

    // for (const key in data) {
    //   await db
    //     .collection("foodClass")
    //     .insertOne({ class: key, value: data[key] });
    // }
    // console.log("done");

    const result = await db
      .collection("foodClass")
      .findOne({ class: "가공식품" });
    console.log(result.value[0]);
  });
}
