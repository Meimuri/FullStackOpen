const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const config = require("./utils/config");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
require("dotenv").config();

const MONGODB_URI = config.MONGODB_URI;

console.log("Connecting to", MONGODB_URI);

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connection to MongoDB:", error.message);
    });

const typeDefs = `
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int!
	}

	type Query {
		bookCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		uniqueGenres: [String]
		me: User
	}

	type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book

		editAuthor(name: String!, setBornTo: Int!): Author

		createUser(
			username: String!
			favoriteGenre: String!
		): User

		login(
			username: String!
			password: String!
		): Token 

    }
`;

const resolvers = {
    Query: {
        allBooks: async (root, args) => {
            const filter = {};

            if (args.author) {
                const author = await Author.findOne({ name: args.author });
                filter.author = author ? author._id : null;
            }

            if (args.genre) {
                filter.genres = args.genre;
            }

            const books = await Book.find(filter).populate("author");
            return books.map((book) => ({
                title: book.title,
                published: book.published,
                author: {
                    name: book.author.name,
                    born: book.author.born,
                    bookCount: book.author.books.length,
                },
                id: book._id,
                genres: book.genres,
            }));
        },
        allAuthors: async () => {
            const authors = await Author.find({}).populate("books");
            return authors.map((author) => {
                const bookCount = author.books.length;
                return {
                    name: author.name,
                    born: author.born,
                    bookCount: bookCount,
                };
            });
        },
        uniqueGenres: async () => {
            const uniqueGenres = await Book.distinct("genres");
            return uniqueGenres;
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            try {
                let author = await Author.findOne({ name: args.author });

                if (!author) {
                    author = new Author({ name: args.author });
                    await author.save();
                }

                const book = new Book({
                    title: args.title,
                    published: args.published,
                    author: author._id,
                    genres: args.genres,
                });

                await book.save();
                author.books.push(book._id);
                await author.save();

                const populatedBook = await Book.findById(book._id).populate(
                    "author"
                );

                return populatedBook;
            } catch (error) {
                if (error.name === "ValidationError") {
                    const errorMessage = Object.values(error.errors)
                        .map((err) => err.message)
                        .join(", ");
                    throw new GraphQLError(`Validation Error: ${errorMessage}`);
                } else {
                    console.error("Error adding book:", error);
                    throw new GraphQLError("Failed to add book");
                }
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            try {
                const updatedAuthor = await Author.findOneAndUpdate(
                    { name: args.name },
                    { $set: { born: args.setBornTo } },
                    { new: true }
                );

                if (!updatedAuthor) {
                    throw new GraphQLError("Author not found");
                }

                return updatedAuthor;
            } catch (error) {
                console.error("Error editing author:", error.message);
                throw new GraphQLError("Failed to edit author");
            }
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            });

            return user.save().catch((error) => {
                throw new GraphQLError("Creating the user failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error,
                    },
                });
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "secret") {
                throw new GraphQLError("Wrong credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, config.JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        try {
            const auth = req ? req.headers.authorization : null;

            if (auth && auth.startsWith("Bearer ")) {
                const token = auth.substring(7);
                const decodedToken = jwt.verify(token, config.JWT_SECRET);
                const currentUser = await User.findById(decodedToken.id);

                if (!currentUser) {
                    console.error("User not found in the database");
                }

                return { currentUser };
            }
        } catch (error) {
            console.error("Error in context function:", error.message);
        }

        return {};
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
