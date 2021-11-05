import React, {Component, useState, useEffect} from 'react';
import '../../css/frontpage.css';
import { addQuiz, deleteQuiz } from '../../actions/QuizActions';

import sampleQuiz from '../../sampleData/sampleQuiz';

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
            <div class="row section" style={{padding: '35px'}}>                
                <div class="col s6">
                    <div class="section input-field">Quiz Name
                        <input id="quiz_name" type="text" class="validate" placeholder="Quiz Name" />
                    </div>
                    <div class="section input-field">Description
                    <textarea id="textarea1" class="materialize-textarea" placeholder="This is about..."></textarea>
                    </div>
                </div>
                <div class="col s6" style={{paddingLeft: '100px', paddingTop: '30px'}}>
                    <form action="#">
                        <p>
                            <label>
                                <input type="checkbox" class="filled-in" />
                                <span>Timed quiz</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" class="filled-in" />
                                <span>Allow retake</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" class="filled-in" />
                                <span>Show questions one at a time</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" class="filled-in" />
                                <span>Show answer after submission</span>
                            </label>
                        </p>
                    </form>
                </div>
                {questionList.map((x, i) => {
                    return(
                        <div class="section col s12" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '20px', margin: '10px'}}>
                            <textarea type="text" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '10px', paddingBottom: '70px'}} placeholder="Question" />
                            <div class="col s6" style={{padding: '20px'}}>
                                <button class="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleAddAnswer}><i class="material-icons">add</i></button>
                                <button class="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleAnswerRemove}><i class="material-icons">remove</i></button>
                                {answerList.map((x, i) => {
                                    return(
                                        <div className="text-box">
                                            <input name="answer" placeholder="Answer choice" value={x.answer} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div class="col s5" style={{textAlign: 'right', padding: '30px'}}>
                                Set Score:
                            </div>
                            <input class="col s1"></input>
                        </div>
                    )
                })}
                <div class="section col s12" style={{padding: "20px"}}>
                        <div class="col s4">
                            <a class="waves-effect waves-light btn-small" style={{margin: "5px"}}>Undo</a>
                            <a class="waves-effect waves-light btn-small" style={{margin: "5px"}}>Redo</a>
                        </div>
                        <div class="col s4">
                            <button class="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleAddQuestion}><i class="material-icons">add</i></button>
                            <button class="btn-floating btn-large waves-effect waves-light red" style={{margin: "5px"}} onClick={handleQuestionRemove}><i class="material-icons">remove</i></button>
                        </div>
                        <div class="col s4">
                            <a class="waves-effect waves-light btn-small" style={{margin: "5px"}}>Save</a>
                            <a class="waves-effect waves-light btn-small" style={{margin: "5px"}}>Publish</a>
                            <a class="waves-effect waves-light btn-small" style={{margin: "5px"}}>Delete</a>
                        </div>
                    </div>
            </div>
        )
}
