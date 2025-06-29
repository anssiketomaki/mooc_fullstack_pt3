require('dotenv').config()

const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]


const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length >=5){

  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    'name': name,
    'number': number,
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
else{
  Person
    .find({})
    .then(persons => {
      if (persons.length > 0){
        console.log('phonebook:')
        persons.map(p => console.log(`${p.name} ${p.number}` ))
      }

      mongoose.connection.close()
    })
}
