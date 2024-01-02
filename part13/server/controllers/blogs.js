const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { Blog } = require("../models");

const {
    userExtractor,
    validateBlog,
    blogFinder,
} = require("../util/middleware");

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post("/", userExtractor, validateBlog, async (req, res) => {
    const savedBlog = await Blog.create({
        ...req.body,
        userId: req.user.id,
    });
    res.status(201).json(savedBlog);
});

router.get("/:id", blogFinder, async (req, res) => {
    res.json(req.blog);
});

router.delete("/:id", userExtractor, blogFinder, async (req, res) => {
    if (req.blog.userId === req.user.id) {
        await req.blog.destroy();
        res.status(204).end();
    } else {
        res.status(401).json({
            error: "You cannot delete blogs that you didn't create",
        });
    }
});

router.put("/:id", blogFinder, async (req, res) => {
    req.blog.likes = req.blog.likes + 1;
    await req.blog.save();
    res.json(req.blog);
});

module.exports = router;
