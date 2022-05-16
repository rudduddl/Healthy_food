const request = require("request");

const authKey = "17a73ba1c7834146aa7e";
const serviceId = "COOKRCP01";
const dataType = "json";
const startIdx = 1;
const endIdx = 10;

function searchReceipe(name, callback) {
  const uri = `http://openapi.foodsafetykorea.go.kr/api/${authKey}/${serviceId}/${dataType}/${startIdx}/${endIdx}/RCP_NM=${encodeURI(
    name
  )}`;
  request(uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const jsonObject = JSON.parse(body);
      const receipes = jsonObject.COOKRCP01.row;
      callback(receipes);
    } else {
      console.log(error);
      callback();
    }
  });
}
module.exports.searchReceipe = searchReceipe;
