
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const mongoose = require('mongoose')

const Persons = require('./models/person')

const app = express()

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node index.js <password>')
  process.exit(1)
  }

const password = process.argv[2]
// const url = `mongodb+srv://anssiketomaki:${password}@fspt3.srnnvlt.mongodb.net/?retryWrites=true&w=majority&appName=FSpt3`

// mongoose.set('strictQuery', false)
// console.log('connecting to mongoDB...')

// mongoose.connect(url) //add try-catch to catch errors
//   .then(() => {
//     console.log('Connected to MongoDB successfully!')
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message)
//     process.exit(1) // Exit if DB connection fails
//   })

// middleware
app.use(express.json()) //parser for json data
app.use(express.static('dist')) //serve static files from dist folder
app.use(cors()) //enable CORS for all origins
app.use(morgan('tiny')) //log HTTP requests to the console


app.get('/', (request, response)=>{
  response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response)=>{
  // response.json(persons)
  Persons.find({}).then(persons =>{
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id);
  const num = Persons.find(person => person.id === id)

  if (num){
    response.json(num)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) =>{
  const nums = Persons.length;
  const datetime = new Date().toString();
  response.send(`Phonebook has info for ${nums} people<br>${datetime}`) 
})

app.delete('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id)
  console.log(`poistetaan: ${id}`)
  Persons = Persons.filter(person => Number(person.id) !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) =>{
  const body = request.body
  console.log(body)

  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  } else if (Persons.find(p=> p.name === body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newId = Math.floor(Math.random() *32000)
  body.id = newId.toString()

  Persons = Persons.concat(body)

  response.json(body)
})

app.put('/api/persons/:id', (request, response)=>{
  //const id = Number(request.params.id)
  const body = request.body
  //console.log(`päivitetään: alkup->${Persons.find(p => p.id === id).number} henkilöön->${body.number}`)

  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  } 

  const personToUpdate = persons.find(p => p.id === body.id)
  if (!personToUpdate) {
    return response.status(404).json({
      error: 'person not found'
    });
  }

  const updatedPerson = { ...personToUpdate, number: body.number}
  Persons = Persons.filter(person => Number(person.id) !== Number(body.id))
  Persons = Persons.concat(updatedPerson)

  response.json(updatedPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})

  // const Person = mongoose.model('Person', personSchema)


// let persons =[
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": "1"
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": "2"
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": "3"
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": "4"
//     }
// ]
