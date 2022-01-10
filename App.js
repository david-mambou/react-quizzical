import React from "react"
import Question from "./components/Question"
import Homepage from "./components/Homepage"
import { nanoid } from "nanoid"

export default function App() {
  const [questions, setQuestions] = React.useState([])

  const [selected, setSelected] = React.useState(() => {
    const object = {}
    questions.forEach(question => object[question.id] = "")
    return object
  })

  const [reveal, setReveal] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [gameCount, setGameCount] = React.useState(0)

  const apiURL = "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple&encode=url3986"

  React.useEffect(() => {
    if (gameCount !== 0) {
      fetch(apiURL)
        .then(res => res.json())
        .then(data => setQuestions(data.results.map(question => {
          let allAnswers = question.incorrect_answers
          allAnswers.push(question.correct_answer)
          shuffleArray(allAnswers)
          allAnswers = allAnswers.map(answer => ({
            content: answer,
            id: nanoid()
          }))
          return {
            ...question,
            answers: allAnswers,
            id: nanoid()
          }

        })))
    }
  }, [gameCount])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const selectThisAnswer = (questionId, answer) => {
    setSelected(prevSelected => ({
      ...prevSelected,
      [questionId]: answer.content
    }))
  }

  const questionsDisplay = questions.map(question => {
    return <Question
      key={question.id}
      questionId={question.id}
      prompt={question.question}
      answers={question.answers}
      selectedAnswer={selected[question.id]}
      selectAnswer={selectThisAnswer}
      correctAnswer={question.correct_answer}
      reveal={reveal}
    />
  })

  const checkAnswers = () => {
    setReveal(true)
    questions.forEach(question => {
      if (selected[question.id] === question.correct_answer) {
        setScore(prevScore => prevScore + 1)
      }
    })
  }

  const newGame = () => {
    setReveal(false)
    setScore(0)
    setSelected([])
    setGameCount(prevGameCount => prevGameCount + 1)
    window.scrollTo(0, 0)
  }

  if (gameCount === 0) {
    return (
      <Homepage newGame={newGame} />
    )
  }

  return (
    <main className="app-container">
      {questionsDisplay.length ? questionsDisplay : ""}
      <div className="bottom-container">
        {reveal && <p className="score text-darkblue">You scored {score}/{questions.length} correct answers</p>}
        <button className="game-button purple-button" onClick={reveal ? newGame : checkAnswers}>
          {reveal ? "New game" : "Check answers"}
        </button>
      </div>
    </main>
  )
}
