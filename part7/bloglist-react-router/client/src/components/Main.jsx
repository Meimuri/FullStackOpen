import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import BlogList from "./BlogList";
import Blog from "./Blog";
import UserList from "./UserList";
import User from "./User";

const Main = () => {
    return (
        <div>
            <Header text="Blog" />
            <Menu />

            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
        </div>
    );
};

export default Main;
