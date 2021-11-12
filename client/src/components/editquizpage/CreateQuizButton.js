import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthState";
import { QuizzesContext } from "../../context/QuizState";
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";



export const CreateQuizButton = () => {
    const {isAuthenticated, user } = useContext(AuthContext);
    const { addQuiz } = useContext(QuizzesContext);

    const handleCreate = async e => {
        e.preventDefault();

        const quiz = { userId: user.id, name: "", description: "", timed: false, retake: false, showQuestion: false, showAnswer: false, likes: 0, created: new Date().getTime(), EXP: 0, questions: [""], answers: [[""],[""],[""],[""],[""]], isPublished: false};
        /*
        const res = await fetch('/api/quizzes/edit', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(quiz)
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            return responseData.quiz.id;
        })
        */
        const getID = () => {
            return (addQuiz(quiz))
            .then(function(res){
                return res;
            })
        }
        const id = await getID();
        document.location.href = "/edit/" + id;
        //return id;
    }

    useEffect(() => {
        var elem = document.querySelector('#quizModal')
        var options = {
            preventScrolling: false,
        };
        M.Modal.init(elem, options);
    })

    return(
        <div>
            <a className="waves-effect waves-light btn modal-trigger" href="#quizModal">
                Create New Quiz
            </a>
            <div id="quizModal" className="modal">
                {isAuthenticated ? (
                <div>
                    <div className="modal-content">
                        <h4>Would you like to create a new quiz?</h4>
                    </div>
                    <div className="modal-footer">
                        <a onClick={handleCreate} className="modal-close waves-effect waves-green btn-flat">CREATE</a>
                    </div>
                </div>) :
                (<div>
                    <div className="modal-content">
                        <h4>Please login first</h4>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat">OK</a>
                    </div>
                </div>)
                }
            </div>
        </div>
    )
}