const express = require('express');
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const checkNameExists = (name) => {
    const person = persons.find(p => p.name === name)
    if(person){
        return true
    } else {
        return false
    }
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    console.log("persons")
    response.json(persons)
})

app.get('/api/info', (request, response) => {
  const num_people = persons.length
  const date = new Date()
  response.send(`<p>The phonebook has info of ${num_people} people.</p> <p>${date}</p> `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person_data = persons.filter(p => p.id === id)
  if (person_data) {
    response.json(person_data)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  console.log("delete req")
  const id = request.params.id
  console.log("Inside delete request. ID: ", id)
  
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  console.log("POST request received")
  const person = request.body
  console.log(request.body)
  if(!person.name){
    return response.status(400).json({
      error: "name missing"
    })
  }
  if(!person.number){
    return response.status(400).json({
      error: "number missing"
    })
  }
  if(checkNameExists(person.name)){
    return response.status(400).json({
      error: "Name already exists in the phonebook."
    })
  }

  const new_id = Math.floor(Math.random() * 10000) + 1
  const person_obj = {
    name: person.name,
    number: person.number, 
    id: new_id,
  }
  persons = persons.concat(person_obj)
  response.json(person_obj)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})