import { useState } from 'react'

const Button = ({text, handleClick, handleTotal}) => {
  const clickHandler = () => {
    handleClick(prev => prev + 1)
    handleTotal(prev => prev + 1)
  }
  return (
    <>
    <button onClick={clickHandler}>{text}</button>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  if (text == 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
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
    <table>
    <tbody>    
      <StatisticLine text='good' value={good}></StatisticLine>
      <StatisticLine text='neutral' value={neutral}></StatisticLine>
      <StatisticLine text='bad' value={bad}></StatisticLine>
      <StatisticLine text='all' value={total}></StatisticLine>
      <StatisticLine text='average' value={(good - bad)/total}></StatisticLine>
      <StatisticLine text='positive' value={(good/total)*100}></StatisticLine>
    </tbody>
    </table>  
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
    <h1>Give Feedback</h1>
    <Button text="good" handleClick={setGood} handleTotal={setTotal}></Button>
    <Button text="neutral" handleClick={setNeutral} handleTotal={setTotal}></Button>
    <Button text="bad" handleClick={setBad} handleTotal={setTotal}></Button>
    <h1>Statistics</h1>
    <Stats good={good} neutral={neutral} bad={bad} total={total}></Stats>
    </div>
  )
}

export default App