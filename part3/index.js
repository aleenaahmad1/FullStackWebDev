const express = require('express');
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})