import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";

const UserList = () => {
    const users = [...useSelector((state) => state.user)];

    return (
        <div>
            <Header text="Users" />
            <main>
                <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900"></p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">
                                    Blogs Created
                                </p>
                            </div>
                        </li>
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className="flex justify-between gap-x-6 py-5"
                            >
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            <Link to={`/users/${user.id}`}>
                                                {user.name}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">
                                        {user.blogs.length}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default UserList;
