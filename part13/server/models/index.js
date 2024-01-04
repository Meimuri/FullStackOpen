const Blog = require("./blog");
const User = require("./user");
const UserReadingList = require("./user_reading_list");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: UserReadingList, as: "readings" });

module.exports = {
    User,
    Blog,
    UserReadingList,
};
