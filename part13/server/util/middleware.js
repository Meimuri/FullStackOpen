const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Blog, User } = require("../models");

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    // SequelizeConnectionError;
    if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
    } else if (error.name === "SequelizeDatabaseError") {
        return res.status(400).json({ error: "Malformatted id" });
    } else if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
    } else {
        res.status(error.status || 500).json({
            error: error.message || "Internal Server Error",
        });
    }
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        req.token = authorization.replace("bearer ", "");
    } else {
        req.token = null;
    }
    next();
};

const userExtractor = async (req, res, next) => {
    if (req.token) {
        const decodedToken = jwt.verify(req.token.substring(7), SECRET);
        if (!decodedToken.id) {
            return res.status(401).json({ error: "Invalid token" });
        } else {
            const user = await User.findByPk(decodedToken.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            req.user = user;
        }
    } else {
        return res.status(401).json({ error: "Missing token" });
    }
    next();
};

const validateBlog = (req, res, next) => {
    const { author, url, title, year } = req.body;

    if (author && typeof author !== "string") {
        return res.status(400).json({ error: "Author name must be a string" });
    }

    if (!url || typeof url !== "string") {
        return res
            .status(400)
            .json({ error: "Blog URL is required and must be a string" });
    }

    if (!title || typeof title !== "string") {
        return res
            .status(400)
            .json({ error: "Blog title is required and must be a string" });
    }

    if (
        !year ||
        typeof year !== "number" ||
        year < 1600 ||
        year > new Date().getFullYear()
    ) {
        return res.status(400).json({
            error: "Year is required, must be a number, and should be between 1600 and the current year",
        });
    }

    next();
};

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
    } else {
        req.blog = blog;
        next();
    }
};

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
    validateBlog,
    blogFinder,
};
