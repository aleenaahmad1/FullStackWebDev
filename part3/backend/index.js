require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors');
const Person = require('./models/person')

app.use(cors());

var morgan = require('morgan')

app.use(express.json())

morgan.token('body', function (request, response) {return JSON.stringify(request.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// const personName = process.argv[3]
// const personNumber = process.argv[4]

// const checkNameExists = (name) => {
//     const person = persons.find(p => p.name === name)
//     if(person){
//         return true
//     } else {
//         return false
//     }
// }

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

// app.get('/api/info', (request, response) => {
//   const num_people = persons.length
//   const date = new Date()
//   response.send(`<p>The phonebook has info of ${num_people} people.</p> <p>${date}</p> `)
// })

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id).then(person =>{
    response.json(person)
  })
})


// app.delete('/api/persons/:id', (request, response) => {
//   console.log("delete req")
//   const id = request.params.id
//   console.log("Inside delete request. ID: ", id)
  
//   persons = persons.filter(p => p.id !== id)

//   response.status(204).end()
// })

app.post('/api/persons', (request, response) => {
  console.log("POST request received")
  const body = request.body
  console.log(request.body)
  if(!body.name){
    return response.status(400).json({
      error: "name missing"
    })
  }
  if(!body.number){
    return response.status(400).json({
      error: "number missing"
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number, 
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})