import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const savePerson = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const personURL = `${baseURL}/${id}`
    console.log(personURL)
    const request = axios.delete(personURL)
    return request.then(response => response.data)
}

const updateNumber = (id, updatedPerson) => {
    const personURL = `${baseURL}/${id}`
    console.log("PERSON URL:", personURL)
    const request = axios.put(personURL, updatedPerson)
    return request.then(response => response.data)
}

export default {getAllPersons, savePerson, deletePerson, updateNumber}