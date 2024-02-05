import service from '../services/persons'


const PersonForm = ({newName, setNewName, newNumber, setNewNumber, setBackup, persons, setPersons, setError}) => {
    const addName = (event) => {
        event.preventDefault();
        let repeatNum = persons.filter(person => person.number === newNumber);
        if (persons.filter(person => person.name === newName).length != 0 ) {
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            let id = persons.filter(person => person.name === newName)[0].id
            const updatedPerson = {
              "name": newName,
              "id": persons[persons.length - 1].id + 1,
              "number": newNumber
            }
            service
              .replaceData(id, updatedPerson)
              .then(() => {
                service
                .getData()
                .then(person => {
                  setPersons(person)
                  setBackup(person)
                })
                setError(
                  `Updated ${newName}'s number to ${newNumber}`
                )
                setTimeout(() => {
                  setError(null)
                }, 4500)
              })
              .catch(() => {
                setError(
                  `Information of ${newName} has already been removed from server`
                )
                setTimeout(() => {
                  setError(null)
                }, 4500)
              })
            setNewName('');
            setNewNumber('');
            return;
          } else {
            setNewName('');
            setNewNumber('');
            return;
          }
        } else if (repeatNum.length != 0) {
            alert(`${newNumber} is already added to phonebook under ${repeatNum[0].name}`)
            setNewName('');
            setNewNumber('');
            return;
        } else {
          const newPerson = {
            "name": newName,
            "id": persons[persons.length - 1].id + 1,
            "number": newNumber
          }

          service
            .setData(newPerson)
            .then(person => {
              setPersons(persons.concat(person));
              setBackup(persons.concat(person));
              setNewName('');
              setNewNumber('');
              setError(
                `Added ${newName}`
              )
              setTimeout(() => {
                setError(null)
              }, 4500)
            })
            .catch(error => {
              setError(error.response.data.error)
              setTimeout(() => {
                setError(null)
              }, 4500)
            })
          }
      }
    
    const changeNameValue = (event) => {
        setNewName(event.target.value)
    }
    
    const changeNumber = (event) => {
        setNewNumber(event.target.value)
    }

    return (
      <form onSubmit={addName}>
        <div>
          name: <input onChange={changeNameValue} value={newName} />
        </div>
        <div>
          number: <input onChange={changeNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm

