export const updateAuthorsCache = (cache, query, addedAuthor) => {
    const { allAuthors } = cache.readQuery({
        query: query,
    });

    const updatedAuthors = [...allAuthors];
    const authorExists = updatedAuthors.some(
        (author) => author.name === addedAuthor.name
    );

    if (!authorExists) {
        cache.writeQuery({
            query: query,
            data: { allAuthors: [...updatedAuthors, addedAuthor] },
        });
    } else {
        cache.writeQuery({
            query: query,
            data: {
                allAuthors: updatedAuthors.map((author) =>
                    author.name === addedAuthor.name
                        ? { ...author, bookCount: author.bookCount + 1 }
                        : author
                ),
            },
        });
    }
};
