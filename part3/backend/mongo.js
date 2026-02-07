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
    name: String, 
    number: String,
    })

    const Person = mongoose.model('Person', personSchema)

if (!(personName && personNumber)) {
    // If name or number is not provided, list all entries in the phonebook
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
    })
}
else {
    const person = new Person({
    name: personName,
    number: personNumber,
    })

    person.save().then(result => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
    })
}
