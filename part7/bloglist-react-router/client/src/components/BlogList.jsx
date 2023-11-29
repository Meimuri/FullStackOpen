import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Subheader from "./Subheader";

const BlogList = () => {
    const user = useSelector((state) => state.login);
    const blogs = [...useSelector((state) => state.blog)];

    return (
        <div>
            <Togglable buttonLabel="New Blog">
                <BlogForm />
            </Togglable>
            <Subheader text="Blog list" />
            {blogs.map((blog) => (
                <div className="blog" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
