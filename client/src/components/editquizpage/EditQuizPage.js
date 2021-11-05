import React, {Component, useState} from 'react';
import '../../css/frontpage.css';
import { addQuiz, getQuiz, deleteQuiz } from '../../actions/QuizActions';

import sampleQuiz from '../../sampleData/sampleQuiz';

export default function EditQuizPage(){
    const [answerList, setAnswerList] = useState([{answer: ""}]);
    const handleAdd = () => {
        setAnswerList([...answerList, { answer: "" }]);
    }
    const handleRemove = item => {
        const list = [...answerList];
        list.splice(item, 1);
        setAnswerList(list);
    }
    const handleAnswerChange = (e, item) => {
        const { name, value } = e.target;
        const list = [...answerList];
        list[item][name] = value;
        setAnswerList(list);
    }
        return(
            <div class="row section" style={{padding: '35px'}}>                
                <div class="col s6">
                    <div class="section input-field">Quiz Name
                        <input id="quiz_name" type="text" class="validate" />
                    </div>
                    <div class="section input-field">Description
                    <textarea id="textarea1" class="materialize-textarea"></textarea>
                    </div>
                </div>
                <div class="col s6">
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
                <div class="section col s12" style={{border: '1px solid rgba(0, 0, 0, 1)', padding: '20px'}}>
                    <div class="col s6">
                        <button class="btn-floating btn-large waves-effect waves-light red" onClick={handleAdd}><i class="material-icons">add</i></button>
                        <button class="btn-floating btn-large waves-effect waves-light red" onClick={handleRemove}><i class="material-icons">remove</i></button>
                        {answerList.map((x, i) => {
                            return(
                                <div className="text-box">
                                    <input name="answer" placeholder="Answer Choice" value={x.answer} onChange={e => handleAnswerChange(e, i)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div class="section col s12" style={{padding: "20px"}}>
                        <div class="col s4">
                            <a class="waves-effect waves-light btn-small">Undo</a>
                            <a class="waves-effect waves-light btn-small">Redo</a>
                        </div>
                        <div class="col s4">
                            <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
                        </div>
                        <div class="col s4">
                            <a class="waves-effect waves-light btn-small">Save</a>
                            <a class="waves-effect waves-light btn-small">Publish</a>
                            <a class="waves-effect waves-light btn-small">Delete</a>
                        </div>
                    </div>
            </div>
        )
}
