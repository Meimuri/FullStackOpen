import { Link } from "react-router-dom";

const Menu = () => {
    const padding = {
        padding: 5,
    };

    return (
        <>
            <Link style={padding} to="/">
                Author
            </Link>
            <Link style={padding} to="/books">
                Book
            </Link>
            <Link style={padding} to="/newbook">
                New Book
            </Link>
        </>
    );
};

export default Menu;
