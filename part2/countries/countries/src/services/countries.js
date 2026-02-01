import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountries = () => {
    console.log("inside get countries")
    const search_url = `${baseURL}/all`
    const request = axios.get(search_url)
    console.log(request.then(response => response.data))
    return request.then(response => response.data)
}

export default {getCountries}