import { useState, useEffect } from "react";
import countryService from "./services/country";
import weatherService from "./services/weather";
import Filter from "./components/Filter";
import Result from "./components/Result";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [weatherResult, setWeatherResult] = useState({
        weather: [
            {
                icon: null,
            },
        ],
        main: {
            temp: null,
        },
        wind: {
            speed: null,
        },
    });

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
        if (result.length == 1) {
            const coord = result
                .map((res) => res.capitalInfo)
                .map((res) => res.latlng);
            const lat = coord.map((co) => co[0]);
            const lng = coord.map((co) => co[1]);

            weatherService.getAll(lat, lng).then((weather) => {
                setWeatherResult(weather);
            });
        }
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
            <Result
                filter={searchResult}
                weather={weatherResult}
                functionHandler={buttonSearch}
            />
        </>
    );
};

export default App;
