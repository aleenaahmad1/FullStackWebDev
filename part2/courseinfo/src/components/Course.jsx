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

export default Course