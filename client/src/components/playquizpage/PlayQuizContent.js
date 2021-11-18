import React, { useState, useEffect, useContext, Component } from 'react';
//import { useParams } from 'react-router';
import { withRouter } from "react-router";
import { QuizzesContext } from '../../context/QuizState';
import QuizResult from './QuizResult';
import '../../css/frontpage.css';

//import "materialize-css/dist/css/materialize.min.css";

class PlayQuizContent extends Component{
    // const { quiz, getQuiz } = useContext(QuizzesContext)
    static contextType = QuizzesContext;
    
    constructor(){
        super();
        this.state = {
            id: "",
            name: "",
            description: "",
            timedOption: false,
            time: 0,
            retakeOption: false,
            questions: [],
            score: 0
        };
    }

    //const { id } = useParams();
    // useEffect(() => {
    //     getQuiz(id)
    //     //console.log(quiz)
    // }, []);
    getItem = async (id, getQuizzes) => {
        const setCurrentQuiz = async (id) => {
            const quizzes = () => {
                return getQuizzes()
                .then(function(result){
                    //console.log("result is", result);
                    return result;
                })
            }
            const quizL = await quizzes();
            //console.log("QuizList is ",quizL.data);
            const quiz = quizL.data.filter(q => q._id === id);
            console.log("Quiz", quiz[0]);
            return quiz[0];
        }
        const quiz = await setCurrentQuiz(id);
        console.log("current quiz is ", quiz);
        this.setState({
            id: quiz._id,
            name: quiz.name,
            description: quiz.description,
            timedOption: quiz.timedOption,
            time: quiz.time,
            retakeOption: quiz.retakeOption,
            questions: quiz.questions, 
            openModal: false
        });
        console.log("quiz questions are", this.state.questions); 
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        const { getQuizzes, isPlaying } = this.context;
        this.getItem(id, getQuizzes); 
        console.log("beforeSubmit", isPlaying); 
    }
    scoreHandler = (userAnswer, quizAnswer) => {
        var scoreEval = 0;
        quizAnswer.map((q,qi)=>{
            if (q.answerKey == userAnswer[qi]) {
                scoreEval = scoreEval + q.score;
                console.log("qi", qi);
                console.log(scoreEval);
            }
        })
        console.log(scoreEval);
        this.setState({score: scoreEval});
    }
    onSubmit = (e) => {
        const { finishQuiz, isPlaying } = this.context;
        
        const checks = document.getElementsByClassName('filled-in');
        const answerCompare = []
        for (let i=0; i < checks.length; i++)  {
            if (checks[i].checked){
                answerCompare.push(checks[i].value);
            }
        }
        console.log(answerCompare); 
        this.scoreHandler(answerCompare, this.state.questions);
 
        finishQuiz(this.state.score);
        console.log("onSubmit", isPlaying);
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        return (
            <div className="row">
                <div className="container" style={{ backgroundColor: 'ivory', height: "60px" }}>
                    <div>
                        <h className="quiz">{this.state.name}</h>
                        {this.state.timedOption? <span id="timer" style={{ paddingLeft: '340px', height: "20px" }}>Time Left: {this.state.time}</span>: <span></span>}       
                    </div>
                </div>
                <div className="col s12" style={{ paddingLeft: '100px', paddingTop: '30px' }}>
                    <div className="description"> Quiz Description: {this.state.description}</div>
                    {this.state.questions.map((q, qi) => {
                        return (
                            <div className="question">{q.title}<div className="qpoints" >({q.score}points)</div>
                                {this.state.questions[qi].choices.map((choice, ci) => {
                                    return (
                                        <div class="row">
                                            <label>
                                                <input type="checkbox" className="filled-in" value={ci+1}/>
                                                <span>{choice.content}</span>
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                <div className='row' style={{textAlign:"right"}}>
                    <a className="waves-effect waves-dark btn-small" onClick={this.onSubmit}>Finish</a>
                    <QuizResult /> 
                </div>
                </div>    
            </div>
            
        )
    }
}

export default withRouter(PlayQuizContent);
