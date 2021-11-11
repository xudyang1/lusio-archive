import React, {useContext, useState, useEffect} from 'react';
import { useRouteMatch } from "react-router-dom";
import { QuizzesContext } from "../../context/QuizState";
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";
import { UPDATE_PROFILE } from '../../types/actionTypes';


export default function EditQuizPage(){
    const { getQuizzes ,updateQuiz, deleteQuiz } = useContext(QuizzesContext);
    const [currentQuiz, setQuiz] = useState([]);
    const [answerList, setAnswerList] = useState([{answer: ""}]);
    const [questionList, setQuestionList] = useState([{question: ""}]);
    
    const quizId = useRouteMatch("/edit/:id");
    
    const setCurrentQuiz = async e => {
        const id = quizId.params.id;
        const quizzes = () => {
            return getQuizzes()
            .then(function(result){
                return result;
                console.log("result is", result);
            })
        }
        const quizL = await quizzes();
        console.log("QuizList is ",quizL.data);
        const quiz = quizL.data.filter(q => q._id === id);
    
        console.log("Quiz", quiz[0]);
        setQuiz(quiz[0]);
    }
    const initiation = () => {
        setCurrentQuiz();
        //setQuestionList(currentQuiz.questions);
        //setAnswerList(currentQuiz.answers);
    }
    
    //updateQuiz({quizId: id, userId, name, description, likes, created, EXP, questions});
    const handleAddAnswer = () => {
        setAnswerList([...answerList, { answer: "" }]);
        currentQuiz.answers = [...currentQuiz.answers, ""];

    }
    const handleAnswerRemove = item => {
        const list = [...answerList];
        if(list.length > 1){list.splice(item, 1);}
        setAnswerList(list);
    }
    const handleAddQuestion = () => {
        setQuestionList([...questionList, { question: "" }]);
        currentQuiz.questions = [...currentQuiz.questions, ""];
    }
    const handleQuestionRemove = item => {
        const list = [...questionList];
        if(list.length > 1){list.splice(item, 1);}
        setQuestionList(list);
    }
    const handleDelete = async e => {
        e.preventDefault();
        const id = quizId.params.id;
        deleteQuiz(id);
        document.location.href = "/";
    }
    const nameHandler = (e) => {
        currentQuiz.name = e.target.value;
        console.log(currentQuiz);
    }
    const descriptionHandler = (e) => {
        currentQuiz.description = e.target.value;
        console.log(currentQuiz);
    }
    const questionHandler = (e) => {
        const l = currentQuiz.questions.length;
        if (l != 1 ){
            currentQuiz.questions[l-1] = e.target.value;
        }
        else{
            currentQuiz.questions[0] = e.target.value;
        }
        
        console.log(currentQuiz.questions);
    }
    const answerHandler = (e) => {
        const l = currentQuiz.answers.length;
        if (l != 1 ){
            currentQuiz.answers[l-1] = e.target.value;
        }
        else{
            currentQuiz.answers[0] = e.target.value;
        }
        console.log(currentQuiz.answers);
    }
    const timedHandler = () => {
        currentQuiz.timed = !currentQuiz.timed;
    }
    const retakeHandler = () => {
        currentQuiz.retake = !currentQuiz.retake;
    }
    const showQHandler = () => {
        currentQuiz.showQuestion = !currentQuiz.showQuestion;
    }
    const showAHandler = () => {
        currentQuiz.showAnswer = !currentQuiz.showAnswer;
    }
    const handleSave = async e => {
        e.preventDefault();
        console.log("current quiz: ", currentQuiz);
        const saveQuiz = {
            id: currentQuiz._id, 
            userId: currentQuiz.userId,
            name: currentQuiz.name,
            description: currentQuiz.description,
            timed: currentQuiz.timed, 
            retake: currentQuiz.retake, 
            showQuestion: currentQuiz.showQuestion, 
            showAnswer: currentQuiz.showAnswer,
            likes: currentQuiz.likes,
            created: currentQuiz.created,
            EXP: currentQuiz.EXP,
            questions: currentQuiz.questions,
            answers: currentQuiz.answers,
            isPublished: currentQuiz.isPublished
        }
        updateQuiz(saveQuiz);
    }
    const handlePublish = (e) => {
        e.preventDefault();
        currentQuiz.isPublished = true;
        
        console.log("current quiz: ", currentQuiz);
        const publishQuiz = {
            id: currentQuiz._id, 
            userId: currentQuiz.userId,
            name: currentQuiz.name,
            description: currentQuiz.description,
            timed: currentQuiz.timed, 
            retake: currentQuiz.retake, 
            showQuestion: currentQuiz.showQuestion, 
            showAnswer: currentQuiz.showAnswer,
            likes: currentQuiz.likes,
            created: currentQuiz.created,
            EXP: currentQuiz.EXP,
            questions: currentQuiz.questions,
            answers: currentQuiz.answers,
            isPublished: currentQuiz.isPublished
        }
        updateQuiz(publishQuiz);
    }
    const handleUnpublish = (e) => {
        e.preventDefault();
        currentQuiz.isPublished = false;
        
        console.log("quiz 'published' status: ", currentQuiz.isPublished);
        const publishQuiz = {
            id: currentQuiz._id, 
            userId: currentQuiz.userId,
            name: currentQuiz.name,
            description: currentQuiz.description,
            timed: currentQuiz.timed, 
            retake: currentQuiz.retake, 
            showQuestion: currentQuiz.showQuestion, 
            showAnswer: currentQuiz.showAnswer,
            likes: currentQuiz.likes,
            created: currentQuiz.created,
            EXP: currentQuiz.EXP,
            questions: currentQuiz.questions,
            answers: currentQuiz.answers,
            isPublished: currentQuiz.isPublished
        }
        updateQuiz(publishQuiz);
    }

    useEffect(() => {
        var elem = document.querySelector('#editModal')
        var options = {
            preventScrolling: false,
        };
        M.Modal.init(elem, options);
    })
        return(
            <div className="row section" style={{padding: '35px'}}>                
                <button onClick={initiation}>Retrieve Data</button>
                <div className="col s6">
                    <div className="section input-field">Quiz Name
                        <input id="quiz_name" type="text" className="validate" placeholder="Quiz Name" onChange={nameHandler} />
                    </div>
                    <div className="section input-field">Description
                    <textarea id="textarea1" className="materialize-textarea" placeholder="This is about" onChange={descriptionHandler}></textarea>
                    </div>
                </div>
                <div className="col s6" style={{paddingLeft: '100px', paddingTop: '30px'}}>
                    <form action="#">
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" onClick={timedHandler} />
                                <span>Timed quiz</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" onClick={retakeHandler}/>
                                <span>Allow retake</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" onClick={showQHandler}/>
                                <span>Show questions one at a time</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" onClick={showAHandler} />
                                <span>Show answer after submission</span>
                            </label>
                        </p>
                    </form>
                </div>
                {questionList.map((q) => {
                    return(
                        <div className="section col s12" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '20px', margin: '10px'}}>
                            <textarea type="text" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '10px', paddingBottom: '70px'}} placeholder="Question" onChange={questionHandler} />
                            <div className="col s6" style={{padding: '20px'}}>
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleAddAnswer}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleAnswerRemove}><i className="material-icons">remove</i></button>
                                {answerList.map((a) => {
                                    return(
                                        <div className="text-box">
                                            <input name="answer" placeholder="Answer choice" onChange={answerHandler} />
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
                            <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleAddQuestion}><i className="material-icons">add</i></button>
                            <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleQuestionRemove}><i className="material-icons">remove</i></button>
                        </div>
                        <div className="col s4">
                            <div className="row">
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={handleSave}>Save</a>
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={handlePublish}>Publish</a>
                                <a className="waves-effect waves-light btn-small" style={{margin: "5px"}} onClick={handleUnpublish}>Unpublish</a>
                            </div>
                            <a className="waves-effect waves-light btn-small red modal-trigger" href="#editModal" style={{margin: "5px"}}>
                                Delete
                            </a>
                            <div id="editModal" className="modal">
                                <div className="modal-content">
                                    <h4>Will you really delete this quiz?</h4>
                                </div>
                                <div className="modal-footer">
                                    <a onClick={handleDelete} className="modal-close waves-effect waves-green btn-flat red">Yes</a>
                                    <a className="modal-close waves-effect waves-green btn-flat">No</a>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
}
