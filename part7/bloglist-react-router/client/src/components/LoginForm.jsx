import { useDispatch } from "react-redux";
import { handleLogin } from "../reducers/loginReducer";

import { Form, Field } from "react-final-form";

const LoginForm = () => {
    const dispatch = useDispatch();

    const onSubmit = async (event) => {
        dispatch(handleLogin(event));
    };

    return (
        <div>
            <h2>Login to app</h2>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username</label>
                            <Field
                                name="username"
                                component="input"
                                type="text"
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <Field
                                name="password"
                                component="input"
                                type="password"
                            />
                        </div>
                        <button type="submit" disabled={submitting || pristine}>
                            Login
                        </button>
                    </form>
                )}
            />
        </div>
    );
};

export default LoginForm;
