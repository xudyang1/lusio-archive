import React, { useContext } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css';
import img from '../Lusio.png';
import { QuizzesContext } from '../context/QuizState';

export const QuizSections = () => {
  const {getQuizzes, addQuiz, deleteQuiz, quizzes} = useContext(QuizzesContext)

  const handler = () => {
    getQuizzes();
    // console.log("123"+quizzes[0]);
  }
  
  const name = quizzes[0]? quizzes[0].name : "none";
  const date = quizzes[0]? quizzes[0].date : "none";

  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <img src={img} alt="img" />
            <span className="card-title">Sample</span>
          </div>
          <div className="card-content">
            <p>Hello World</p>
          </div>
          <div className="card-action">
            <button onClick={getQuizzes}
              className="waves-effect waves-light btn">
              <i className="material-icons">GET</i>
            </button>
          </div>
          <div>
            <p>quiz: {name}</p>
            <p>date created: {date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
