class Array {
  constructor() {
    this.data = {};
    this.length = 0;
    if (arguments[0]) {
      if (
        Object.prototype.toString.call(arguments[0]) !== "[object Array]" &&
        Object.prototype.toString.call(arguments[0]) !== "[object Number]"
      ) {
        throw new TypeError("constructor only accepts number or array");
      }
    }

    if (Object.prototype.toString.call(arguments[0]) === "[object Array]") {
      let values = arguments[0];
      let length = values.length;
      for (let index = 0; index < length; index++) {
        this.data[index] = values[index];
        this.length++;
      }
    }

    if (Object.prototype.toString.call(arguments[0]) === "[object Number]") {
      let length = arguments[0];
      this.length = length;
    }
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
    const array = this.data;
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
    const array = this.data;
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
    const array = this.data;
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
    const array = this.data;

    if (initialValue === undefined) {
      accumulator = array[0];
      startIndex = 1;
    }
    let element;
    for (let index = startIndex; index < this.length; index++) {
      element = array[index];
      accumulator = callback(accumulator, element, index, array);
    }
    return accumulator;
  }

  findIndex(callback) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    let element;
    const array = this.data;

    for (let index = 0; index < this.length; index++) {
      element = array[index];
      if (callback(element, index, array)) {
        return index;
      }
    }
    return -1;
  }

  find(callback) {
    const array = this.data;

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
    const array = this.data;

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
    const array = this.data;

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
    const array = this.data;

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
    let result = [];
    for (let i = 0; i < this.length; i++) result.push(this.data[i]);
    for (let index = 0; index < length; index++) {
      if (this.isArray(values[index])) {
        result.push(...values[index]);
      } else {
        result.push(values[index]);
      }
    }
    return result;
  }

  flat(depth = Infinity, array = Object.values(this.data)) {
    console.log(Object.values(this.data));
    if (depth < 1 || !this.isArray(array)) {
      return array;
    }

    return Object.values(this.data).reduce((result, current) => {
      return result.concat(this.flat(depth - 1, current));
    }, []);
  }

  flatMap(callback) {
    if (typeof callback !== "function")
      throw new TypeError(callback + " is not a function");
    return this.flat(1, this.customMap(callback));
  }

  join(seperator = ",") {
    return this.reduce((acc, current, index) => {
      if (index === 0) return current;
      return `${acc}${seperator}${current}`;
    }, "");
  }

  reverse() {
    let array = this.data;
    for (let left = 0, right = this.length - 1; left < right; left++, right--) {
      [array[left], array[right]] = [array[right], array[left]];
    }
    return array;
  }

  shift() {
    if (this.length === 0) return undefined;
    let firstElement = this.data[0];
    for (let i = 1; i < this.length; i++) {
      let value = this.data[i];
      this.data[i - 1] = value;
    }
    // weird
    this.length--;
    return firstElement;
  }

  unshift(value) {
    for (let i = 0; i <= this.length; i++) {
      let temp = this.data[i];
      this.data[i] = value;
      value = temp;
    }
    this.length++;
    return this.length;
  }

  slice(startIndex = 0, endIndex = this.length) {
    const result = [];
    for (let index = startIndex; index < endIndex; index++) {
      let element = this.data[index];
      if (index < this.length) {
        result.push(element);
      }
    }
    return result;
  }

  splice(start = 0, deleteCount = 0, ...items) {
    const firstHalf = this.slice(0, start);
    const secondHalf = this.slice(start, this.length);
    const removed = this.slice(start, start + deleteCount);
    let result = [];
    if (items !== undefined) {
      result = firstHalf.concat(items, secondHalf);
    }
    for (let index = 0; index < result.length; index++) {
      this.data[index] = result[index];
    }
    return removed;
  }

  [Symbol.iterator]() {
    let index = 0;
    let array = this.data;
    let length = this.length;
    return {
      next() {
        if (index < length) {
          return {
            done: false,
            value: array[index++],
          };
        }
        return {
          done: true,
        };
      },
    };
  }

  // arr.fill(value[, start[, end]])
  fill(value, startIndex = 0, endIndex = this.length) {
    for (let index = startIndex; index < endIndex; index++) {
      this.data[index] = value;
    }
  }

  keys() {
    let index = 0;
    let length = this.length;
    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (index < length) {
              return {
                done: false,
                value: index++,
              };
            }
            return {
              value: undefined,
              done: true,
            };
          },
        };
      },
    };
  }

  values() {
    let index = 0;
    let array = this.data;
    let length = this.length;
    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (index < length) {
              return {
                done: false,
                value: array[index++],
              };
            }
            return {
              value: undefined,
              done: true,
            };
          },
        };
      },
    };
  }
  // array.entries()
  entries() {
    let index = 0;
    let length = this.length;
    let array = this.data;

    return {
      [Symbol.iterator]() {
        return {
          next() {
            if (index < length) {
              return {
                value: [index, array[index++]],
                done: false,
              };
            }
            return {
              value: undefined,
              done: true,
            };
          },
        };
      },
    };
  }

  // arr.push([element1[, ...[, elementN]]])
  push(...value) {
    for (let index = 0; index < value.length; index++) {
      this.data[this.length++] = value[index];
    }

    return this.length;
  }

  // arrName.pop()
  pop() {
    if (this.length === 0) return undefined;
    const value = this.data[this.length - 1];
    delete this.data[this.length - 1];
    --this.length;
    return value;
  }

  of() {
    let newArray = [...arguments].map((argument) => argument); // The arguments object is not an Array. It is similar, but lacks all Array properties except length. For example, it does not have the pop() method.
    return newArray;
  }

  toString() {
    return this.join();
  }
}

module.exports = { Array };

let ar = new Array([1, 2, 3, 5]);

_ = ar.of(1, 2, "a");
_;
_ = ar.toString();
_;
