import axios from 'axios'

const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

const api_key = import.meta.env.VITE_APP_API_KEY

const getIconURL = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

const getWeather = (capital) => {
    // console.log("inside get weather")
    // console.log("api key is ", api_key)
    const search_url = `${baseURL}?q=${capital}&appid=${api_key}`
    const request = axios.get(search_url)
    return request.then(response => response.data)
}

export default { getWeather, getIconURL }