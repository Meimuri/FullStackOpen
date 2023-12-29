import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

const Menu = ({ token, setToken }) => {
    const padding = {
        padding: 5,
    };

    const client = useApolloClient();

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    return (
        <>
            <Link style={padding} to="/">
                Author
            </Link>
            <Link style={padding} to="/books">
                Book
            </Link>

            {token ? (
                <>
                    <Link style={padding} to="/recommendations">
                        Recommendations
                    </Link>
                    <Link style={padding} to="/newbook">
                        New Book
                    </Link>
                    <Link style={padding} onClick={logout} to="/">
                        Logout
                    </Link>
                </>
            ) : (
                <Link style={padding} to="/login">
                    Login
                </Link>
            )}
        </>
    );
};

export default Menu;
