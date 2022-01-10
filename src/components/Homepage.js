import React from "react"


export default function Homepage(props) {
  return (
    <main className="homepage-main">
      <h1 className="text-darkblue main-title">Quizzical</h1>
      <h4 className="text-darkblue main-subtitle">Are you ready for an exciting quizz?</h4>
      <button className="purple-button start-button" onClick={props.newGame}>Get started</button>
    </main>
  )
}
