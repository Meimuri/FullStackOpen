import { Link } from "react-router-dom";
import Welcome from "./Welcome";

const Menu = ({ text }) => {
    const padding = {
        padding: 5,
    };

    return (
        <div>
            <Link style={padding} to="/">
                Home
            </Link>
            <Link style={padding} to="/users">
                Users
            </Link>
            <Welcome />
        </div>
    );
};

export default Menu;
