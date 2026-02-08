const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.xbowfhj.mongodb.net/phonebookApp?&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

const Person = mongoose.model('Person', personSchema)

if (!(personName && personNumber)) {
  // If name or number is not provided, list all entries in the phonebook
  Person.find({}).then(result => {
    result.forEach(person => {console.log(person)})
    mongoose.connection.close()
  })
}
else {
  const person = new Person({
    name: personName,
    number: personNumber,
  })

  person.save().then( () => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}
