import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog, createComment } from "../reducers/blogReducer";
import { Form, Field } from "react-final-form";
import Header from "./Header";
import Button from "./Button";

const Blog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blogID = useMatch("/blogs/:id");

    const user = useSelector((state) => state.login);
    const blogs = [...useSelector((state) => state.blog)];

    const blog = blogID
        ? blogs.find((blog) => blog.id === blogID.params.id)
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

    const onSubmit = async (event) => {
        dispatch(createComment(event, blogID.params.id));
    };

    return (
        <div>
            <Header text={blog.title} />
            <div className="mt-6 px-4 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-1 sm:grid sm:grid-cols-8 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Link:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <a
                                href={blog.url}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                {blog.url}
                            </a>
                        </dd>
                    </div>
                    <div className="px-4 py-1 sm:grid sm:grid-cols-8 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Likes:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {blog.likes}
                        </dd>
                    </div>
                    <div className="px-4 py-1 sm:grid sm:grid-cols-8 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Author:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {blog.author}
                        </dd>
                    </div>
                    <div className="px-4 py-1 sm:grid sm:grid-cols-8 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Added By:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {blog.user.name}
                        </dd>
                    </div>
                </dl>
            </div>
            <div className="px-4 py-4">
                <h1 className="text-1xl font-bold tracking-tight text-gray-900">
                    Comments
                </h1>
                <div>
                    <Form
                        onSubmit={onSubmit}
                        render={({
                            handleSubmit,
                            form,
                            submitting,
                            pristine,
                        }) => (
                            <form
                                onSubmit={async (event) => {
                                    await handleSubmit(event);
                                    form.reset();
                                }}
                            >
                                <div>
                                    <Field
                                        name="comment"
                                        component="input"
                                        type="text"
                                        placeholder=""
                                        className="w-80 rounded-lg border-0 px-5 py-1.5 me-2 mb-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <button
                                        id="save-button"
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        disabled={submitting || pristine}
                                    >
                                        Add comment
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                </div>
                <ul role="list">
                    {blog.comments.map((comment, i) => (
                        <li
                            key={i}
                            className="flex justify-between gap-x-6 py-1"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        - {comment}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="px-4">
                {isAuthor && (
                    <>
                        <button
                            type="button"
                            onClick={() => handleDeleteBlog(blog)}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                            Delete
                        </button>
                    </>
                )}
                <button
                    type="button"
                    onClick={() => handleLikeBlog(blog)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Like
                </button>
            </div>
        </div>
    );
};

export default Blog;
