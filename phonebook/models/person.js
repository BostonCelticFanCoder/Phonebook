const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: function(v) {
				return /^\d{2,3}-\d{1,}$/.test(v)
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		required: true
	},
	id: String,
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.__v
		delete returnedObject._id
	}
})


module.exports = mongoose.model('Phonebook', personSchema)