import { useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import Notification from './components/Notification'
import Country from './components/Country'
import CountryList from './components/CountryList'


const App = () => {
  const [ searchedCountry, setSearchedCountry ] = useState('')
  const [ displayedCountries, setDisplayedCountries ] = useState([])
  const [ notif, setNotifMsg ] = useState(null)
  const [ singleCountry, setSingleCountry ] = useState(false)
  const [ weather, setWeather ] = useState(null)


  const handleSearch = (event) => {
    setSearchedCountry(event.target.value)
    countryService
    .getCountries()
    .then(countries => {
      console.log("inside promise.")
      if (event.target.value === ""){
        setDisplayedCountries([])
        setSingleCountry(false)
        setNotifMsg(null)
        return
      }
      const matching = countries.filter(
        c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      if ( matching.length > 10 ){
        setSingleCountry(false)
        console.log(matching[0].name.common)
        // console.log("too many countries")
        setNotifMsg("Too many matches, specify another filter")
        setTimeout(() => {
          setNotifMsg(null)
        }, 2000)
        return
      }
      else if (matching.length > 1 && matching.length <= 10){
        setSingleCountry(false)
        console.log("several countries")
        console.log("inside 10 condition, ", matching)
        setDisplayedCountries(matching)
        return
      }
      else if ( matching.length === 1 ){
        // console.log("one country")
        setDisplayedCountries(matching)
        setSingleCountry(true)
        
        // console.log("capial is ", matching[0].capital[0])
        weatherService
        .getWeather(matching[0].capital[0])
        .then(weather => {
          // console.log("weather is ", weather)
          const iconURL = weatherService.getIconURL(weather.weather[0].icon)
          setWeather({...weather, iconURL: iconURL})
        })
        return
      }
    }
    )

  }

  const showCountry = (country) => {
    setDisplayedCountries([country])
    setSingleCountry(true)
  }

  return (
    <>
    Find countries  <input onChange={handleSearch} value={searchedCountry}/>
    <Notification msg={notif} />
    {singleCountry && weather ? <Country country_data={displayedCountries[0]} weather={weather} /> : <CountryList countries={displayedCountries} showCountry={showCountry} />}
    </>
  )

}

export default App