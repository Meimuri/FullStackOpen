const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

const User = require("../models/user");

describe("When there is initially one user in db", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({ username: "root", passwordHash });

        await user.save();
    }, 100000);

    test("Creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "admin",
            name: "Michael Alcaraz II",
            password: "password",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map((u) => u.username);
        expect(usernames).toContain(newUser.username);
    }, 100000);

    test("Creation fails with proper statuscode and message if username already taken", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "root",
            name: "Michael Alcaraz II",
            password: "password",
        };

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(result.body.error).toContain("expected `username` to be unique");

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    }, 100000);

    test("Creating a user with username/password that is less than 3 characters should respond with status code 400", async () => {
        const newUser = {
            username: "Joh",
            name: "John Doe",
            password: "12",
        };

        await api.post("/api/users").send(newUser).expect(400);
    }, 100000);
});

afterAll(async () => {
    await mongoose.connection.close();
});
