import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
 
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
    if(!(checkNameExists(newName) === undefined)){
      alert(`${newName} is already added to the phonebook.`)
      setNewName('')
      setNewNumber('')
      return
    }
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
    personService
      .savePerson(person_object)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
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
      <h2>Numbers</h2>
      <Persons personsList={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App