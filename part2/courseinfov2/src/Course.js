
const Header = (course) => {
    
    return (
      <h2 key= {course.course.id.toString()}>{course.course.name}</h2>
    )
  }
 
  const Content = (course) => {
    //console.log(course)
      const mappingCourse = course.course.map((course)=><Part key={course.id.toString()} part={course}/>);
      return (
          <>
          {mappingCourse}
          </>
      )

  }

  const Part = (part) => {
      
    return (
      <p>
        {part.part.name} {part.part.exercises}
      </p>    
    )
  }
const ExerciseSum= (partsArray) =>{
  const sum = partsArray.partsArray.reduce(function(sum, exercise){
    return sum + exercise.exercises
  },0)
  return (
    <p>Total of {sum} exercises</p>
  )
}
const Course = (props)=> {
   //console.log(props);
   

    return(
        <>
            <Header course={props.course}/>
            <Content course={props.course.parts}/>
            <ExerciseSum partsArray={props.course.parts}/>
        </>
    )
}
export default Course
