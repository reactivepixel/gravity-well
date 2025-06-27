const sanity = require("../sanity");

describe("sanity", () => {
  it("should return true", () => {
    expect(sanity()).toBe(true);
  });
});
