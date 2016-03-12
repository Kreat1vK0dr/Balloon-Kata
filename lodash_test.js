var orderStr = '4 sets of red, 3 sets of blue, and 3 sets of yellow.';
var priceStr = 'R4 for red, R5 for blue, and R5.50 for yellow.';
var pop = '5 red balloons, 1 blue balloon, and 3 yellow balloons popped.';
var _ = require('lodash');

var extract = function(string, type) {
  var regex = /(\d+\.?[0-9]{0,2})[\s\w+]+?(red|blue|yellow)/g;
  var match;
  var list = [];
  switch (type) {
    case 'price': while (match = regex.exec(orderStr)) {
                   var colour = match[2];
                  list.push({ colour: match[2], price: Number(match[1])});
                  }
                  return list;
    case 'order':
                  while (match = regex.exec(orderStr)) {
                  list.push({colour: match[2], sets: Number(match[1]), total: Number(match[1]) * 3});
                  }
                  return list;

    default: return null;
  }
};

var object = extract(priceStr, 'price');
var source = extract(orderStr, 'order');


var merged = _.merge(object, source);

var omit = source.reduce(function(array, obj) {
    array.push(_.omit(obj, 'sets'));
    return array;
  },[]);

console.log(omit);
// console.log(merged);
// console.log(object);
// console.log(source);
