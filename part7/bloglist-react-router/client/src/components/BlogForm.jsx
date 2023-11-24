// import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { Form, Field } from "react-final-form";

const BlogForm = () => {
    const dispatch = useDispatch();
    // const blogFormRef = useRef();
    const user = useSelector((state) => state.login);

    const onSubmit = async (event) => {
        dispatch(createBlog(event, user));
        // Save the toggleVisibility on store
        // blogFormRef.current.toggleVisibility();
    };

    return (
        <div>
            <h2>Add new blog</h2>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine }) => (
                    <form
                        onSubmit={async (event) => {
                            await handleSubmit(event);
                            form.reset();
                        }}
                    >
                        <div>
                            <label>Title</label>
                            <Field
                                name="title"
                                component="input"
                                type="text"
                                placeholder="Title"
                            />
                        </div>
                        <div>
                            <label>Author</label>
                            <Field
                                name="author"
                                component="input"
                                type="text"
                                placeholder="Author"
                            />
                        </div>
                        <div>
                            <label>Url</label>
                            <Field
                                name="url"
                                component="input"
                                type="text"
                                placeholder="Url"
                            />
                        </div>
                        <button
                            id="save-button"
                            type="submit"
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
