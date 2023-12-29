import Header from "./Header";
import Subheader from "./Subheader";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogContent from "./BlogContent";
import Welcome from "./Welcome";
import PropTypes from "prop-types";

const Blog = ({
    blogs,
    user,
    handleAddBlog,
    handleLikeBlog,
    handleDeleteBlog,
    blogFormRef,
    handleLogout,
}) => {
    return (
        <div>
            <Header text="Blog" />
            <Welcome user={user} handleLogout={handleLogout} />
            <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                <BlogForm handleAddBlog={handleAddBlog} />
            </Togglable>
            <Subheader text="Blog list" />
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <BlogContent
                        key={blog.id}
                        blog={blog}
                        user={user}
                        handleLike={() => handleLikeBlog(blog.id)}
                        handleDelete={() => handleDeleteBlog(blog)}
                    />
                ))}
        </div>
    );
};

Blog.propTypes = {
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    handleAddBlog: PropTypes.func.isRequired,
    handleLikeBlog: PropTypes.func.isRequired,
    handleDeleteBlog: PropTypes.func.isRequired,
    blogFormRef: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default Blog;
