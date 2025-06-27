const sanity = require("../utils/sanity");

describe("sanity", () => {
  it("should return true", () => {
    expect(sanity(true)).toBe(false);
  });
});
