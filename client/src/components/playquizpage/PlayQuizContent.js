import React, { Component } from 'react';
import { withRouter } from "react-router";
import { QuizzesContext } from '../../context/QuizState';
import QuizResult from './QuizResult';
import '../../css/playquizpage.css';


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
            showAnsOption: false,
            questions: [],
            score: 0,
            timeForCookie: 0,
            quizTime: {},
            initialTime: 0,
            isDisabled: false,
            isPublished: false
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

        //create a cookie for timer
        //updates secs after countDown
        document.cookie = ("totalTime=" + secs + "; path=/play/" + this.state.id);

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
            showAnsOption: quiz.showAnsOption,
            questions: quiz.questions,
            openModal: false,
            timeForCookie: quiz.time,
            // After getting Quiz retrieve time attribute
            // convert it into h:m:s
            quizTime: this.convertTime(quiz.time),
            initialTime: quiz.time,
            isPublished: quiz.isPublished
        });
        this.startTimer();   
    }
    
    componentDidMount(){
        const id = this.props.match.params.id;
        const { getQuizzes, playQuiz, isPlaying } = this.context;
        this.getItem(id, getQuizzes); 

        playQuiz(id);
        
        window.onbeforeunload = function() {
            return "";
        };
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
        let seconds = Number(document.cookie.split(";")[0].split("=")[1]) - 1;
        console.log(document.cookie);
        this.setState({
            quizTime: this.convertTime(seconds),
            time: seconds
        });

        //if no more time left, stop timer
        if (seconds == 0) {
            clearInterval(this.timer);
            this.setState({isDisabled: true});

            //delete a cookie
            document.cookie = ("totalTime=" + "; max-age=0" + "; path=/play/" + this.state.id);
        }
    }
    
    scoreHandler = async (userAnswer, quizAnswer) => {
        const { finishQuiz } = this.context;
        var scoreEval = 0;
        var xp = 0;
        quizAnswer.map((q, qi) => {
            if (q.answerKey == userAnswer[qi]) {
                scoreEval = scoreEval + q.score;
                //every time user gets a question right 
                //earns a 5xp
                xp = xp + 5;
            }
        })

        console.log("User Id", this.props.userId);
        if (this.props.userId != null){
            const getProfileForQ = () => { 
                return (this.props.getProfile(this.props.userId)).then(function (result)
                {return result.data.profile;});
            }
            const profile = await getProfileForQ();
            const qTakenList = profile.quizzesScore;
            const currentExp = profile.currentExp;
            const level = profile.level;

            console.log("QuizzesTaken are", qTakenList);

            //If first time taking quiz, increase EXP according to the questions
            //the user answer right
            var qtaken = false;
            for(var i=0; i < qTakenList.length; i++){
                if (qTakenList[i].split(":")[0] == this.state.id){
                    qtaken = true;
                }
            }
            console.log(qtaken);
            if (!qtaken){
                await this.props.updateProfile({
                    mode: "EDIT",
                    profile: {
                        owner: this.props.userId,
                        currentExp: xp + currentExp + 50
                    }
                })
                xp = xp + 50;
            }
            else if (qtaken){
                await this.props.updateProfile({
                    mode: "EDIT",
                    profile: {
                        owner: this.props.userId,
                        currentExp: xp + currentExp
                    }
                })
            }
            console.log("currentExp", xp + currentExp);
            
            if ((xp + currentExp) > 500) {
                await this.props.updateProfile({
                    mode: "EDIT",
                    profile: {
                        owner: this.props.userId,
                        level: level + Math.floor((xp + currentExp)/500),
                        currentExp: Math.ceil((xp + currentExp)%500)
                    }
                })
            } 

            this.setState({score: scoreEval}, () => finishQuiz(this.state.score, xp, (this.state.initialTime - this.state.time)));
        }
        else {
            this.setState({score: scoreEval}, () => finishQuiz(this.state.score, 0, (this.state.initialTime - this.state.time)));
        }
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
        this.setState({isClicked: true});

        const checks = document.getElementsByClassName('filled-in');
        const answerCompare = []
        for (let i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                answerCompare.push(checks[i].value);
            }
        }
        this.scoreHandler(answerCompare, this.state.questions);
        this.setState({isDisabled: true});

        //reset time so that time is reset for another take of quiz
        document.cookie = ("totalTime=" + this.state.timeForCookie + "; path=/play/" + this.state.id);
        e.preventDefault();

    }

    render() {
        if(! this.state.isPublished){
            return <h4>This Quiz Is Private</h4>
        }

        var questionBase = 0;
        var questionRange = [0];
        return (
            <div className="row">
                <div className="container" style={{ backgroundColor: 'ivory', height: "60px" }}>
                    <div>
                        <h className="quiz">{this.state.name}</h>
                        {/* {this.state.timedOption? <span id="timer" style={{ paddingLeft: '340px', height: "20px" }}>Time Left: {this.state.quizTime.h}<b>h</b> {this.state.quizTime.m}<b>m</b> {this.state.quizTime.s}<b>s</b></span> : <span></span>} */}
                        {this.state.timedOption? <span id="timer" style={{ paddingLeft: '340px', height: "20px" }}>Time Left: {Math.floor(document.cookie.split(";")[0].split("=")[1]/3600)}<b>h</b> {Math.floor((document.cookie.split(";")[0].split("=")[1]%3600)/60)}<b>m</b> {Math.ceil((document.cookie.split(";")[0].split("=")[1]%3600)%60)}<b>s</b></span> : <span></span>}      
                    </div>
                </div>
                <div className="col s12">
                    <div className="quizcontent" style={{ paddingLeft: "150px", paddingTop: '30px' }}>
                        <div className="description"> Quiz Description: {this.state.description}</div>
                        {this.state.questions.map((q, qi) => {
                            return (
                                <div className="question" key={qi}>
                                    <br/>
                                    <p className="questiontitle">{q.title}</p>
                                    <div className="qpoints" >({q.score}points)</div>
                                <div style={{visibility: "hidden"}} key={qi}>
                                    {questionBase = questionBase + q.choices.length}
                                    {questionRange.push(questionBase)}
                                </div>
                                    {this.state.questions[qi].choices.map((choice, ci) => {
                                        return (
                                            <div className="row" key={ci}>
                                                <label>
                                                    <input type="checkbox" className="filled-in" value={ci+1} onClick={(e)=>this.allowOne(e, questionRange.slice(qi, qi+2))} disabled={this.state.isDisabled}/>
                                                    <span className="choices">{choice.content}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                        <div className='row' style={{ textAlign: "right" }}>
                            <div className="waves-effect waves-dark btn-small" onClick={this.onSubmit}>Finish</div>
                            <QuizResult showAnsOption={this.state.showAnsOption}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PlayQuizContent);
