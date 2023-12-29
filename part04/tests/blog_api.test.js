const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const Blog = require("../models/blog");

let token = "";

beforeAll(async () => {
    await User.updateMany({}, { $unset: { blogs: 1 } });
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
}, 100000);

beforeEach(async () => {
    // Delete user then create a new one
    // await Blog.deleteMany({});
    const user = {
        username: "admin",
        password: "password",
    };

    const response = await api.post("/api/login").send(user);
    token = response.body.token;
}, 100000);

describe("When there is initially some notes saved", () => {
    test("Correct number of blogs are returned", async () => {
        const response = await api.get("/api/blogs");

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    }, 100000);

    test("Unique identifier property is named id", async () => {
        const response = await api.get("/api/blogs");
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined();
        });
    }, 100000);
});

describe("Addition of a new blog", () => {
    test("Creating a new blog", async () => {
        const newBlog = {
            title: "This is a sample blog",
            author: "John Doe",
            url: "www.google.com",
            likes: 389,
        };

        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        const contents = blogsAtEnd.map((n) => n.title);
        expect(contents).toContain("This is a sample blog");
    }, 100000);

    test("Creating a new blog without a token should respond with status code 401", async () => {
        const newBlog = {
            title: "This is a sample blog",
            author: "John Doe",
            url: "www.google.com",
            likes: 389,
        };

        await api.post("/api/blogs").send(newBlog).expect(401);
    }, 100000);

    test("Defaults to 0 if likes property is missing from the request", async () => {
        const newNoLikeBlog = {
            title: "Blog with missing likes",
            author: "John Doe",
            url: "www.google.com",
        };

        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(newNoLikeBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        const like = blogsAtEnd.map((n) => n.likes);
        expect(like).toContain(0);
    }, 100000);

    test("Create new blog without title and/or url should respond with status code 400", async () => {
        const newIncompleteBlog = {
            author: "John Doe",
            likes: 389,
        };

        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(newIncompleteBlog)
            .expect(400);
    }, 100000);
});

describe("Updating a blog", () => {
    test("Succeeds if data is valid", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];

        await api.put(`/api/blogs/${blogToUpdate.id}`);

        const blogsAtEnd = await helper.blogsInDb();

        const like = blogsAtEnd.map((n) => n.likes);
        expect(like).toContain(blogToUpdate.likes);
    }, 100000);
});

describe("Deletion of a blog", () => {
    test("Succeeds with status code 204 if id is valid", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[3];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        const contents = blogsAtEnd.map((r) => r.title);
        expect(contents).not.toContain(blogToDelete.title);
    }, 100000);

    test("Deleting a blog without a token should respond with status code 401", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);
    }, 100000);
});

afterAll(async () => {
    await mongoose.connection.close();
});
