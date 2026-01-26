import Course from './components/Course'

const Total = ({course}) => {
  console.log("prop in Total: ", course)
  console.log("parts: ", course.parts)
  const initialValue = 0
  const exercises = course.parts.map(p => p.exercises)
  console.log("exercises: ", exercises)
  return (
    <>
    <p>Total of {exercises.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)} exercises</p>
    </>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <>
  {courses.map(c => 
  <>
    <Course course={c}></Course>
    <Total course={c}></Total>
  </>
  )
  }
  </>
  )
}

export default App