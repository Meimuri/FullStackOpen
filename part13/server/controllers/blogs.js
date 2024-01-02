const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { Blog, User } = require("../models");

const { SECRET } = require("../util/config");

const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            console.log(authorization.substring(7));
            console.log(SECRET);
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: "Invalid token" });
        }
    } else {
        return res.status(401).json({ error: "Missing token" });
    }

    next();
};

const validateBlog = (req, res, next) => {
    const { author, url, title } = req.body;

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

    next();
};

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post("/", tokenExtractor, validateBlog, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id);
    const savedBlog = await Blog.create({
        ...req.body,
        userId: user.id,
    });
    res.status(201).json(savedBlog);
});

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
    } else {
        req.blog = blog;
        next();
    }
};

router.get("/:id", blogFinder, async (req, res) => {
    res.json(req.blog);
});

router.delete("/:id", blogFinder, async (req, res) => {
    await req.blog.destroy();
    res.status(204).end();
});

router.put("/:id", blogFinder, async (req, res) => {
    req.blog.likes = req.blog.likes + 1;
    await req.blog.save();
    res.json(req.blog);
});

module.exports = router;
