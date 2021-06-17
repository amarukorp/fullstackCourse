import React, { useState } from 'react'

const Button = ({ handler, text }) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}
const Votes = ({amount})=>{
  return(
    <p>has {amount} votes</p>
  )
}
const Title = ({text})=>{
  return(
    <h1>{text}</h1>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes]= useState(Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0))
  
  const mostVoted =(array)=>{
    let max = array[0]
    for (let i =1; i< array.length; i++){
      max = (array[i]>max) ? array[i]:max
    }
    return votes.indexOf(max)
  }
  const handleVote = ()=>{
  votes[selected]+=1
  const copy = [...votes]
  setVotes(copy)
  }  

  const handleClick = () => {
    let newValue = Math.floor(Math.random() * 7)
    if (newValue === selected) {
      newValue = Math.floor(Math.random() * 7)
      setSelected(newValue)
    }
    else {
      setSelected(newValue)
    }
  }

  return (
    <div>
    <Title text="Anecdote of the day"/>
      {anecdotes[selected]}
      <br />
      <Votes amount={votes[selected]}/>
      <br />
      <Button handler={handleClick} text="next anecdote" />
      <Button handler={handleVote} text="vote" />
      <Title text="Anecdote with most votes"/>
      {anecdotes[mostVoted(votes)]}
      <Votes amount={votes[mostVoted(votes)]}/>
    </div>
  )
}

export default App
