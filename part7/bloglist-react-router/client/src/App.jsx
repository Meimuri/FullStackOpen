import { useSelector, useDispatch } from "react-redux";
import { handleLocalStorageLogin } from "./reducers/loginReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";

import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Main from "./components/Main";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);

    useEffect(() => {
        dispatch(handleLocalStorageLogin());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loginForm = () => <LoginForm />;

    const blogList = () => <Main />;

    return (
        <div>
            <Notification />
            {!user && loginForm()}
            {user && <div>{blogList()}</div>}
        </div>
    );
};

export default App;
