const mongodb = require("./src/mongodb");

setTimeout(async function () {
  await mongodb.getFavoriteReceipe("test1234");
}, 1000);
