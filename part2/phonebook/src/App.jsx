import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
 
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
    if (event.target.value = ''){
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
    setPersons(persons.concat(person_object))
    console.log("Persons:", persons)
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchedName={searchName} handleNameSearch = {handleSearch}/>
      <></>
      <PersonForm name={newName} handleName={handleNewName} number={newNumber} handleNumber={handleNewNumber} handleFormSubmit={handleSubmit}></PersonForm>
      <h2>Numbers</h2>
      <Persons personsList={personsToShow}/>
    </div>
  )
}

export default App