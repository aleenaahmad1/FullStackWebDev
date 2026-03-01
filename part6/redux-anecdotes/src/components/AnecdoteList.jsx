import { useSelector, useDispatch } from "react-redux"
import { castVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, vote }) => {
    return (
      <div>
        <div>{anecdote.content}</div>
        <div>
            has {anecdote.votes}
            <button onClick={vote}>vote</button>
        </div>
    </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
        [...state].sort((a,b) => b.votes - a.votes)
    )
    const dispatch = useDispatch()

    return (
    <>
    {anecdotes.map(a => (
        <Anecdote 
            key={a.id}
            anecdote={a} 
            vote={() => dispatch(castVote(a.id))}
        />
    ))}
    </>
    )
}

export default AnecdoteList