import React, { useState } from 'react'
const Title = ({text}) => {
  return(
  <h1>{text}</h1>
    )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const Statistic = ({label, value}) => {
  return(
    <tr><td>{label}</td><td>{value}</td></tr>
  )
}
const All = ({label, good, neutral, bad}) =>{
  let calc = good+neutral+bad
  return(
    <tr><td>{label}</td><td>{calc}</td></tr>
  )
}
const Average = ({label, good, neutral, bad}) => {
  let calc = (good+(bad*-1))/(good+neutral+bad)
  return(
    <tr><td>{label}</td><td>{calc}</td></tr>
  )
}
const PositivePercentage = ({label, positive, neutral, negative}) =>{
  let calc = (positive*100)/(positive+neutral+negative)
  return(
    <tr><td>{label}</td><td>{calc}%</td></tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  if((good+neutral+bad)===0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <table>
    <tbody>
    <Statistic label="Good" value={good}/> 
    <Statistic label="Neutral" value={neutral}/> 
    <Statistic label="Bad" value={bad}/>
    <All label="All" good={good} neutral={neutral} bad={bad}/> 
    <Average label="Average" good={good} neutral={neutral} bad={bad} />
    <PositivePercentage label="Positive" positive={good} neutral={neutral} negative={bad}/>
    </tbody>
    </table>
  )
} 
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood= () => {
    setGood(good+1);
  }
  const handleNeutral= () => {
    setNeutral(neutral+1);
  }
  const handleBad= () => {
    setBad(bad+1);
  } 
  return (
    <div>
      <Title text={"Give feedback"}/>
      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>
      <Title text={"Statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}
export default App