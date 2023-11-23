const listHelper = require("../utils/list_helper");

test("Dummy data returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});
