// json data
var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
 console.log(jsonData);
// parse json
var jsonParsed = JSON.parse(jsonData);
 
// access elements
console.log(jsonParsed.persons[0].name);