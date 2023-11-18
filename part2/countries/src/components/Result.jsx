import List from "./List";
import Profile from "./Profile";

const Result = ({ filter, weather, functionHandler }) => {
    if (filter.length > 10) {
        return <div>Too many countries. Please refine your search.</div>;
    } else if (filter.length > 1 && filter.length <= 10) {
        return <List filter={filter} functionHandler={functionHandler} />;
    } else {
        return <Profile filter={filter} weather={weather} />;
    }
};

export default Result;
