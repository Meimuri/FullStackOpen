import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../reducers/loginReducer";

import Button from "./Button";

const Welcome = () => {
    const login = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const onClickLogout = async (event) => {
        dispatch(handleLogout(event));
    };

    return (
        <>
            {`${login.name} logged in `}
            <Button label="Logout" onClick={onClickLogout} />
        </>
    );
};

export default Welcome;
