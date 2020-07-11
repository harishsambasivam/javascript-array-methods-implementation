class Array {
  constructor(value = []) {
    this.data = value;
    this.length = this.internalArray.length;
  }

  get length() {
    return this._length;
  }

  set length(value) {
    this._length = value;
  }

  foreach(callback) {
    if (typeof callback !== "function")
      throw new TypeError(callback + " is not a function");

    let element;
    const array = this.internalArray;
    for (let index = 0; index < this.length; index++) {
      element = array[index];
      callback(element, index, array);
    }
  }

  customMap(callback) {
    if (typeof callback !== "function")
      throw new TypeError(callback + " is not a function");

    let transformedArray = [],
      element;
    const array = this.internalArray;
    for (let index = 0; index < this.length; index++) {
      element = array[index];
      const transformedValue = callback(element, index, array);
      transformedArray.push(transformedValue);
    }
    return transformedArray;
  }

  filter(callback) {
    if (typeof callback !== "function")
      throw new TypeError(callback + " is not a function");

    let result = [],
      element;
    const array = this.internalArray;
    for (let index = 0; index < this.length; index++) {
      element = array[index];
      if (callback(element, index, array)) result.push(element);
    }
    return result;
  }

  reduce(callback, initialValue) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let accumulator = initialValue;
    let startIndex = 0;
    const array = this.internalArray;

    if (initialValue === undefined) {
      accumulator = array[0];
      startIndex = 1;
    }
    let element;
    for (let index = startIndex; index < this.length; index++) {
      element = array[index];
      accumulator = callback(accumulator, element, array);
    }
    return accumulator;
  }

  findIndex(callback) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let element;
    const array = this.internalArray;

    for (let index = 0; index < this.length; index++) {
      element = array[index];
      if (callback(element, index, array)) {
        return index;
      }
    }
    return -1;
  }

  find(callback) {
    const array = this.internalArray;

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let index = this.findIndex(callback);
    if (index === -1) {
      return undefined;
    }
    let foundElement = array[index];
    return foundElement;
  }

  indexOf(searchedElement) {
    let index = this.findIndex((element) => element === searchedElement);
    return index;
  }

  lastIndexOf(searchedElement) {
    let element;
    const array = this.internalArray;

    for (let index = this.length - 1; index >= 0; index--) {
      element = array[index];
      if (element === searchedElement) {
        return index;
      }
    }
    return -1;
  }

  includes(searchedElement) {
    let index = this.findIndex((element) => element === searchedElement);
    return index != -1 ? true : false;
  }

  every(callback) {
    if (typeof callback !== "function")
      throw TypeError(callback + "is not a function");
    let element;
    const array = this.internalArray;

    for (let index = 0; index < this.length; index++) {
      element = array[index];
      if (!callback(element, index, array)) {
        return false;
      }
    }
    return true;
  }

  some(callback) {
    if (typeof callback !== "function")
      throw TypeError(callback + "is not a function");
    let element;
    const array = this.internalArray;

    for (let index = 0; index < this.length; index++) {
      element = array[index];
      if (callback(element, index, array)) {
        return true;
      }
    }
    return false;
  }

  isArray(array) {
    let objectToString = Object.prototype.toString.bind(array);
    let result = objectToString();
    if (result !== "[object Array]") return false;
    return true;
  }

  concat(...values) {
    let { length } = values;
    let result = [...this.internalArray];
    for (let index = 0; index < length; index++) {
      if (this.isArray(values[index])) {
        result.push(...values[index]);
      } else {
        result.push(values[index]);
      }
    }
    return result;
  }

  flat(depth = Infinity, array = this.internalArray) {
    if (depth < 1 || !this.isArray(array)) {
      return array;
    }

    return array.reduce((result, current) => {
      return result.concat(this.flat(depth - 1, current));
    }, []);
  }

  flatMap(callback) {
    if (typeof callback !== "function")
      throw new TypeError(callback + " is not a function");
    return this.flat(1, this.customMap(callback));
  }

  join(seperator = ",") {
    return this.internalArray.reduce((acc, current, index) => {
      if (index === 0) return current;
      return `${acc}${seperator}${current}`;
    }, "");
  }

  reverse() {
    let array = this.internalArray;
    for (let left = 0, right = this.length - 1; left < right; left++, right--) {
      [array[left], array[right]] = [array[right], array[left]];
    }
    return array;
  }

  shift() {
    if (this.length === 0) return undefined;
    let firstElement = this.internalArray[0];
    for (let i = 1; i < this.length; i++) {
      let value = this.internalArray[i];
      this.internalArray[i - 1] = value;
    }
    this.internalArray.length--; // wierd🤒 work around to remove last element
    this.length--;
    return firstElement;
  }

  unshift(value) {
    for (let i = 0; i <= this.length; i++) {
      let temp = this.internalArray[i];
      this.internalArray[i] = value;
      value = temp;
    }
    this.length++;
    return this.length;
  }
}

let deepArray = new Array([1, 2, [7, 8, [1, 2]]]);

// _ = deepArray.flat();
// _;

_ = deepArray.flatMap((x) => [x, x * 2]);
_;

_ = deepArray.flat().join(" ");
_;

let array = new Array();
_ = array.reverse();
_;

_ = array.shift();
_ = array.shift();
_ = array.shift();
_ = array.shift();
_ = array.shift();
array;
_;

_ = array.unshift(0);
_ = array.unshift(-1);
_;
array;

//============================================
// Outputs and tests
//============================================

//============================================
// new Array
//============================================

var numbers = new Array([1, 2, 3, 4, 5]);

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

var firstElementGreaterThan3 = numbers.find((element) => element > 3);

//============================================
// lastIndexOf
//============================================

var lastIndexOf1 = numbers.lastIndexOf(1);

//============================================
// some
//============================================

numbers.some((element) => element % 2 === 0);

//============================================
// every
//============================================

numbers.every((element) => element % 2 === 0);

//============================================
// includes
//============================================

numbers.includes(100);

//============================================
// concat
//============================================
numbers;
_ = numbers.concat([21, 2], 3, undefined, [[1]]);
_;
//============================================
// flat
//============================================
