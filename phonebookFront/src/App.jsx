import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Error from './components/Error'
import service from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState([])
  const [backup, setBackup] = useState([])
  const [error, setError] = useState(null)


  useEffect(() => {
    service
      .getData()
      .then(person => {
        setPersons(person)
        setBackup(person)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
        <Error message={error} />
        <Filter backup={backup} setPersons={setPersons} />
      <h2>add a new</h2>
        <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setBackup={setBackup} persons={persons} setPersons={setPersons} error={error} setError={setError} />
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} setPersons={setPersons} setBackup={setBackup} setError={setError} />
      </div>
    </div>
  )
}

export default App