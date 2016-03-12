var orderStr = '4 sets of red, 3 sets of blue, and 3 sets of yellow.';
var priceStr = 'R4 for red, R5 for blue, and R5.50 for yellow.';
var pop = '5 red balloons, 1 blue balloon, and 3 yellow balloons popped.';

var _ = require('lodash');

function ExtractData(string, type) {
  var regex = /(\d+\.?[0-9]{0,2})[\s\w+]+?(red|blue|yellow)/g;
  var match;
  this.total;
  this.list = [];
  this.popped = [];
  this.poppedAll;
  switch (type) {
    case 'price': while (match = regex.exec(string)) {
                  this.list.push({colour: match[2], price: Number(match[1])});
                  }
                  return this;
    case 'order': this.total = 0;
                  while (match = regex.exec(string)) {
                  this.list.push({colour: match[2], sets: Number(match[1]), total: Number(match[1]) * 3});
                  this.total += Number(match[1])*3;
                  }
                  return this;
    case 'pop':   this.poppedAll = 0;
                  var regpop = /(\d+)\s(\w+)/g;
                  while (match = regpop.exec(string)) {
                  this.popped.push({colour: match[2], popped: Number(match[1])});
                  this.poppedAll += Number(match[1]);
                  }
                  return this;
    default: return null;
  }
};

// function Map(orderStr,priceStr) {
//   this.order = function(orderStr, 'order') {
//     return extractData(orderStr, type);
//   }
// }

// exports.heliumCost = function(n) {
//   return n*2;
// };

var extractOrder = function(orderStr) {
  var type = 'order';
  return new ExtractData(orderStr, type);
};

// var orderQuantity = function(orderStr) {
//   var type = 'order';
//   var order = extractData(orderStr, type);
//   return order.reduce(function(array, obj){
//     array.push(_.omit(obj, 'sets'));
//     return array;
// },[]);
// };

var extractPrices = function(priceStr) {
  var type = 'price';
  return new ExtractData(priceStr, type);
  };

var extractPopped = function(popStr) {
  var type = 'pop';
  return new ExtractData(popStr, type);
  };

function BalloonOrder(priceStr, orderStr, guests) {
    this.guests = guests;
    this.prices = extractPrices(priceStr);
    console.log(this.prices);
    this.order = extractOrder(orderStr);
    this.merged = _.merge(prices.list, order.list);
    this.total = this.order.total;
    this.totalCost =  function(quotes) {
                     var totalcost = _.reduce(this.merged, function(total, colour) { /// NOTE: THIS IS DIFFERENT TO TRANSFORM IN THAT ,0 READS AS INITIAL VALUE, WHEREAS IN TRANSFORM IT READS AS THE ACCUMULATED VALUE.
                    total += colour.price * colour.sets;
                    return total;
                  },0);
                  if (!quotes) {
                    return totalcost;
                  } else {
                    return this;
                  }
                };

    this.heliumCost = function() {
                      return this.order.total*2;
                      };

    this.addHelium = function() {
                      return this.totalCost + this.heliumCost();
                      };

    this.leftOver = function() {
                    if ( this.total > this.guests) {
                          return this.total - this.guests;
                              } else {
                                return 0;
                              }
                    };

    this.enough = function() {
                    if (this.total === this.guests) {
                      return 'Yes, there are just enough balloons to give one to each guest.';
                    } else if (this.total > this.guests) {
                        return 'There is more than enough to go around. Each guest gets a balloon and you have '+this.leftOver+' balloons left over.';
                      } else {
                        return 'There are less balloons that guests. You will require '+(this.guests - this.total)+' balloons to give each guest one.';
                      }
                    };

    this.event;

    this.popped = function(popStr) {
                      this.event = extractPopped(popStr, 'pop');
                      return this;
                    };

    this.getLeftOver = function() {
                        var merge = _.merge(this.event.popped, this.order.list);
                        return merge.reduce(function(array, obj){
                          array.push({colour: obj.colour, remaining: obj.total - obj.popped});
                          return array;
                        },[]);
                      };

    this.guestsWithout = this.guests - (this.event.poppedAll - this.leftOver());

    this.maxLeft = function() {
                        return this.getLeftOver().reduce(function(array,b){
                          if (array[0][1] < b.remaining){
                          array = [b];
                          } else if (array[0][1] === b.remaining) {
                            array.push(b);
                          }
                          return array;
                        },[0,0]);
                      };

    this.minLeft = function() {
                        return this.getLeftOver().reduce(function(a,b){
                          if (array[0][1] > b.remaining) {
                          array = [b];
                        } else if (array[0][1] === b.remaining) {
                          array.push(b);
                        }
                        return array;
                      },[9999,9999]);
                    };
  };


module.exports = function(priceStr, orderStr, guests) {
      return new BalloonOrder(priceStr, orderStr, guests);
};
