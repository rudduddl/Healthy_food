const db = require("./src/mongodb");

setTimeout(function () {
  db.searchReceipe("고구마", function (i) {
    console.log(i);
    db.disconnect();
  });
}, 2000);
