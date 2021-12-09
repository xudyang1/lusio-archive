import React, { Component } from 'react';
import { withRouter } from "react-router";
import { QuizzesContext } from '../../context/QuizState';
import QuizResult from './QuizResult';
import '../../css/frontpage.css';


class PlayQuizContent extends Component{
    static contextType = QuizzesContext;

    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            description: "",
            timedOption: false,
            time: 0,
            questions: [],
            score: 0,
            quizTime: {},
            initialTime: 0,
            isDisabled: false
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

    }

    convertTime(secs){
        let hours = Math.floor(secs / 3600);
        
        let forMinutes = (secs % 3600);
        let minutes = Math.floor(forMinutes / 60);

        let seconds = Math.ceil(forMinutes % 60);

        let timeSet = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return timeSet;
    }

    getItem = async (id, getQuizzes) => {
        const setCurrentQuiz = async (id) => {
            const quizzes = () => {
                return getQuizzes()
                .then(function(result){
                    return result;
                })
            }
            const quizL = await quizzes();
            const quiz = quizL.data.filter(q => q._id === id);
            return quiz[0];
        }
        const quiz = await setCurrentQuiz(id);
        this.setState({
            id: quiz._id,
            name: quiz.name,
            description: quiz.description,
            timedOption: quiz.timedOption,
            time: quiz.time,
            questions: quiz.questions,
            openModal: false,
            // After getting Quiz retrieve time attribute
            // convert it into h:m:s
            quizTime: this.convertTime(quiz.time),
            initialTime: quiz.time
        });
        this.startTimer();   
    }
    
    componentDidMount(){
        const id = this.props.match.params.id;
        const { getQuizzes, playQuiz } = this.context;
        this.getItem(id, getQuizzes); 
        
        playQuiz(id);
    }

    //binded(this) for use of props
    startTimer() {
        if (this.timer == 0 && this.state.time > 0){
            //call countDown func every 1 second
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    countDown() {
        //reduce second by 1 by every 1 second 
        let seconds = this.state.time - 1;
        this.setState({
            quizTime: this.convertTime(seconds),
            time: seconds
        });

        //if no more time left, stop timer
        if (seconds == 0) {
            clearInterval(this.timer);
            this.setState({isDisabled: true});
        }
    }
    
    scoreHandler = (userAnswer, quizAnswer) => {
        const { finishQuiz } = this.context;
        var scoreEval = 0;
        quizAnswer.map((q, qi) => {
            if (q.answerKey == userAnswer[qi]) {
                scoreEval = scoreEval + q.score;
            }
        })
        
        this.setState({score: scoreEval}, () => finishQuiz(this.state.score, (this.state.initialTime - this.state.time)));
    }

    // allow to check only one answer
    allowOne = (currentCheck, questionRange) => {
        var checks = document.getElementsByClassName('filled-in');
        console.log(checks);

        for (let i = questionRange[0]; i < questionRange[1]; i++)  {
            if (checks[i] !== currentCheck.target){
                checks[i].checked = false;
            }
        }
    }

    onSubmit = (e) => {
        clearInterval(this.timer);
        console.log(this.state.initialTime - this.state.time);

        const checks = document.getElementsByClassName('filled-in');
        const answerCompare = []
        for (let i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                answerCompare.push(checks[i].value);
            }
        }
        this.scoreHandler(answerCompare, this.state.questions);

        this.setState({isDisabled: true});
        e.preventDefault();

    }
    render() {
        var questionBase = 0;
        var questionRange = [0];
        return (
            <div className="row">
                <div className="container" style={{ backgroundColor: 'ivory', height: "60px" }}>
                    <div>
                        <h className="quiz">{this.state.name}</h>
                        {this.state.timedOption? <span id="timer" style={{ paddingLeft: '340px', height: "20px" }}>Time Left: {this.state.quizTime.h}<b>h</b> {this.state.quizTime.m}<b>m</b> {this.state.quizTime.s}<b>s</b></span> : <span></span>}       
                    </div>
                </div>
                <div className="col s12" style={{ paddingLeft: '100px', paddingTop: '30px' }}>
                    <div className="description"> Quiz Description: {this.state.description}</div>
                    {this.state.questions.map((q, qi) => {
                        return (
                            <div className="question" key={qi}>{q.title}<div className="qpoints" >({q.score}points)</div>
                            <div style={{visibility: "hidden"}} key={qi}>
                                {questionBase = questionBase + q.choices.length}
                                {questionRange.push(questionBase)}
                            </div>
                                {this.state.questions[qi].choices.map((choice, ci) => {
                                    return (
                                        <div className="row" key={ci}>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={ci+1} onClick={(e)=>this.allowOne(e, questionRange.slice(qi, qi+2))} disabled={this.state.isDisabled}/>
                                                <span>{choice.content}</span>
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className='row' style={{ textAlign: "right" }}>
                        <a className="waves-effect waves-dark btn-small" onClick={this.onSubmit}>Finish</a>
                        <QuizResult/>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(PlayQuizContent);
