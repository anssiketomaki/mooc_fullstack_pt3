require('dotenv').config()
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/person')

const app = express()


// Middleware
app.use(express.json()) //parser for json data
app.use(express.static('dist')) //serve static files from dist folder
app.use(cors()) //enable CORS for all origins
app.use(morgan('tiny')) //log HTTP requests to the console

// Routes

app.get('/', (request, response)=>{
  response.send('<h1>Hello World</h1>')
})

// GET all
app.get('/api/persons', (request, response, next)=>{
  Person.find({})
    .then(persons =>{
      if(persons){
        response.json(persons)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// GET person by id
app.get('/api/persons/:id', (request, response, next)=>{
  Person.findById(request.params.id)
    .then((person) =>{
      if(person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) =>{
  const datetime = new Date().toString();
  Person.countDocuments({})
    .then((count) => {
      response.send(`Phonebook has info for ${count} people<br>${datetime}`) 
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next)=>{
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// add person to the database
app.post('/api/persons', (request, response, next) =>{
  const body = request.body
  console.log(body)

  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  } 
  
  // const newId = Math.floor(Math.random() *32000)
  // body.id = newId.toString()
  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then((savedPerson) =>{
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// update persons number in database
app.put('/api/persons/:id', (request, response, next)=>{
  const {name, number} = request.body
  const person = {
    name: name,
    number: number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
     })
    .catch(error => next(error))
})

// Middleware for catching unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  
  next(error)
}

app.use(errorHandler)

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
