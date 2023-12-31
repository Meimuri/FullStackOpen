const router = require("express").Router();

const { Blog } = require("../models");

const validateBlog = (req, res, next) => {
    const { author, url, title } = req.body;
    // Check if url and title are provided and are strings
    if (!url || typeof url !== "string") {
        return res
            .status(400)
            .json({ error: "Url is required and must be a string" });
    }
    if (!title || typeof title !== "string") {
        return res
            .status(400)
            .json({ error: "Title is required and must be a string" });
    }

    // Check if author is a string if provided
    if (author && typeof author !== "string") {
        return res.status(400).json({ error: "Author must be a string" });
    }
    next();
};

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post("/", validateBlog, async (req, res, next) => {
    await Blog.create(req.body)
        .then((savedBlog) => {
            res.status(201).json(savedBlog);
        })
        .catch((error) => next(error));
});

// Middleware to handle single note to eliminate repetitiveness of finding by ID
const blogFinder = async (req, res, next) => {
    await Blog.findByPk(req.params.id)
        .then((blog) => {
            if (blog) {
                req.blog = blog;
                next();
            } else {
                return res.status(404).json({
                    error: "Blog not found",
                });
            }
        })
        .catch((error) => next(error));
};

router.get("/:id", blogFinder, async (req, res) => {
    res.json(req.blog);
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
