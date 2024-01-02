const router = require("express").Router();
const { Op } = require("sequelize");
const { Blog, User } = require("../models");

const {
    userExtractor,
    validateBlog,
    blogFinder,
} = require("../util/middleware");

router.get("/", async (req, res) => {
    const where = {};

    if (req.query.search) {
        where.title = {
            [Op.substring]: req.query.search,
        };
    }

    const blogs = await Blog.findAll({
        include: {
            model: User,
            attributes: { exclude: ["password"] },
        },
        attributes: {
            exclude: ["userId"],
        },
        where,
    });
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
