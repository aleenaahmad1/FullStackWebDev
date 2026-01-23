import { useState } from 'react'

const Feedback = ({onGoodClick, onBadClick, onNeutralClick, handleTotal}) => {
  const handleClick = (clickHandler) => {
    clickHandler(prev => prev + 1)
    handleTotal(prev => prev + 1)
  }

  return (
    <>
    <h1>Give Feedback</h1>
    <button onClick={() => handleClick(onGoodClick)}>Good</button>
    <button onClick={() => handleClick(onNeutralClick)}>Neutral</button>
    <button onClick={() => handleClick(onBadClick)}>Bad</button>
    </>
  )
}

const Stats = ({good, neutral, bad, total}) => {
  if (total == 0) {
   return (
    <>
    <p>No feedback given.</p>
    </>
   ) 
  }
  return (
    <>
    <h1>Statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {total}</p>
    <p>average {(good - bad) / total}</p>
    <p>positive {(good/total)*100} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) 
  const [total, setTotal] = useState(0)
  
  return (
    <div>
    <Feedback onGoodClick={setGood} onBadClick={setBad} onNeutralClick={setNeutral} handleTotal={setTotal}></Feedback>
    <Stats good={good} neutral={neutral} bad={bad} total={total}></Stats>
    </div>
  )
}

export default App