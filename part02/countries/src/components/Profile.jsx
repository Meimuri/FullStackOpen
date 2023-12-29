const Profile = ({ filter, weather }) => {
    const icon = weather.weather.map((x) => x.icon);
    const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

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
            <h1>Weather in {country.capital}</h1>
            <b>Temperature:</b> {weather.main.temp} Celcius
            <br />
            <img src={iconSrc} /> <br />
            <b>Wind:</b> {weather.wind.speed}
        </div>
    ));
};

export default Profile;
