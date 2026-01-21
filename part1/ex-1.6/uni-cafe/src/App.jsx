import { useState } from 'react'

const Feedback = ({onGoodClick, onBadClick, onNeutralClick}) => {
  return (
    <>
    <h1>Give Feedback</h1>
    <button onClick={() => onGoodClick(prev => prev + 1)}>Good</button>
    <button onClick={() => onNeutralClick(prev => prev + 1)}>Neutral</button>
    <button onClick={() => onBadClick(prev => prev + 1)}>Bad</button>
    </>
  )
}

const Stats = ({good, neutral, bad}) => {
  return (
    <>
    <h1>Statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <Feedback onGoodClick={setGood} onBadClick={setBad} onNeutralClick={setNeutral}></Feedback>
    <Stats good={good} neutral={neutral} bad={bad}></Stats>
    </div>
  )
}

export default App