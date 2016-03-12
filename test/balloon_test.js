var balloon = require('../balloon.js');
var assert = require('assert');

var orderStr = '4 sets of red, 3 sets of blue, and 3 sets of yellow.';
var priceStr = 'R4 for red, R5 for blue, and R5.50 for yellow.';
var popStr = '5 red balloons, 1 blue balloon, and 3 yellow balloons popped.';
var guests = 25;

describe('balloon', function() {

    it('should convert string digits into numbers for price list', function() {
      var ball = balloon(priceStr, orderStr, guests);
      var digit = ball.prices.list;
      var result = isNaN(digit[0].price);
      assert.equal(result, false);
    });

    it('should convert string digits into numbers for order', function() {
      var digit = balloon(priceStr, orderStr, guests).order.list;
      var result = isNaN(digit[0].sets);
      assert.equal(result, false);
    });

    it('should return an array of objects = order with length of 3', function() {
      var array = balloon(priceStr, orderStr, guests).order.list;
      var result = array.length;
      assert.equal(result, 3);
    });

    it('should return an array of objects = price list with length of 3', function() {
      var array = balloon(priceStr, orderStr, guests).prices.list;
      var result = array.length;
      assert.equal(result, 3);
    });

    it(': the array of objects = order should show 4 sets of red totalling 12, 3 sets of blue totalling 9, and three sets of yellow balloons totalling 9 were ordered', function() {
      var result = balloon(priceStr, orderStr, guests).order.list;
      assert.deepEqual(result, [{colour: 'red', sets: 4, total: 12}, {colour: 'blue', sets: 3, total: 9}, {colour: 'yellow', sets: 3, total: 9}]);
    });

    it(': the array of objects = price list should show that red = R4, blue = R5, yellow = R5.50', function() {
      var result = balloon(priceStr, orderStr, guests).prices.list;
      assert.deepEqual(result, [{colour: 'red', price: 4}, {colour: 'blue', price: 5}, {colour: 'yellow', price: 5.5}]);
    });

    it('.balloonCost should return total cost of balloons exluding helium. With 4 sets of red @ R4/set, 3 sets blue @R5/set & 3 sets yellow @ R5.5/set, total cost should be R47.50', function() {
      var result = balloon(priceStr, orderStr, guests).totalCost();
      assert.equal(result, 47.5);
    });

    it('.heliumCost should return the total additional cost for helium @ R2 per balloon. With a total of 30 balloons extra cost should be R60.', function() {
      var result = balloon(priceStr, orderStr, guests).heliumCost();
      assert.equal(result, 60);
    });

    it('.addHelium should return the total cost of balloons and helium for each balloon.', function() {
      var result = balloon(priceStr, orderStr, guests).addHelium();
      assert.equal(result, 107.5);
    });

    it('.enough should state if there are enough balloons for each person to have one and if there are any remaining. In this case there should be 5 balloons leftover', function() {
      var result = balloon(priceStr, orderStr, guests).enough();
      assert.equal(result, "There is more than enough to go around. Each guest gets a balloon and you have 5 balloons left over.");
    });

    it('.guestsWithout should state how many guests lack a balloon. In this case it should be 4', function() {
      var result = balloon(priceStr, orderStr, guests).guestsWithout();
      assert.equal(result, 4);
    });

    it('.leftOver should return the number of balloons that are left over after each guest got one', function() {
      var result = balloon(priceStr, orderStr, guests).leftOver();
      assert.equal(result, 5);
    });

    it('popped should be a chainable function that does not return anything but an object. return the colour and number of balloons that have been popped.', function() {
      var result = typeof balloon(priceStr, orderStr, guests).popped(popStr);
      assert.equal(result, 'object');
    });

    it('event.popped : requested after "popped" has been instantiated (because "popped" creates .event) and should return a map of the balloons that have been popped.', function() {
      var result = balloon(priceStr, orderStr, guests).popped(popStr).event.popped;
      assert.deepEqual(result, {red: 5, blue: 1, yellow: 3});
    });

    it('event.poppedAll : requested after "popped". Should return sum of all popped balloons.', function() {
      var result = balloon(priceStr, orderStr, guests).popped(popStr).event.poppedAll;
      assert.equal(result, 9);
    });

    it('.getLeftOver should be a method that can be called after "popped" that returns the balloons leftover after some have been popped.', function() {
      var result = balloon(priceStr, orderStr, guests).popped(popStr).getLeftOver();
      assert.deepEqual(result, {red: 7, blue: 8, yellow: 6});
    });

    it('.maxLeft is called after "popped" and should return the colour and number of balloons left over by the colour with the most balloons left after some balloons have popped.', function() {
      var result = balloon(priceStr, orderStr, guests).popped(popStr).maxLeft();
      assert.deepEqual(result, [{blue: 8}]);
    });

    it('.minLeft: called after "popped" and returns the colour and quantity of the balloon with the least remaining quanity.', function() {
      var result = balloon(priceStr, orderStr, guests).popped(popStr).minLeft();
      assert.deepEqual(result, [{yellow: 6}]);
    });

    it('.guestsWithout: called after "popped" and returns the number of guests without a balloon after some balloons have popped', function() {
      var result = balloon(priceStr, orderStr, guests).popped(popStr).guestsWithout();
      assert.equal(result, 4);
    });

});
