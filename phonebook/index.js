require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())





let phonebook = [
	{
		'id': 1,
		'name': 'Arto Hellas',
		'number': '040-123456'
	},
	{
		'id': 2,
		'name': 'Ada Lovelace',
		'number': '39-44-5323523'
	},
	{
		'id': 3,
		'name': 'Dan Abramov',
		'number': '12-43-234345'
	},
	{
		'id': 4,
		'name': 'Mary Poppendieck',
		'number': '39-23-6423122'
	}
]

app.use(cors())
morgan.token('body', (req) => {
	if (JSON.stringify(req.body) === '{}') {
		return
	}
	return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response, next) => {
	Person.find({}).then(person => {
		response.json(person)
	})
		.catch(error => next(error))
})

app.get('/info', (request, response) => {
	Person.countDocuments().then(count => {
		response.send(`
      <div>
          <p>Phonebook has info for ${count} people</p>
          <p>${new Intl.DateTimeFormat('en-US', {
		dateStyle: 'full',
		timeStyle: 'long'
	}).format()}</p>
      </div>
      `)
	})
})



app.post('/api/persons/', (request, response, next) => {
	const randomId = Math.floor(Math.random(1) * 10000) + 1
	const body = request.body
	const repitition = phonebook.filter(person => person.name === body.name)

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'Missing Information'
		})
	} else if (repitition.length > 0) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}
	const contact = new Person({
		name: body.name,
		number: body.number,
		id: randomId
	})

	contact.save().then(savedContact => {
		response.json(savedContact)
	})
		.catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
	Person.updateOne({ name: request.body.name }, { $set: { number: request.body.number } })
		.then( () => {
			Person.find({}).then(person => {
				response.json(person)
			})
		})
		.catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(contact => {
		response.json(contact)
	})
		.catch(error => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => {
			Person.find({}).then(person => {
				response.json(person)
			})
			response.status(204).end
		})
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}





const port = process.env.PORT
app.listen(port, () => {
	console.log(`${port}`)
})


app.use(errorHandler)

//BACKTRACK