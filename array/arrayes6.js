class Array {
  constructor(value) {
    this.internalArray = value;
    this.length = this.internalArray.length;
  }

  foreach(callback) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    for (let i = 0; i < this.length; i++) {
      const currentValue = this.internalArray[i];
      callback(currentValue, i, this.internalArray);
    }
  }

  customMap(callback) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let transformedArray = [];
    for (let i = 0; i < this.length; i++) {
      const currentValue = this.internalArray[i];
      const currentTransformedValue = callback(
        currentValue,
        i,
        this.internalArray
      );
      transformedArray.push(currentTransformedValue);
    }
    return transformedArray;
  }

  filter(callback) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let result = [];
    for (let index = 0; index < this.length; index++) {
      if (callback(this.internalArray[index], index, this.internalArray))
        result.push(this.internalArray[index]);
    }
    return result;
  }

  reduce(callback, initialValue) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let accumulator = initialValue;
    let startIndex = 0;
    if (initialValue === undefined) {
      accumulator = this.internalArray[0];
      startIndex = 1;
    }

    for (let index = startIndex; index < this.length; index++) {
      const value = this.internalArray[index];
      accumulator = callback(
        accumulator,
        this.internalArray[index],
        this.internalArray
      );
    }
    return accumulator;
  }

  findIndex(callback) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let element;
    for (let index = 0; index < this.length; index++) {
      element = this.internalArray[index];
      if (callback(element, index, this.internalArray)) {
        return index;
      }
    }

    return -1;
  }

  find(callback) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let index = this.findIndex(callback);
    if (index === -1) {
      return undefined;
    }
    return this.internalArray[index];
  }

  indexOf(searchedElement) {
    let index = this.findIndex((element) => element === searchedElement);
    return index;
  }

  lastIndexOf(searchedElement) {
    let value;
    for (let index = this.length - 1; index >= 0; index--) {
      value = this.internalArray[index];
      if (value === searchedElement) {
        return index;
      }
    }
    return -1;
  }
}

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
