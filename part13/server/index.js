const express = require("express");
require("express-async-errors");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./util/middleware");

app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
