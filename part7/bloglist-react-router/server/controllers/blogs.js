const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
    const body = request.body;
    const user = request.user;

    if (!body.title || !body.url) {
        response.status(400).end();
    } else {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: request.user.id,
        });

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(savedBlog);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        {
            $inc: {
                likes: 1,
            },
        },
        {
            new: true,
        }
    );
    response.json(updatedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === request.user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } else {
        response
            .status(401)
            .json({ error: "You cannot delete blogs that you didn't create" });
    }
});

module.exports = blogsRouter;
