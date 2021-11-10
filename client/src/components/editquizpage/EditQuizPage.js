import React, {Component, useState, useEffect} from 'react';
import '../../css/frontpage.css';
import { updateQuiz, deleteQuiz } from '../../actions/QuizActions';


export default function EditQuizPage(){
    
    const [answerList, setAnswerList] = useState([{answer: ""}]);
    const [questionList, setQuestionList] = useState([{question: ""}]);

    const handleAddAnswer = () => {
        setAnswerList([...answerList, { answer: "" }]);
    }
    const handleAnswerRemove = item => {
        const list = [...answerList];
        if(list.length > 1){list.splice(item, 1);}
        setAnswerList(list);
    }
    const handleAddQuestion = () => {
        setQuestionList([...questionList, { question: "" }]);
    }
    const handleQuestionRemove = item => {
        const list = [...questionList];
        if(list.length > 1){list.splice(item, 1);}
        setQuestionList(list);
    }
        return(
            <div className="row section" style={{padding: '35px'}}>                
                <div className="col s6">
                    <div className="section input-field">Quiz Name
                        <input id="quiz_name" type="text" className="validate" placeholder="Quiz Name" />
                    </div>
                    <div className="section input-field">Description
                    <textarea id="textarea1" className="materialize-textarea" placeholder="This is about..."></textarea>
                    </div>
                </div>
                <div className="col s6" style={{paddingLeft: '100px', paddingTop: '30px'}}>
                    <form action="#">
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" />
                                <span>Timed quiz</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" />
                                <span>Allow retake</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" />
                                <span>Show questions one at a time</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" />
                                <span>Show answer after submission</span>
                            </label>
                        </p>
                    </form>
                </div>
                {questionList.map((x, i) => {
                    return(
                        <div className="section col s12" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '20px', margin: '10px'}}>
                            <textarea type="text" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '10px', paddingBottom: '70px'}} placeholder="Question" />
                            <div className="col s6" style={{padding: '20px'}}>
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleAddAnswer}><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleAnswerRemove}><i className="material-icons">remove</i></button>
                                {answerList.map((x, i) => {
                                    return(
                                        <div className="text-box">
                                            <input name="answer" placeholder="Answer choice" value={x.answer} />
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
                            <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Save</a>
                            <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Publish</a>
                            <a className="waves-effect waves-light btn-small" style={{margin: "5px"}}>Delete</a>
                        </div>
                    </div>
            </div>
        )
}
