const Blog = require("./blog");
const User = require("./user");
const UserReadingList = require("./user_reading_list");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: UserReadingList, as: "readings" });
Blog.belongsToMany(User, { through: UserReadingList, as: "reading_list_user" });

module.exports = {
    User,
    Blog,
    UserReadingList,
};
