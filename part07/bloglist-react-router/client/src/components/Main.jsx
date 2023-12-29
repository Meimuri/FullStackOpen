import { Routes, Route } from "react-router-dom";
import Menubar from "./Menubar";
import BlogList from "./BlogList";
import Blog from "./Blog";
import UserList from "./UserList";
import User from "./User";

const Main = () => {
    return (
        <div>
            <Menubar />

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
