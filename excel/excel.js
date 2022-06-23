const path = require("path");
const fs = require("fs");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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

    const filePath = path.join(__dirname, "질병분류데이터수정.csv");

    const csv = fs.readFileSync(filePath, { encoding: "utf8" });
    const rows = csv.split("\r\n");

    for (const row of rows) {
      const column = row.split("|");
      const diseaseName = column[1];
      const caution = column[3];

      if (!diseaseName) continue;

      try {
        const find = await db
          .collection("disease")
          .findOne({ name: diseaseName });

        await db
          .collection("disease")
          .updateOne({ name: diseaseName }, { $set: { caution: caution } });
      } catch (e) {
        console.log("error");
        console.log(e);
      }
    }
  });
}
