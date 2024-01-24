const Filter = ({backup, setPersons}) => {
    const filterPersons = (event) => {
        if (event.target.value !== "") {
            const filteredNames = backup.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
            setPersons(filteredNames)
          } else {
            setPersons(backup)
        }
    }
    return (
        <>
            filter shown with <input onChange={filterPersons}></input>
        </>
    )
}

export default Filter