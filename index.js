// console.log('hello world1')
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')

let persons =[
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
]

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan('tiny'))


app.get('/', (request, response)=>{
  response.send('<h1>Helo World</h1>')
})

app.get('/api/persons', (request, response)=>{
  response.json(persons)
})

app.get('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id);
  const num = persons.find(person => person.id === id)

  if (num){
    response.json(num)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) =>{
  const nums = persons.length;
  const datetime = new Date().toString();
  response.send(`Phonebook has info for ${nums} people<br>${datetime}`) 
})

app.delete('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id)
  console.log(`poistetaan: ${id}`)
  persons = persons.filter(person => Number(person.id) !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) =>{
  const body = request.body
  console.log(body)

  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  } else if (persons.find(p=> p.name === body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newId = Math.floor(Math.random() *32000)
  body.id = newId.toString()

  persons = persons.concat(body)

  response.json(body)
})

app.put('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id)
  const body = request.body

  // if (!body.name || !body.number){
  //   return response.status(400).json({
  //     error: 'name or number missing'
  //   })
  // } else if (persons.find(p=> p.name !== body.name)){
  //   return response.status(400).json({
  //     error: 'name not found to update number'
  //   })
  // }
 
  const updatedPerson = { ... persons[id], ...body}
  persons[id] = updatedPerson

  response.json(updatedPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})

