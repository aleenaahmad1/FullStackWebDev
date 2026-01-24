import { useState } from 'react'

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

  return (
    <>
    <Display counter={counter}></Display>
    <button onClick={increaseByOne}>plus</button>
    <button onClick={setToZero}>zero</button>
    </>
  )
}

export default App


// const Header = (props) => {
//   console.log("props in header: ", props)
//   return <h1>{props.course.name}</h1>
// }

// const Part = (props) => {
//   console.log("prop in part:", props)
//   return ( 
//   <p>{props.part.name} {props.part.exercises}</p>
// )
// }

// const Content = (props) => {
//   console.log("prop in Content:", props)
//   return (
//     <>
//     <Part part={props.part[0]} />
//     <Part part={props.part[1]}/>
//     <Part part={props.part[2]}/>
//     </>
//   )
// }

// const Total = (props) => {
//   console.log("prop in Total: ", props)
//   return (
//     <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//   )
// }


// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//     {
//       name: 'Fundamentals of React', 
//       exercises: 10
//     },  
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component', 
//       exercises: 14
//     }
//   ]
//   }
  
//   return (
//     <div>
//       <Header course={course} />
//       <Content part={course.parts}/>
//       <Total parts={course.parts}/>
//     </div>
//   )
// }

// export default App