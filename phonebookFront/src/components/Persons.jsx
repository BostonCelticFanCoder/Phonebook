import service from '../services/persons'

const Persons = ({persons, setPersons, setBackup, setError}) => {

  const btnClick = (event) => {
    if (window.confirm("Do you really want to delete this entry from the phonebook?")) {
      service
      .deleteData(event.target.id)
      .then(() => {
        service
        .getData()
        .then(person => {
          setPersons(person)
          setBackup(person)
          setError(
            `Deleted entry`
          )
          setTimeout(() => {
            setError(null)
          }, 4500)
        })
      })
    }
   
  }
    return (
      <div>
        {persons.map(person => 
          <div key={person.id}>
            <p key={person.id}>{person.name} {person.number}</p>
            <button id={person.id} onClick={btnClick}>delete</button>
          </div>
        )}
      </div>
    )
}

export default Persons