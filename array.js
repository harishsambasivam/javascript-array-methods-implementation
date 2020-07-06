var Array = /*#__PURE__*/ (function () {
  function Array(value) {
    this.internalArray = value;
    this.length = this.internalArray.length;
  }

  var _proto = Array.prototype;

  _proto.foreach = function foreach(callback) {
    // Robustness principle – Postel’s law, after Jon Postel
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    for (var index = 0; index < this.length; index++) {
      var currentValue = this.internalArray[index];
      callback(currentValue, index, this.internalArray);
    }
  };

  _proto.customMap = function customMap(callback) {
    // Robustness principle – Postel’s law, after Jon Postel
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    var transformedArray = []; // Projects each element of a sequence into a new form.

    for (var index = 0; index < this.length; index++) {
      var currentValue = this.internalArray[index];
      var currentTransformedValue = callback(
        currentValue,
        index,
        this.internalArray
      );
      transformedArray.push(currentTransformedValue);
    }

    return transformedArray;
  };

  _proto.reduce = function reduce(callback, initialValue) {
    // Robustness principle – Postel’s law, after Jon Postel
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    var accumulator = initialValue;
    var startIndex = 0;
    if (initialValue === undefined) {
      accumulator = this.internalArray[0];
      startIndex = 1;
    }

    for (var index = startIndex; index < this.length; index++) {
      const value = this.internalArray[index];
      accumulator = callback(
        accumulator,
        this.internalArray[index],
        this.internalArray
      );
    }
    return accumulator;
  };

  _proto.filter = function filter(callback) {
    // Robustness principle – Postel’s law, after Jon Postel
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    var result = [];
    for (var index = 0; index < this.length; index++) {
      if (callback(this.internalArray[index], index, this.internalArray)) {
        result.push(this.internalArray[index]);
      }
    }
    return result;
  };

  return Array;
})();

var numbers = new Array([1, 2, 3, 4, 5, 6]);
// numbers.foreach((item) => console.log(item));

// var multipleOfTwo = numbers.customMap((element) => element * 2);
// console.log(multipleOfTwo);

var oddNumbers = numbers.filter((element) => element % 2);
var sumOfArray = numbers.reduce(
  (accumulator, element) => element + accumulator
);
var sumOfArrayPlus100 = numbers.reduce(
  (accumulator, element) => element + accumulator,
  100
);
console.log(oddNumbers);
console.log(sumOfArray);
console.log(sumOfArrayPlus100);
