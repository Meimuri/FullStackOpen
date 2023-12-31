const router = require("express").Router();

const { Blog } = require("../models");

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post("/", async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        return res.json(blog);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

// Middleware to handle single note to eliminate repetitiveness of finding by ID
const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
};

router.get("/:id", blogFinder, async (req, res) => {
    if (req.blog) {
        res.json(req.blog);
    } else {
        res.status(404).end();
    }
});

router.delete("/:id", blogFinder, async (req, res) => {
    if (req.blog) {
        await req.blog.destroy();
    }
    res.status(204).end();
});

router.put("/:id", blogFinder, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.blog.likes + 1;
        await req.blog.save();
        res.json(req.blog);
    } else {
        res.status(404).end();
    }
});

module.exports = router;
