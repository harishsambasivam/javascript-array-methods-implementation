const { Array } = require("./arrayes6.js");

jest.mock("./arrayes6.js");

describe("#constructor", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Array.mockClear();
  });

  it("is Array Constructor called already?", () => {
    expect(Array).toHaveBeenCalledTimes(0);
  });

  it("throws error for passing non integer or array to Array constructor", () => {
    function array() {
      throw new TypeError("constructor only accepts number or array");
    }
    expect(array).toThrowError(
      new TypeError("constructor only accepts number or array")
    );
  });
});

describe("#forEach", () => {
  const array = new Array([1, 2, 3]);

  array.foreach((e) => console.log(e));
});
