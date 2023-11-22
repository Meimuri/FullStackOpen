const Profile = ({ filter }) => {
    return filter.map((country) => (
        <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <b>Capital:</b> {country.capital} <br />
            <b>Area:</b> {country.area} <br />
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map((language) => {
                    return <li key={language}>{language}</li>;
                })}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    ));
};

export default Profile;
