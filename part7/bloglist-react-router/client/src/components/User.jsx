import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Subheader from "./Subheader";

const User = () => {
    const match = useMatch("/users/:id");
    const users = [...useSelector((state) => state.user)];

    const user = match
        ? users.find((user) => user.id === match.params.id)
        : null;

    if (!user) {
        return null;
    }

    return (
        <div>
            <Subheader text={user.name} />
            <h3>Blogs created</h3>
            {user.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
            ))}
        </div>
    );
};

export default User;
