import React from "react"
import { nanoid } from "nanoid"

export default function Question(props) {
  const answersArray = props.answers.map(answer => {
    let answerClass = ""
    if (props.reveal) {
      if (answer.content === props.correctAnswer) {
        answerClass = "answer-correct"
      } else if (answer.content === props.selectedAnswer) {
        answerClass = "answer-wrong"
      } else {
        answerClass = "answer-faded"
      }
    } else {
      answerClass = answer.content === props.selectedAnswer ? "answer-selected" : ""
    }

    return (
      <button className={`answer text-darkblue ${answerClass}`} key={answer.id} onClick={() => props.selectAnswer(props.questionId, answer)}>
        {decodeURIComponent(answer.content)}
      </button>
    )
  })

  return (
    <div className="question">
      <h4 className="prompt text-darkblue">{decodeURIComponent(props.prompt)}</h4>
      <div className="answers-container">
        {answersArray}
      </div>
    </div>
  )
}
