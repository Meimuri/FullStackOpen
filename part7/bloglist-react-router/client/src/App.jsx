import { useSelector, useDispatch } from "react-redux";
import { handleLocalStorageLogin } from "./reducers/loginReducer";
import { initializeBlogs } from "./reducers/blogReducer";

import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
// import blogService from "./services/blogs";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);

    // const [blogs, setBlogs] = useState([]);
    // const blogFormRef = useRef();

    useEffect(() => {
        dispatch(handleLocalStorageLogin());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(initializeBlogs());
        // blogService.getAll().then((blogs) => setBlogs(blogs));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const handleLikeBlog = (id) => {
    //     blogService
    //         .update(id)
    //         .then((returnedBlog) => {
    //             setBlogs(
    //                 blogs.map((blog) => {
    //                     if (blog.id !== id) {
    //                         return blog;
    //                     } else {
    //                         return {
    //                             ...blog,
    //                             likes: returnedBlog.likes,
    //                         };
    //                     }
    //                 }),
    //             );
    //         })
    //         .catch((error) => {
    //             handleNotification(
    //                 "Blog was already removed from server",
    //                 "error",
    //             );
    //         });
    // };

    // const handleDeleteBlog = (blog) => {
    //     if (
    //         window.confirm(
    //             `Are you sure you want to delete blog "${blog.title}"?`,
    //         )
    //     ) {
    //         blogService
    //             .remove(blog.id)
    //             .then(() => {
    //                 setBlogs(blogs.filter((n) => n.id !== blog.id));
    //                 handleNotification(`"${blog.title}" deleted`, "success");
    //             })
    //             .catch(() => {
    //                 handleNotification(
    //                     `"${blog.title}" was already deleted`,
    //                     "error",
    //                 );
    //             });
    //     }
    // };

    const loginForm = () => <LoginForm />;

    const blogList = () => <Blog />;

    return (
        <div>
            <Notification />
            {!user && loginForm()}
            {user && <div>{blogList()}</div>}
        </div>
    );
};

export default App;
