import Button from "./Button";

const List = ({ filter, functionHandler }) => {
    return filter.map((country) => (
        <div key={country.name.common}>
            {country.name.common}{" "}
            <Button
                name={country.name.common}
                functionHandler={functionHandler}
            />
        </div>
    ));
};

export default List;
