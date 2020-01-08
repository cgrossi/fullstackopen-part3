const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
morgan.token('person', (req, res) => { 
  return JSON.stringify(req.body) 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
  {
    name: 'CArmine',
    number: 4039017458,
    id: 1
  },
  {
    name: 'Emmy',
    number: 7000722,
    id: 2
  },
  {
    name: 'Joel',
    number: 9316403,
    id: 3
  },
  {
    name: 'John',
    number: 9193677,
    id: 4
  }
]

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id
  const person = persons.find(person => person.id === id)
  if(person) {
    res.send(person)
  } else {
    res.status(400).send(`Person with an id of ${id} could not be found`)
  }
})

app.get('/info', (req, res) => {
  let length = persons.length
  let date = new Date()
  res.send(`<p>Phonebook has info for ${length} people</p><br>${date}`)
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  const id = Math.floor(Math.random() * 20000)

  if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'Error, missing name or number'
    })
  }

  const isName = persons.find(person => person.name === body.name)

  if(isName) {
    return res.status(400).json({
      error: 'Error, name is already in the phonebook'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: id
  }
  persons = persons.concat(person)
  res.json(persons)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id
  const person = persons.find(person => person.id === id)
  if(person) {
    persons = persons.filter(person => person.id !== id)
    res.send(`${person.name} was successfully deleted from the phonebook`)
  } else {
    res.status(400).send(`A person with that id could not be found`)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})