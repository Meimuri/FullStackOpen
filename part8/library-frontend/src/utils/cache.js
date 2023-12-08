export const updateCache = (cache, query, addedBook, variables) => {
    const uniqByTitle = (a) => {
        let seen = new Set();
        return a.filter((item) => {
            let k = item.title;
            return seen.has(k) ? false : seen.add(k);
        });
    };

    cache.updateQuery(
        query,
        (data) => {
            const { allBooks } = data;
            return {
                allBooks: uniqByTitle(allBooks.concat(addedBook)),
            };
        },
        variables
    );
};
