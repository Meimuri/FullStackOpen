import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";

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
            <Header text={user.name} />
            <main>
                <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        Blogs Created
                                    </p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900"></p>
                            </div>
                        </li>
                        {user.blogs.map((blog) => (
                            <li
                                key={blog.id}
                                className="flex justify-between gap-x-6 py-5"
                            >
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm leading-6 text-gray-900">
                                            {blog.title}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900"></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default User;
