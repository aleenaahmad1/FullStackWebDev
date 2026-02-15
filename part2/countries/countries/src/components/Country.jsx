const Country = ({country_data, weather}) => {
    const languages = []
    for (const [key, val] of Object.entries(country_data.languages)){
        languages.push(val)
    }
    // console.log("inside country component, weather is ", weather)
    // console.log("inside country icon url is ", weather.iconURL)
            
    return (
        <div>
            <h2>{country_data.name.common}</h2>
            <p>Capital: {country_data.capital}</p>
            <p>Area: {country_data.area}</p>
            <h3>Languages:</h3>
            {languages.map( l => <ul key={l}>{l}</ul>)}
            <img src={country_data.flags.png} alt="country flag" />
            <h3>Weather in {weather.name}</h3>
            <p>Temperature: {weather.main.temp} K</p>
            {weather.iconURL && <img src={weather.iconURL} alt="weather icon" />}
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Country