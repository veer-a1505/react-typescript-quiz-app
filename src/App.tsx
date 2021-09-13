import React, { useState,  FC } from 'react'
import { fetchQuizQuestions , Difficulty, QuestionState} from './api'
import QuestionCard from './components/QuestionCard'

type AnswerObject = {
  question : string;
  answer : string;
  correct : boolean;
  correctAnswer : string
}


const TOTAL_QUESTIONS = 15

const App : FC = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [QuestionNumber , setQuestionNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score , setScore] = useState(0)
  const [gameOver , setGameOver] = useState(true)

  console.log(questions)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="">
      <h1>React Quiz</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? <button onClick={startTrivia}>Start</button> : null
      }
      {!gameOver ?   <p>Score:</p> : null}
      { loading ? <p>Loading Questions...</p> : null}

      {
        !gameOver && !loading ? <QuestionCard 
        questionNumber={QuestionNumber + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[QuestionNumber].question}
        answers={questions[QuestionNumber].answer}
        userAnswer={userAnswers ? userAnswers[QuestionNumber] : undefined}
        callback={checkAnswer}
        /> : null
      }
      <button onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
