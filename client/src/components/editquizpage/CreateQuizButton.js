import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthState";
import { QuizzesContext } from "../../context/QuizState";
import { ProfileContext } from "../../context/ProfileState";
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";


export const CreateQuizButton = () => {
    const {isAuthenticated, user, loadUser } = useContext(AuthContext);
    const { addQuiz, getQuizzes } = useContext(QuizzesContext);
    const {updateProfile, profile} = useContext(ProfileContext);

    const handleCreate = async e => {
        //console.log(profile._id)
        e.preventDefault();

        const quiz = { 
        userId: profile._id, 
        name: "", 
        author: user.name, 
        description: "", 
        timedOption: false,
        time: 0,
        retakeOption: false,
        questions: [{
            title: "",
            choices: [{
                content: ""
            }], 
            answerKey: 1,
            score: 0
        }], 
        likes: 0,
        plays: 0,
        isPublished: false}; 
        //showQuestion: false, showAnswer: false, likes: 0, created: new Date().getTime(), EXP: 0, questions: [""], answers: [[""],[""],[""],[""],[""]], isPublished: false};
        
        //console.log("Before adding quiz: ", quiz);
        /*
        const res = await fetch('/api/quizzes/edit', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(quiz)
        });
        const body = await res;
        console.log(body);
        */
        
        const getID = () => {
            return (addQuiz(quiz))
            .then(function(res){
                return res;
            })
        }

        const id = await getID();

        //implement for adding quizzes to profile section
        //>>>>>quizzesCreated
        updateProfile({
            mode: "ADD",
            profile:{
                owner: profile._id,
                quizzesCreated: id
            }
        })
        //>>>>>>>>>>>>
        document.location.href = "/edit/" + id;
        //return id;
    }

    useEffect(() => {
        var elem = document.querySelector('#quizModal')
        var options = {
            preventScrolling: false,
        };
        M.Modal.init(elem, options);
    }, [])

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