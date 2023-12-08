export const updateBookCache = (cache, query, addedBook) => {
    const { allBooks } = cache.readQuery({
        query: query,
        variables: { genre: "" },
    });

    const uniqByName = (a) => {
        let seen = new Set();
        return a.filter((item) => {
            let k = `${item.title}_${item.author.name}`;
            return seen.has(k) ? false : seen.add(k);
        });
    };

    cache.writeQuery({
        query: query,
        variables: { genre: "" },
        data: { allBooks: uniqByName([...allBooks, addedBook]) },
    });
};
