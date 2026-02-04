const PersonForm = ({name, handleName, number, handleNumber, handleFormSubmit}) => {

    return (
        <form onSubmit={handleFormSubmit}> 
        <div>
            <>name: <input value={name} onChange={handleName}/> </>
            <>number: <input value={number} onChange={handleNumber}/></>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>  
    )
}
export default PersonForm