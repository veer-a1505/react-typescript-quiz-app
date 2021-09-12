import React, { useState,  FC } from 'react'
import { fetchQuizQuestions , Difficulty} from './api'
import QuestionCard from './components/QuestionCard'


const TOTAL_QUESTIONS = 15

const App : FC = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [QuestionNumber , setQuestionNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score , setScore] = useState(0)
  const [gameOver , setGameOver] = useState(true)

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM))

  const startTrivia = async () => {

  }

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="">
      <h1>React Quiz</h1>
      <button onClick={startTrivia}>Start</button>
      <p>Score:</p>
      <p>Loading Questions...</p>
      {/* <QuestionCard 
      questionNumber={QuestionNumber + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[QuestionNumber].question}
      answers={questions[QuestionNumber].answers}
      userAnswer={userAnswers ? userAnswers[QuestionNumber] : undefined}
      callback={checkAnswer}
      /> */}
      <button onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
