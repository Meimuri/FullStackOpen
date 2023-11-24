import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import Button from "./Button";

const BlogContent = ({ blog, user }) => {
    const dispatch = useDispatch();

    const [isActive, setIsActive] = useState(false);
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
        }
    };

    return (
        <div className="blog">
            <div>
                <span className="title">{blog.title}</span> by{" "}
                <span className="author">{blog.author}</span>
                {isActive ? (
                    <>
                        <p>
                            <a href={blog.url}>{blog.url}</a>
                        </p>
                        <p>
                            <span>Likes:</span> {blog.likes}
                            <Button
                                label="Like"
                                onClick={() => handleLikeBlog(blog)}
                            />
                        </p>
                        <p>{blog.user.name}</p>
                        {isAuthor && (
                            <p>
                                <Button
                                    label="Delete"
                                    onClick={() => handleDeleteBlog(blog)}
                                />
                            </p>
                        )}
                        <button onClick={() => setIsActive(false)}>Hide</button>
                    </>
                ) : (
                    <button onClick={() => setIsActive(true)}>View</button>
                )}
            </div>
        </div>
    );
};

export default BlogContent;
