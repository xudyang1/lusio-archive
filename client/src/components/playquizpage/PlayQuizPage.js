import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { QuizzesContext } from '../../context/QuizState';
import '../../css/frontpage.css';
import sampleQuiz from '../../sampleData/sampleQuiz';
//import "materialize-css/dist/css/materialize.min.css";

export default function PlayQuizPage(props) {
    const { quiz, getQuiz } = useContext(QuizzesContext)

    const { id } = useParams();


    // useEffect(() => {
    //     getQuiz(id)
    //     console.log(quiz)
    // });

    // var quiz = sampleQuiz.quizzes.filter((quiz)=>(
    //     quiz.quizID == id
    // ))
    // var name = '';
    // var description = '';
    // var timer = 5.00;
    // var questionList = [];

    // quiz = quiz[0];
    // console.log(quiz);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(quiz);
    }
    // if(quiz){
    //     name = quiz.quizName;
    //     description = quiz.quizDesc;
    //     questionList = quiz.quizQuestions;
    //     console.log(questionList);
    // }
    return (
        <div className="row">
            <div className="container" style={{ backgroundColor: 'ivory', height: "60px" }}>
                <div>
                    <h className="quiz">{"quiz.name"}</h>
                    <span id="timer" style={{ paddingLeft: '340px', height: "20px" }}>Time Left: {"quiz.timer"}</span>
                </div>
            </div>
            <div className="col s6" style={{ paddingLeft: '100px', paddingTop: '30px' }}>
                <div className="description"> Quiz Description: {"quiz.description"}</div>
                {[].map((x, i) => {
                    return (
                        <div className="question">{x.question}<div className="qpoints" >({x.score}points)</div>
                            {x.choices.map((choice) => {
                                return (
                                    <div class="row">
                                        <label>
                                            <input type="checkbox" className="filled-in" />
                                            <span>{choice}</span>
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className='col s12'>
                <a className="waves-effect waves-dark btn-small" onClick={onSubmit}>Finish</a>
            </div>
        </div>
    )
}
