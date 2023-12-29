import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Header from "./Header";

const BlogList = () => {
    const user = useSelector((state) => state.login);
    const blogs = [...useSelector((state) => state.blog)];

    return (
        <div>
            <Header text="Blogs" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Togglable buttonLabel="New Blog">
                        <BlogForm />
                    </Togglable>
                    <ul role="list" className="divide-y divide-gray-200">
                        {blogs.map((blog) => (
                            <li
                                key={blog.id}
                                className="flex justify-between gap-x-6 py-5"
                            >
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            <Link to={`/blogs/${blog.id}`}>
                                                {blog.title}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default BlogList;
