const express = require("express");
require("express-async-errors");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");
const authorsRouter = require("./controllers/authors");
const readingListRouter = require("./controllers/reading_list");
const middleware = require("./util/middleware");

app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglist", readingListRouter);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
