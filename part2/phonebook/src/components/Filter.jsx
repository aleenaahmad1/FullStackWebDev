const Filter = ({searchedName, handleNameSearch}) =>{
    return (<>search for names: <input value={searchedName} onChange={handleNameSearch}/></>)
}

export default Filter