const sanity = require("../src/utils/sanity");

describe("sanity", () => {
  it("should return true", () => {
    expect(sanity(true)).toBe(true);
  });
});
