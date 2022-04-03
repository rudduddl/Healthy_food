const request = require('request');


const authKey = "17a73ba1c7834146aa7e"
const serviceId = "COOKRCP01"
const dataType = "json"
const startIdx = 1
const endIdx = 5

const uri = `http://openapi.foodsafetykorea.go.kr/api/${authKey}/${serviceId}/${dataType}/${startIdx}/${endIdx}`

function getReceipe(callback){
    request(uri,function(error, response, body){
        if(!error&&response.statusCode==200){
            const jsonObject = JSON.parse(body);
            const firstFood = jsonObject.COOKRCP01.row[2];
            callback(firstFood);
        }
    });
}
module.exports.getReceipe = getReceipe;
  