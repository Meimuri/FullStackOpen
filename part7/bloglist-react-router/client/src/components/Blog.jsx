import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import Subheader from "./Subheader";
import Button from "./Button";

const Blog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch("/blogs/:id");

    const user = useSelector((state) => state.login);
    const blogs = [...useSelector((state) => state.blog)];

    const blog = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null;

    if (!blog) {
        return null;
    }

    const isAuthor =
        blog.user.username.toString() === user.username.toString()
            ? true
            : false;

    const handleLikeBlog = (blog) => {
        dispatch(likeBlog(blog));
    };

    const handleDeleteBlog = (blog) => {
        if (
            window.confirm(
                `Are you sure you want to delete "${blog.title}" by ${blog.author}?`,
            )
        ) {
            dispatch(deleteBlog(blog, user));
            navigate("/");
        }
    };

    return (
        <div>
            <Subheader text={blog.title} />
            <a href={blog.url}>{blog.url}</a>
            <p>
                <span>Likes:</span> {blog.likes}
                <Button label="Like" onClick={() => handleLikeBlog(blog)} />
            </p>
            <p>
                Added by <b>{blog.user.name}</b>
            </p>
            {isAuthor && (
                <p>
                    <Button
                        label="Delete"
                        onClick={() => handleDeleteBlog(blog)}
                    />
                </p>
            )}
        </div>
    );
};

export default Blog;
