import { FC } from "react"
import { AnswerObject } from "../App"

type QuestionCardProps = {
  question : string;
  answers : string[];
  callback : (e : React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer : AnswerObject | undefined;
  questionNumber : number;
  totalQuestions : number;
  correct : boolean ;
  userClicked : boolean;
}

const QuestionCard : FC<QuestionCardProps> = ({question , answers , callback , userAnswer , questionNumber , totalQuestions, userClicked , correct }) => {

 
  const styles = {
    divClass : 'flex justify-center items-center w-72 m-2 p-2 border border-gray-900 rounded-md '
  }


  return (
    <div >
      <p className='text-xl font-light'>Question : {questionNumber} / {totalQuestions}</p>

      <p className='text-2xl m-2 p-1 w-full' dangerouslySetInnerHTML={{__html : question}}></p>

      <div className='flex flex-col justify-center items-center text-center'>
        {
          answers.map((answer) => {
            const userClicked = userAnswer?.answer === answer;
            const correct = userAnswer?.correctAnswer === answer;
            
            return (
              <div key={answer}  className={`${styles.divClass} ${correct && " bg-green-500 text-white"} ${userClicked && " bg-red-500 text-white"}  `}>
              <button  className='w-full' disabled={!!userAnswer} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html : answer}}/>
              </button>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default QuestionCard
