require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
const cors = require('cors')
app.use(cors())

const Person = require('./models/person')

var morgan = require('morgan')
morgan.token('body', function (request) {return JSON.stringify(request.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/info', (request, response, next) => {
  Person.countDocuments({}).then( count => {
    const date = new Date()
    response.send(`<p>The phonebook has info of ${count} people.</p> <p>${date}</p> `)
  }).catch(error => next(error))

})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(
    () => {
      response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  console.log('POST request received')
  const body = request.body
  console.log(request.body)
  console.log('Name:', body.name)
  console.log('Number:', body.number)
  if(!body.name){
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if(!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id).then(person => {
    if (!person) {
      return response.status(404).end()
    }
    person.name = name
    person.number = number

    return person.save().then((updatedPerson) => {
      response.json(updatedPerson)
    })
  }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})