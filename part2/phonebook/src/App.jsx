import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '042-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
 
  const handleNewName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
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
      <form onSubmit={handleSubmit}> 
        <div>
          <>name: <input value={newName} onChange={handleNewName}/> </>
          <>number: <input value={newNumber} onChange={handleNewNumber}/></>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App