import { useState } from "react";
import Button from "./Button";

const BlogContent = ({ blog, user, handleLike, handleDelete }) => {
    const [isActive, setIsActive] = useState(false);
    const isAuthor =
        blog.user.username.toString() === user.username.toString()
            ? true
            : false;
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
                            <Button label="Like" onClick={handleLike} />
                        </p>
                        <p>{blog.user.name}</p>
                        {isAuthor && (
                            <p>
                                <Button label="Delete" onClick={handleDelete} />
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
