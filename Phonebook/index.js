const express = require('express')
const app = express()

const persons = [
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
  res.status(200).send(persons)
})

app.get('/info', (req, res) => {
  let length = persons.length
  let date = new Date()
  console.log(date)
  res.send(`<p>Phonebook has info for ${length} people</p><br>${date}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})