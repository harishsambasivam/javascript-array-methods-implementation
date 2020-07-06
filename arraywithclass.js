// Refactored version #1 of map and forEach under the hood
class Array {
  constructor(value) {
    this.internalArray = value;
    this.length = this.internalArray.length;
  }

  foreach(callback) {
    // Robustness principle – Postel's law, after Jon Postel
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    for (let i = 0; i < this.length; i++) {
      const currentValue = this.internalArray[i];
      callback(currentValue, i, this.internalArray);
    }
  }

  customMap(callback) {
    // Robustness principle – Postel's law, after Jon Postel
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let transformedArray = [];
    // Projects each element of a sequence into a new form.
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
    // Robustness principle – Postel’s law, after Jon Postel
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
    // Robustness principle – Postel’s law, after Jon Postel
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
}

//============================================
// Outputs and tests
//============================================

//============================================
// new Array
//============================================

let numbers = new Array([1, 2, 3, 4, 5, 6]);

//============================================
// map
//============================================

let multipleOfTwo = numbers.customMap((element) => element * 2);
console.log(multipleOfTwo);

//============================================
// foreach
//============================================

numbers.foreach((item) => console.log(item));

//============================================
// filter
//============================================

let oddNumbers = numbers.filter((element) => element % 2);
console.log(oddNumbers);

//============================================
// reduce
//============================================

// reduce without intial value

let sumOfArray = numbers.reduce(
  (accumulator, element) => element + accumulator
);
console.log(sumOfArray);

// reduce with intial value

let sumOfArrayPlus100 = numbers.reduce(
  (accumulator, element) => element + accumulator,
  100
);
console.log(sumOfArrayPlus100);
