import React, {useContext, useState, useEffect, Component} from 'react';
import { useRouteMatch } from "react-router-dom";
import { withRouter } from "react-router";
import { QuizzesContext } from "../../context/QuizState";
import {Modal} from 'react-responsive-modal';
import { UPDATE_PROFILE } from '../../types/actionTypes';

class EditQuizContent extends Component{
    static contextType = QuizzesContext;

    constructor(){
        super();
        this.state = {
            id: "",
            userId: "",
            name: "",
            description: "",
            timed: false, 
            retake: false, 
            showQuestion: false, 
            showAnswer: false,
            likes: 0,
            created: "",
            EXP: 0,
            questions:[],
            answers: [],
            isPublished: false,
            openModal: false
        };
    }
    
    getItem = async (id, getQuizzes) => {
        const setCurrentQuiz = async (id) => {
            //const id = quizId.params.id;
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
        this.setState({
            id: quiz._id,
            userId: quiz.userId,
            name: quiz.name,
            description: quiz.description,
            timed: quiz.timed, 
            retake: quiz.retake, 
            showQuestion: quiz.showQuestion, 
            showAnswer: quiz.showAnswer,
            likes: quiz.likes,
            created: quiz.created,
            EXP: quiz.EXP,
            questions: quiz.questions,
            answers: quiz.answers,
            isPublished: quiz.isPublished
        });
    }
    handleDelete = async (deleteQuiz) => {
        deleteQuiz(this.id);
        document.location.href = "/";
    }

    nameHandler = (e) => {
        this.setState({name: e.target.value});
    }
    descriptionHandler = (e) => {
        this.setState({description: e.target.value});
    }
    handleAddAnswer = () => {
        this.setState({answers: [...this.state.answers, ""]});
    }
    handleAnswerRemove = item => {
        const list = [...this.state.answers];
        if(list.length > 1){list.splice(item, 1);}
        this.setState({answers: list});
    }
    handleAddQuestion = () => {
        this.setState({questions: [...this.state.questions, ""]});
    }
    handleQuestionRemove = item => {
        const list = [...this.state.questions];
        if(list.length > 1){list.splice(item, 1);}
        this.setState({questions: list});
    }
    questionHandler = (e) => {
        const l = this.state.questions.length;
        if (l != 1 ){
            this.state.questions[l-1] = e.target.value;
        }
        else{
            this.state.questions[0] = e.target.value;
        }
        console.log(this.state.questions);
    }
    //+answers would be nested as it corresponds to different questions
    //so answerHandler would be changed 
    answerHandler = (e) => {
        const l = this.state.answers.length;
        if (l != 1 ){
            this.state.answers[l-1] = e.target.value;
        }
        else{
            this.state.answers[0] = e.target.value;
        }
        console.log(this.state.answers);
    }
    timedHandler = () => {
        this.state.timed = !this.state.timed;
        console.log(this.state);
    }
    retakeHandler = () => {
        this.state.retake = !this.state.retake;
        console.log(this.state);
    }
    showQHandler = () => {
        this.state.showQuestion = !this.state.showQuestion;
        console.log(this.state);
    }
    showAHandler = () => {
        this.state.showAnswer = !this.state.showAnswer;
        console.log(this.state);
    }


    handleSave = async e => {
        e.preventDefault();
        console.log("current quiz: ", this.state);
        
        const { updateQuiz } = this.context;
        const updateFQuiz = {
            id: this.state.id, 
            userId: this.state.userId,
            name: this.state.name,
            description: this.state.description,
            timed: this.state.timed, 
            retake: this.state.retake, 
            showQuestion: this.state.showQuestion, 
            showAnswer: this.state.showAnswer,
            likes: this.state.likes,
            created: this.state.created,
            EXP: this.state.EXP,
            questions: this.state.questions,
            answers: this.state.answers,
            isPublished: this.state.isPublished    
        }
        updateQuiz(updateFQuiz);
    }
    handlePublish = (e) => {
        e.preventDefault();
        this.state.isPublished = true;
        console.log("current quiz: ", this.state);
        
        const { updateQuiz } = this.context;
        const updateFQuiz = {
            id: this.state.id, 
            userId: this.state.userId,
            name: this.state.name,
            description: this.state.description,
            timed: this.state.timed, 
            retake: this.state.retake, 
            showQuestion: this.state.showQuestion, 
            showAnswer: this.state.showAnswer,
            likes: this.state.likes,
            created: this.state.created,
            EXP: this.state.EXP,
            questions: this.state.questions,
            answers: this.state.answers,
            isPublished: this.state.isPublished    
        }
        updateQuiz(updateFQuiz);
        
    }
    handleUnpublish = (e) => {
        e.preventDefault();
        this.state.isPublished = false;
        console.log("current quiz: ", this.state);
        
        const { updateQuiz } = this.context;
        const updateFQuiz = {
            id: this.state.id, 
            userId: this.state.userId,
            name: this.state.name,
            description: this.state.description,
            timed: this.state.timed, 
            retake: this.state.retake, 
            showQuestion: this.state.showQuestion, 
            showAnswer: this.state.showAnswer,
            likes: this.state.likes,
            created: this.state.created,
            EXP: this.state.EXP,
            questions: this.state.questions,
            answers: this.state.answers,
            isPublished: this.state.isPublished    
        }
        updateQuiz(updateFQuiz);
    }
    
    onOpenModal = e => {
        e.preventDefault();
        this.setState({openModal: true});
    }
    onCloseModal = e => {
        e.preventDefault();
        this.setState({openModal: false});
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        const { getQuizzes } = this.context;
        this.getItem(id, getQuizzes);  
    }
    

    render(){
        const { updateQuiz, deleteQuiz } = this.context;

            return(
                <div className="row section" style={{padding: '35px'}}>                
                    <div className="col s6">
                        <div className="section input-field">Quiz Name
                            <input id="quiz_name" type="text" className="validate" placeholder="Quiz Name" defaultValue={this.state.name} onChange={this.nameHandler}/>
                        </div>
                        <div className="section input-field">Description
                        <textarea id="textarea1" className="materialize-textarea" placeholder="This is about" defaultValue={this.state.description} onChange={this.descriptionHandler}></textarea>
                        </div>
                    </div>
                    <div className="col s6" style={{paddingLeft: '100px', paddingTop: '30px'}}>
                        <form action="#">
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in" defaultChecked={this.state.timed} onClick={this.timedHandler}/>
                                    <span>Timed quiz</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in" defaultChecked={this.state.retake} onClick={this.retakeHandler}/>
                                    <span>Allow retake</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in" defaultChecked={this.state.showQuestion} onClick={this.showQHandler}/>
                                    <span>Show questions one at a time</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" className="filled-in" defaultChecked={this.state.showAnswer} onClick={this.showAHandler}/>
                                    <span>Show answer after submission</span>
                                </label>
                            </p>
                        </form>
                    </div>
                    {this.state.questions.map((q) => {
                        return(
                            <div className="section col s12" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '20px', margin: '10px'}}>
                                <textarea type="text" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '10px', paddingBottom: '70px'}} placeholder="Question" onChange={this.questionHandler}/>
                                <div className="col s6" style={{padding: '20px'}}>
                                    <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} ><i className="material-icons" onClick={this.handleAddAnswer}>add</i></button>
                                    <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}}><i className="material-icons" onClick={this.handleAnswerRemove}>remove</i></button>
                                    {this.state.answers.map((a) => {
                                        return(
                                            <div className="text-box">
                                                <input name="answer" placeholder="Answer choice" onChange={this.answerHandler}/>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="col s5" style={{textAlign: 'right', padding: '30px'}}>
                                    Set Score:
                                </div>
                                <input className="col s1"></input>
                            </div>
                        )
                    })}
                    <div className="section col s12" style={{padding: "20px"}}>
                            <div className="col s4">
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Undo</a>
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Redo</a>
                            </div>
                            <div className="col s4">
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={this.handleAddQuestion}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={this.handleQuestionRemove}><i className="material-icons">remove</i></button>
                            </div>
                            <div className="col s4">
                                <div className="row">
                                    <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={this.handleSave}>Save</a>
                                    <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={this.handlePublish} >Publish</a>
                                    <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={this.handleUnpublish} >Publish</a>
                                </div>
                                <button className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={this.onOpenModal}>
                                    Delete
                                </button>
                                <Modal open={this.state.openModal}>
                                    <div className="modal-content">
                                        <h4>Will you really delete this quiz?</h4>
                                    </div>
                                    <div className="modal-footer">
                                        <a className="modal-close waves-effect waves-green btn-flat red" >Yes</a>
                                        <a className="modal-close waves-effect waves-green btn-flat" onClick={this.onCloseModal}>No</a>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                </div>
            )
    }
}

export default withRouter(EditQuizContent);