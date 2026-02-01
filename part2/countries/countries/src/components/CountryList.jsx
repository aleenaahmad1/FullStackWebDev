const CountryList = ({countries, showCountry}) => {
    return (
        <>
            {countries.map( c => 
            <li
                key={c.name.common}>{c.name.common}
                <button onClick={() => showCountry(c)}>Show</button>
            </li>
            )}
        </>
    )
}

export default CountryList