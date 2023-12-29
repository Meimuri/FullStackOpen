import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { Form, Field } from "react-final-form";

const BlogForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);

    const onSubmit = async (event) => {
        dispatch(createBlog(event, user));
    };

    return (
        <div className="mt-10">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Add new blog
            </h1>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine }) => (
                    <form
                        className="space-y-3"
                        onSubmit={async (event) => {
                            await handleSubmit(event);
                            form.reset();
                        }}
                    >
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Title
                            </label>
                            <div className="mt-2">
                                <Field
                                    name="title"
                                    component="input"
                                    type="text"
                                    placeholder="Title"
                                    className="block w-80 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="author"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Author
                            </label>
                            <div className="mt-2">
                                <Field
                                    name="author"
                                    component="input"
                                    type="text"
                                    placeholder="Author"
                                    className="block w-80 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="url"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Url
                            </label>
                            <div className="mt-2">
                                <Field
                                    name="url"
                                    component="input"
                                    type="text"
                                    placeholder="Url"
                                    className="block w-80 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <button
                            id="save-button"
                            type="submit"
                            className="flex w-80 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={submitting || pristine}
                        >
                            Save
                        </button>
                    </form>
                )}
            />
        </div>
    );
};

export default BlogForm;
