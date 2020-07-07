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
    var element;
    for (var index = 0; index < this.length; index++) {
      element = this.internalArray[index];
      if (callback(element, index, this.internalArray)) {
        result.push(this.internalArray[index]);
      }
    }
    return result;
  };

  _proto.findIndex = function findIndex(callback) {
    // Robustness principle – Postel’s law, after Jon Postel
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    var element;
    for (var index = 0; index < this.length; index++) {
      element = this.internalArray[index];
      if (callback(element, index, this.internalArray)) {
        return index;
      }
    }

    return -1;
  };

  _proto.find = function find(callback) {
    // Robustness principle – Postel’s law, after Jon Postel
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    var index = this.findIndex(callback);
    if (index === -1) {
      return undefined;
    }
    return this.internalArray[index];
  };

  _proto.indexOf = function indexOf(searchedElement) {
    var index = this.findIndex((element) => element === searchedElement);
    return index;
  };

  _proto.lastIndexOf = function lastIndexOf(searchedElement) {
    var value;
    for (var index = this.length - 1; index >= 0; index--) {
      value = this.internalArray[index];
      if (value === searchedElement) {
        return index;
      }
    }
    return -1;
  };

  return Array;
})();

//============================================
// Outputs and tests
//============================================

//============================================
// new Array
//============================================

var numbers = new Array([1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1]);

//============================================
// map
//============================================

var multipleOfTwo = numbers.customMap(function (element) {
  return element * 2;
});
console.log(multipleOfTwo);

//============================================
// foreach
//============================================

numbers.foreach(function (item) {
  console.log(item);
});

//============================================
// filter
//============================================

var oddNumbers = numbers.filter(function (element) {
  return element % 2 !== 0;
});
console.log(oddNumbers);

//============================================
// reduce
//============================================

// reduce without intial value

var sumOfArray = numbers.reduce(function (accumulator, element) {
  return element + accumulator;
});
console.log(sumOfArray);

// reduce with intial value

var sumOfArrayPlus100 = numbers.reduce(function (accumulator, element) {
  return element + accumulator, 100;
});
console.log(sumOfArrayPlus100);

//============================================
// findIndex
//============================================

var firstMultipleOf3 = numbers.findIndex((element) => element % 3 === 0);

//============================================
// indexOf
//============================================

var indexOf1 = numbers.indexOf(1);

//============================================
// find
//============================================

var firstElementGreaterThan3 = numbers.find((e) => e > 3);

//============================================
// lastIndexOf
//============================================
var lastIndexOf1 = numbers.lastIndexOf(1);
