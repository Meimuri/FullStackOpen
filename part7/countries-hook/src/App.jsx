import { useState, useEffect } from "react";
import countryService from "./services/country";
import Filter from "./components/Filter";
import Result from "./components/Result";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        countryService.getAll().then((initialCountries) => {
            setCountries(initialCountries);
        });
    }, []);

    useEffect(() => {
        const result =
            searchFilter == 0
                ? []
                : countries.filter((country) =>
                      country.name.common
                          .toLowerCase()
                          .includes(searchFilter.toLowerCase())
                  );
        setSearchResult(result);
    }, [countries, searchFilter]);

    const handleFilterChange = (event) => {
        setSearchFilter(event.target.value);
    };

    const buttonSearch = (name) => {
        setSearchFilter(name);
    };

    return (
        <>
            <Filter
                text="Search countries: "
                inputValue={searchFilter}
                functionHandler={handleFilterChange}
            />
            <Result filter={searchResult} functionHandler={buttonSearch} />
        </>
    );
};

export default App;
