import React, { useState,  FC } from 'react'
import { fetchQuizQuestions , Difficulty, QuestionState} from './api'
import QuestionCard from './components/QuestionCard'

export type AnswerObject = {
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
  const [correct, setCorrect] = useState(false)
  const [userClicked , setUserClicked] = useState(false)



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
    if(!gameOver){
      // User answer
      const answer = e.currentTarget.value

      // Check answer against correct answer
      const correct = questions[QuestionNumber].correct_answer === answer

      // Add score
      if(correct){
        setScore(prev => prev + 1)
        setCorrect(true)
      } else {
        setUserClicked(true)
      }



      const answerObject = {
        question : questions[QuestionNumber].question,
        answer,
        correct,
        correctAnswer : questions[QuestionNumber].correct_answer
      }

      setUserAnswers((prev) => [...prev, answerObject])

    }
  }

  const nextQuestion = () => {
    // Move to next question if not the last question
    const nextQuestion = QuestionNumber + 1;

    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)      
    } else {
      setQuestionNumber(nextQuestion)
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-800 text-black  ">
      <div className='border-4 rounded-lg m-4 p-4 md:w-2/4  text-center bg-light-white'>
      <h1 className='text-4xl my-2 py-2'>React Quiz</h1>
    
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<button className='text-2xl border-2 p-2 m-2 w-32 rounded-lg bg-green-500 text-white' onClick={startTrivia}>

          { gameOver ? "Start" : "Restart"}
        </button>) : null
      }

      {!gameOver ?   (<p className='text-xl '>Score : {score}</p>) : null}
      { loading ? (<p className='text-2xl '>Loading Questions...</p>) : null}

      {
        !gameOver && !loading ? (<QuestionCard 
        questionNumber={QuestionNumber + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[QuestionNumber].question}
        answers={questions[QuestionNumber].answer}
        userAnswer={userAnswers ? userAnswers[QuestionNumber] : undefined}
        callback={checkAnswer}
        correct={correct}
        userClicked={userClicked}
        />) : null
      }

      {
        !gameOver && !loading && userAnswers.length === QuestionNumber + 1 && QuestionNumber !== TOTAL_QUESTIONS - 1 ?  (<button className='m-4 w-48 border p-2 rounded-lg bg-light-purple
        text-white  hover:bg-indigo-600 transition-colors' onClick={nextQuestion}>Next Question</button>) : null
      }
      </div>
    </div>
  );
}

export default App;
