const User = require("../models/user");
const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "HTML is easy",
        author: "John Doe",
        url: "www.google.com",
        likes: 173,
        user: "6539b81ea3e427f049225c8a",
    },
    {
        title: "CSS is easy",
        author: "John Doe",
        url: "www.google.com",
        likes: 389,
        user: "6539b81ea3e427f049225c8a",
    },
];

const nonExistingId = async () => {
    const blog = new Blog({ title: "willremovethissoon" });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((u) => u.toJSON());
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    usersInDb,
    blogsInDb,
};
