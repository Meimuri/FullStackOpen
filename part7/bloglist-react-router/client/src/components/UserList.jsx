import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import BlogContent from "./BlogContent";
import Subheader from "./Subheader";

const UserList = () => {
    // const user = useSelector((state) => state.login);
    const users = [...useSelector((state) => state.user)];

    return (
        <div>
            <Subheader text="Users" />
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
