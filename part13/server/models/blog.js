const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.TEXT,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isAfter: {
                    args: ["1600"],
                    msg: "Year must be greater than 1991",
                },
                isBefore: {
                    args: ["2024"],
                    msg: "Year must not be more than the current year",
                },
            },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "blog",
    }
);

module.exports = Blog;
