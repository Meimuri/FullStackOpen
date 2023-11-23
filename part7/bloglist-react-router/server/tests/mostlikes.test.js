const listHelper = require("../utils/list_helper");

describe("Author with most likes", () => {
    const authorWithMostLikes = [
        {
            author: "Edsger W. Dijkstra",
            likes: 17,
        },
    ];

    const listWithMultiBlog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 5,
            __v: 0,
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 8,
            __v: 0,
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 9,
            __v: 0,
        },
    ];

    test("is returned correctly", () => {
        const result = listHelper.mostLikes(listWithMultiBlog);
        expect(result).toEqual(authorWithMostLikes);
    });
});
