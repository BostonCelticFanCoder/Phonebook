const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(express.static('dist'))





let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(cors())
morgan.token('body', (req, res) => {
    if (JSON.stringify(req.body) === "{}") {
        return
    }
    return JSON.stringify(req.body)
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/info', (request, response) => {
    response.send(`
    <div>
        <p>Phonebook has info for ${phonebook.length} people</p>
        <p>${new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeStyle: 'long'
        }).format()}</p>
    </div>
    `)
})



app.post('/api/persons', (request, response) => {
    const randomId = Math.floor(Math.random(1) * 10000) + 1
    const body = request.body
    const repitition = phonebook.filter(person => person.name === body.name)
  
    if (!body.name || !body.number) {
      return response.status(400).json({
        error: "Missing Information"
      })
    } else if (repitition.length > 0) {
      return response.status(400).json({
        error: "name must be unique"
      })
    }
    const contact = {
      name: body.name,
      number: body.number,
      id: randomId
    }
  
    phonebook = phonebook.concat(contact)
    return response.json(contact)
  
})



app.get('/api/persons/:id', (request, response) => {
    let person = phonebook.filter(pers => pers.id === Number(request.params.id))
    person.length != 0 ? response.json(person) : response.status(400).end()
})



app.delete('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
    response.status(204).end()
})




const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`${port}`)
})
