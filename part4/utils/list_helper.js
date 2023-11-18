const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.length == 0 ? 0 : blogs.reduce((acc, o) => acc + o.likes, 0);
};

const favoriteBlog = (blogs) => {
    const result = [];

    result.push(
        blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog))
    );
    return result;
};

const mostBlog = (blogs) => {
    const result = [];
    const arr = _(blogs)
        .groupBy("author")
        .map((objs, key) => ({
            author: key,
            blogs: objs.length,
        }))
        .value();
    result.push(arr.reduce((max, res) => (max.blogs > res.blogs ? max : res)));
    return result;
};

const mostLikes = (blogs) => {
    const result = [];
    const arr = _(blogs)
        .groupBy("author")
        .map((objs, key) => ({
            author: key,
            likes: _.sumBy(objs, "likes"),
        }))
        .value();
    result.push(arr.reduce((max, res) => (max.likes > res.likes ? max : res)));
    return result;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes,
};
