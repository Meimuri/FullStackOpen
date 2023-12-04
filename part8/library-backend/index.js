const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const config = require("./utils/config");
const Book = require("./models/book");
const Author = require("./models/author");
require("dotenv").config();

const MONGODB_URI = config.MONGODB_URI;

console.log("connecting to", config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });

let authors = [
    {
        name: "Robert Martin",
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: "Martin Fowler",
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963,
    },
    {
        name: "Fyodor Dostoevsky",
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821,
    },
    {
        name: "Joshua Kerievsky",
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: "Sandi Metz",
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
];

let books = [
    {
        title: "Clean Code",
        published: 2008,
        author: "Robert Martin",
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"],
    },
    {
        title: "Agile software development",
        published: 2002,
        author: "Robert Martin",
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ["agile", "patterns", "design"],
    },
    {
        title: "Refactoring, edition 2",
        published: 2018,
        author: "Martin Fowler",
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"],
    },
    {
        title: "Refactoring to patterns",
        published: 2008,
        author: "Joshua Kerievsky",
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "patterns"],
    },
    {
        title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
        published: 2012,
        author: "Sandi Metz",
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "design"],
    },
    {
        title: "Crime and punishment",
        published: 1866,
        author: "Fyodor Dostoevsky",
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "crime"],
    },
    {
        title: "The Demon",
        published: 1872,
        author: "Fyodor Dostoevsky",
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "revolution"],
    },
];

/*
  you can remove the placeholder query once your first one has been implemented
*/

const typeDefs = `
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
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
		editAuthor(name: String!, setBornTo: Int!): Author
    }
`;

const resolvers = {
    Query: {
        // bookCount: async () => {
        //     const count = await Book.countDocuments();
        //     return count;
        // },
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            let filter = books;

            if (args.author) {
                filter = filter.filter((book) => book.author === args.author);
            }

            if (args.genre) {
                filter = filter.filter((book) =>
                    book.genres.includes(args.genre)
                );
            }

            return filter;
        },
        allAuthors: async () => {
            // return authors.map((author) => {
            //     const booksByAuthor = books.filter(
            //         (book) => book.author === author.name
            //     );
            //     const born = author.born !== undefined ? author.born : null;

            //     const bookCount = booksByAuthor.length;

            //     return {
            //         name: author.name,
            //         born,
            //         bookCount,
            //     };
            // });
            // return Author.find({});
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
    },
    Mutation: {
        addBook: async (root, args) => {
            // const foundAuthor = authors.find(
            //     (author) => author.name === args.author
            // );

            // if (!foundAuthor) {
            //     const newAuthor = {
            //         name: args.author,
            //         id: uuid(),
            //     };

            //     authors = authors.concat(newAuthor);
            // }

            // const book = { ...args, id: uuid() };

            // books = books.concat(book);

            // return book;
            // let author = await Author.findOne({ name: args.author });

            // if (!author) {
            //     author = new Author({
            //         name: args.author,
            //     });
            //     await author.save();
            // }

            // const book = new Book({
            //     ...args,
            //     author: author,
            // });
            // await book.save();

            // author.books.push(book);
            // await author.save();

            // return book;
            try {
                let author;

                if (!args.author) {
                    throw new Error("Author name is required.");
                }

                // Check if the author already exists in the database
                author = await Author.findOne({ name: args.author });

                if (!author) {
                    // If not, create a new author
                    author = new Author({
                        name: args.author,
                    });
                    await author.save();
                }

                // Create a new book and save it to the database
                const book = new Book({
                    ...args,
                    author: author._id,
                });

                await book.save();

                // Update the author's books array
                // author.books.push(book);
                // await author.save();

                return book;
            } catch (error) {
                console.error(error);
                throw new Error("An error occurred while adding the book.");
            }
        },
        editAuthor: (root, args) => {
            const authorToEdit = authors.find(
                (author) => author.name === args.name
            );

            if (!authorToEdit) {
                return null;
            }

            authorToEdit.born = args.setBornTo;
            const { name, born } = authorToEdit;

            return {
                name,
                born,
            };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    // context: async ({ req, res }) => {
    //     const auth = req ? req.headers.authorization : null;
    //     if (auth && auth.startsWith("Bearer ")) {
    //         const decodedToken = jwt.verify(
    //             auth.substring(7),
    //             config.JWT_SECRET
    //         );
    //         const currentUser = await User.findById(decodedToken.id).populate(
    //             "friends"
    //         );
    //         return { currentUser };
    //     }
    // },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
