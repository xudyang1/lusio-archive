import React, {useContext, useEffect} from 'react';
import "materialize-css/dist/css/materialize.min.css";
import PlayQuizContent from './PlayQuizContent';
import { QuizzesContext } from '../../context/QuizState';
import M from 'materialize-css';

export default function QuizResult(){
    const { isPlaying } = useContext(QuizzesContext);
    console.log("Is the user playing the quiz?", isPlaying);
    useEffect(() => {
        var elem = document.querySelector('#quizResultModal')
        var opt = { preventScrolling: false};
        M.Modal.init(elem, opt);
    })
    return(
        <div id="quizResultModal" className="modal">    
            <div>
                <div className="modal-content">
                    <h3>You finished taking the quiz</h3>
                </div>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat">RETAKE</a>
                </div>
            </div>
        </div>
    )
}