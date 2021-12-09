import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthState";
import { QuizzesContext } from "../../context/QuizState";
import { ProfileContext } from "../../context/ProfileState";
import { PlatformContext } from "../../context/PlatformState";
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";


export const CreateQuizButton = () => {
    const {isAuthenticated, user } = useContext(AuthContext);
    const { addQuiz } = useContext(QuizzesContext);
    const {updateProfile, profile} = useContext(ProfileContext);
    const { platform } = useContext(PlatformContext);

    const handleCreate = async e => {
        e.preventDefault();
        console.log(user.profile);
        const quiz = { 
            userId: user.profile,
            //TODO: chang to platform._id 
            platformId: platform.name, 
            name: "", 
            author: user.name, 
            quizImgURI: "https://c4.wallpaperflare.com/wallpaper/967/372/978/gray-simple-background-gradient-wallpaper-preview.jpg",
            description: "", 
            timedOption: false,
            time: 0,
            showAnsOption: false,
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
            isPublished: false,
            scoreBoard: [{userName: "", userScore: 0},{userName: "", userScore: 0},{userName: "", userScore: 0},{userName: "", userScore: 0},{userName: "", userScore: 0},{userName: "", userScore: 0},{userName: "", userScore: 0},{userName: "", userScore: 0},{userName: "", userScore: 0},{userName: "", userScore: 0}],
            comments: []
        }; 
        
        const getID = () => {
            return (addQuiz(quiz)).then(function(res) {
                    return res;
                });
        }
        const id = await getID();

        updateProfile({
            mode: "ADD",
            profile: {
                owner: profile._id,
                quizzesCreated: id
            }
        })
        
        document.location.href = "/edit/" + id;
    }

    useEffect(() => {
        var elem = document.querySelector('#quizModal')
        var options = {
            preventScrolling: false,
        };
        M.Modal.init(elem, options);
    }, [])

    return (
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