const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

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
		author: String!
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
        bookCount: () => books.length,
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
        allAuthors: () => {
            return authors.map((author) => {
                const booksByAuthor = books.filter(
                    (book) => book.author === author.name
                );
                const born = author.born !== undefined ? author.born : null;

                const bookCount = booksByAuthor.length;

                return {
                    name: author.name,
                    born,
                    bookCount,
                };
            });
        },
    },
    Mutation: {
        addBook: (root, args) => {
            const foundAuthor = authors.find(
                (author) => author.name === args.author
            );

            if (!foundAuthor) {
                const newAuthor = {
                    name: args.author,
                    id: uuid(),
                };

                authors = authors.concat(newAuthor);
            }

            const book = { ...args, id: uuid() };

            books = books.concat(book);

            return book;
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
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
