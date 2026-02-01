const Country = ({country_data}) => {
    const languages = []
    for (const [key, val] of Object.entries(country_data.languages)){
        languages.push(val)
    }
    return (
        <div>
            <h2>{country_data.name.common}</h2>
            <p>Capital: {country_data.capital}</p>
            <p>Area: {country_data.area}</p>
            <h3>Languages:</h3>
            {languages.map( l => <ul key={l}>{l}</ul>)}
            <img src={country_data.flags.png} alt="country flag" />
        </div>
    )
}

export default Country