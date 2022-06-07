// const arr1 = ["가공식품", "육류", "돼지"];
// const filterd = arr1.filter(
//   (element) => element.includes("식품") || element.includes("류")
// );
// console.log(filterd);

const db = require("./src/mongodb");

setTimeout(async () => {
  const result = await db.getCautionReceipe("해조류, 어패류");
  console.log(result);
}, 2000);
