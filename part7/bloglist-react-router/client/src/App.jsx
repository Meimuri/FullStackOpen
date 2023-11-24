import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [notification, setNotification] = useState([]);
    const [user, setUser] = useState(null);
    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleNotification = (message, type) => {
        const notificationObject = {
            message,
            type,
        };

        setNotification(notificationObject);
        setTimeout(() => {
            setNotification([]);
        }, 5000);
    };

    const handleLogin = async ({ username, password }) => {
        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user),
            );

            blogService.setToken(user.token);
            setUser(user);
        } catch (exception) {
            handleNotification("Wrong credentials", "error");
            console.log(exception);
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogappUser");
        setUser(null);
    };

    const handleAddBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility();
        blogService.create(blogObject).then((returnedBlog) => {
            handleNotification(
                `A new blog "${blogObject.title}" by ${blogObject.author} added!`,
                "success",
            );

            const blogUser = {
                username: user.username,
                name: user.name,
                id: returnedBlog.user,
            };

            const newBlog = { ...returnedBlog, user: blogUser };
            setBlogs(blogs.concat(newBlog));
        });
    };

    const handleLikeBlog = (id) => {
        blogService
            .update(id)
            .then((returnedBlog) => {
                setBlogs(
                    blogs.map((blog) => {
                        if (blog.id !== id) {
                            return blog;
                        } else {
                            return {
                                ...blog,
                                likes: returnedBlog.likes,
                            };
                        }
                    }),
                );
            })
            .catch((error) => {
                handleNotification(
                    "Blog was already removed from server",
                    "error",
                );
            });
    };

    const handleDeleteBlog = (blog) => {
        if (
            window.confirm(
                `Are you sure you want to delete blog "${blog.title}"?`,
            )
        ) {
            blogService
                .remove(blog.id)
                .then(() => {
                    setBlogs(blogs.filter((n) => n.id !== blog.id));
                    handleNotification(`"${blog.title}" deleted`, "success");
                })
                .catch(() => {
                    handleNotification(
                        `"${blog.title}" was already deleted`,
                        "error",
                    );
                });
        }
    };

    const loginForm = () => <LoginForm login={handleLogin} />;

    const blogList = () => (
        <Blog
            blogs={blogs}
            user={user}
            handleAddBlog={handleAddBlog}
            handleLikeBlog={handleLikeBlog}
            handleDeleteBlog={handleDeleteBlog}
            blogFormRef={blogFormRef}
            handleLogout={handleLogout}
        />
    );

    return (
        <div>
            <Notification notification={notification} />
            {!user && loginForm()}
            {user && <div>{blogList()}</div>}
        </div>
    );
};

export default App;
