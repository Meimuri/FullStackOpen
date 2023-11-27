import { useSelector } from "react-redux";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import Subheader from "./Subheader";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogContent from "./BlogContent";
import Welcome from "./Welcome";

const Blog = () => {
    const user = useSelector((state) => state.login);
    const blogs = [...useSelector((state) => state.blog)];

    return (
        <div>
            <Header text="Blog" />
            <Welcome />
            <Togglable buttonLabel="New Blog">
                <BlogForm />
            </Togglable>
            <Subheader text="Blog list" />
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <BlogContent key={blog.id} blog={blog} user={user} />
                ))}
        </div>
    );
};

export default Blog;
