const Header = ({courseName}) => {
  console.log("prop in header: ", courseName)
  return <h1>{courseName}</h1>
}

const Part = (props) => {
  console.log("prop in part:", props)
  return ( 
  <p>{props.part.name} {props.part.exercises}</p>
)
}

const Content = ({part}) => {
  console.log("prop in Content:", part)
  return (
    <>
    {part.map(p => 
      <Part key={p.id} part={p}/>
    )}
    </>
  )
}

const Course = (props) => {
  return (
    <>
    <Header courseName={props.course.name}></Header>
    <Content part={props.course.parts}></Content>
    </>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App