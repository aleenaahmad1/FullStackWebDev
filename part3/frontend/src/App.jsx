import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notif, setNotif] = useState(null)
  const [msgClass, setMsgClass] = useState('')
 
  useEffect(() => {
    console.log("effect")
    personService
      .getAllPersons()
      .then(person => {
        setPersons(person)
      })
  }, [])

  const handleNewName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) =>{
    // console.log(event.target.value)
    setShowAll(false)
    setSearchName(event.target.value)
    if (event.target.value === ''){
      setShowAll(true)
    }

  }

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
  
  const checkNameExists = (name) => {
    return persons.find((person) => person.name === name)
  }

  const checkNumberExists = (number) => {
    return persons.find((person) => person.number === number)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if(!(checkNumberExists(newNumber) === undefined)){
      alert(`${newNumber} is already added to the phonebook.`)
      setNewName('')
      setNewNumber('')
      return
    }
    const person_object = {
      name: newName,
      number: newNumber
    }
    if(!(checkNameExists(newName) === undefined)){
      alert(`${newName} is already added to the phonebook, replace the old number with the new one?`)
      const person_to_update = persons.find((person) => person.name === newName)
      console.log("PERSON TO UPDATE:", person_to_update)
      personService
        .updateNumber(person_to_update.id, person_object)
        .then(returnedPerson => {
          setPersons(persons.map(
            p => p.id !== returnedPerson.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotif(`${returnedPerson.name}'s number has been updated.`)
        setMsgClass('notif')
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
      .catch(error => {
        setNotif(`${person_to_update.name} has already been removed from the server.`)
        setMsgClass('error')
        setPersons(persons.filter(p => p.id !== person_to_update.id))
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
      return
    }
    personService
      .savePerson(person_object)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotif(`${returnedPerson.name} added to phonebook.`)
        setMsgClass('notif')
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
  }

  const handleDelete = (id, name) => {
    console.log("delete clicked.")
    confirm(`Delete ${name}?`)
    console.log(id)
    personService.deletePerson(id)
    .then( () => {
      setPersons(persons.filter((person) => person.id !== id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchedName={searchName} handleNameSearch = {handleSearch}/>
      <></>
      <PersonForm name={newName} handleName={handleNewName} number={newNumber} handleNumber={handleNewNumber} handleFormSubmit={handleSubmit}></PersonForm>
      <Notification msg={notif} divClass={msgClass}></Notification>
      <h2>Numbers</h2>
      <Persons personsList={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App