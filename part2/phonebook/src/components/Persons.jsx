const Persons = ({personsList, handleDelete}) => {
    return (
        <>
        {personsList.map(person => (
            <div key={person.id}>
            <p key={person.name}>{person.name} {person.number}</p>
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
            </div>
        ))}
        </>
    )
}
export default Persons