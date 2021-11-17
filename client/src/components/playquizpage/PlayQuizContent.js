import React, { useState, useEffect, useContext, Component } from 'react';
//import { useParams } from 'react-router';
import { withRouter } from "react-router";
import { QuizzesContext } from '../../context/QuizState';
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
            questions: []
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
        const { getQuizzes } = this.context;
        this.getItem(id, getQuizzes);  
    }

    onSubmit = async e => {
        const { finishQuiz } = this.context;
        var isPlaying = await finishQuiz();
        console.log(isPlaying);

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
                <div className="col s6" style={{ paddingLeft: '100px', paddingTop: '30px' }}>
                    <div className="description"> Quiz Description: {this.state.description}</div>
                    {this.state.questions.map((q, qi) => {
                        return (
                            <div className="question">{q.title}<div className="qpoints" >({q.score}points)</div>
                                {this.state.questions[qi].choices.map((choice) => {
                                    return (
                                        <div class="row">
                                            <label>
                                                <input type="checkbox" className="filled-in" />
                                                <span>{choice.content}</span>
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className='col s12'>
                    <a className="waves-effect waves-dark btn-small" onClick={this.onSubmit}>Finish</a>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(PlayQuizContent);
