
const Notification = ({msg, divClass}) => {
    if(msg === null){
        return null
    }

    return (
        <div className={divClass}>
            {msg}
        </div>
    )
}

export default Notification