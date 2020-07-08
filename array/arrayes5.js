"use strict";

var Array = /*#__PURE__*/ (function () {
  function Array(value) {
    this.internalArray = value;
    this.length = this.internalArray.length;
  }

  var _proto = Array.prototype;

  _proto.foreach = function foreach(callback) {
    if (typeof callback !== "function")
      throw new TypeError(callback + " is not a function");
    var element;
    var array = this.internalArray;

    for (var index = 0; index < this.length; index++) {
      element = array[index];
      callback(element, index, array);
    }
  };

  _proto.customMap = function customMap(callback) {
    if (typeof callback !== "function")
      throw new TypeError(callback + " is not a function");
    var transformedArray = [],
      element;
    var array = this.internalArray;

    for (var index = 0; index < this.length; index++) {
      element = array[index];
      var transformedValue = callback(element, index, array);
      transformedArray.push(transformedValue);
    }

    return transformedArray;
  };

  _proto.filter = function filter(callback) {
    if (typeof callback !== "function")
      throw new TypeError(callback + " is not a function");
    var result = [],
      element;
    var array = this.internalArray;

    for (var index = 0; index < this.length; index++) {
      element = array[index];
      if (callback(element, index, array)) result.push(element);
    }

    return result;
  };

  _proto.reduce = function reduce(callback, initialValue) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    var accumulator = initialValue;
    var startIndex = 0;
    var array = this.internalArray;

    if (initialValue === undefined) {
      accumulator = array[0];
      startIndex = 1;
    }

    var element;

    for (var index = startIndex; index < this.length; index++) {
      element = array[index];
      accumulator = callback(accumulator, element, array);
    }

    return accumulator;
  };

  _proto.findIndex = function findIndex(callback) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    var element;
    var array = this.internalArray;

    for (var index = 0; index < this.length; index++) {
      element = array[index];

      if (callback(element, index, array)) {
        return index;
      }
    }

    return -1;
  };

  _proto.find = function find(callback) {
    var array = this.internalArray;

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    var index = this.findIndex(callback);

    if (index === -1) {
      return undefined;
    }

    var foundElement = array[index];
    return foundElement;
  };

  _proto.indexOf = function indexOf(searchedElement) {
    var index = this.findIndex(function (element) {
      return element === searchedElement;
    });
    return index;
  };

  _proto.lastIndexOf = function lastIndexOf(searchedElement) {
    var element;
    var array = this.internalArray;

    for (var index = this.length - 1; index >= 0; index--) {
      element = array[index];

      if (element === searchedElement) {
        return index;
      }
    }

    return -1;
  };

  _proto.includes = function includes(searchedElement) {
    var index = this.findIndex(function (element) {
      return element === searchedElement;
    });
    return index != -1 ? true : false;
  };

  _proto.every = function every(callback) {
    if (typeof callback !== "function")
      throw TypeError(callback + "is not a function");
    var element;
    var array = this.internalArray;

    for (var index = 0; index < this.length; index++) {
      element = array[index];

      if (!callback(element, index, array)) {
        return false;
      }
    }

    return true;
  };

  _proto.some = function some(callback) {
    if (typeof callback !== "function")
      throw TypeError(callback + "is not a function");
    var element;
    var array = this.internalArray;

    for (var index = 0; index < this.length; index++) {
      element = array[index];

      if (callback(element, index, array)) {
        return true;
      }
    }

    return false;
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
console.log(sumOfArray); // reduce with intial value

var sumOfArrayPlus100 = numbers.reduce(function (accumulator, element) {
  return element + accumulator, 100;
});
console.log(sumOfArrayPlus100);

//============================================
// findIndex
//============================================

var firstMultipleOf3 = numbers.findIndex(function (element) {
  return element % 3 === 0;
});

//============================================
// indexOf
//============================================

var indexOf1 = numbers.indexOf(1);

//============================================
// find
//============================================

var firstElementGreaterThan3 = numbers.find(function (element) {
  return element > 3;
});

//============================================
// lastIndexOf
//============================================

var lastIndexOf1 = numbers.lastIndexOf(1);

//============================================
// some
//============================================

numbers.some(function (element) {
  return element % 2 === 0;
});

//============================================
// every
//============================================

numbers.every(function (element) {
  return element % 2 === 0;
});

//============================================
// includes
//============================================

numbers.includes(100);
