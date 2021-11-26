import React, {useContext, useEffect} from 'react';
import "materialize-css/dist/css/materialize.min.css";
import PlayQuizContent from './PlayQuizContent';
import { QuizzesContext } from '../../context/QuizState';
import { AuthContext } from '../../context/AuthState';

import {useParams} from 'react-router-dom';
import M from 'materialize-css';

export default function QuizResult(){
    const { isPlaying , score , timeSpent, updateQuiz, getQuiz} = useContext(QuizzesContext);
    const { isAuthenticated, user } = useContext(AuthContext);
    const { id } = useParams();

    //retrieving data of quiz board
    //to update leaderboard
    const forRankCheck = async e => {
        const quizContent = await getQuiz(id, false);
        const quiz = quizContent.data;
        const initialSB = quiz.scoreBoard;
        console.log(initialSB);
        
        if(isAuthenticated){
            rankCheck(user.name, score, initialSB);
        }
        if(!isAuthenticated){
            alert("You need to login first");
        }
    }

    //Changes in the ranking if the current user has higher score
    //than the user in the scoreboard
    //TODO: discuss about the circumstance of tying score
    const rankCheck = (currentUser, currentScore, initialSB) => {
        for (var i = 0; i < initialSB.length; i++) {
          if (initialSB[i].userScore <= currentScore) {
            console.log(currentScore);
            initialSB.splice(i, 0, {userName: currentUser, userScore: currentScore});
            break;
          }
        }
        //console.log(initialSB);
        //console.log("updated scoreboard", initialSB.slice(0,3));
        updateScoreboard(initialSB.slice(0,3));
      }
    
    const updateScoreboard = (updatedSB) => {
        const updateFQuiz = {
            id: id,
            scoreBoard: updatedSB
        };
        updateQuiz(updateFQuiz);
    }

    useEffect(() => {
        var elem = document.querySelector('#quizResultModal')
        var opt = { preventScrolling: false};
        M.Modal.init(elem, opt);
    })
    return(
        <div>
            <a className="waves-effect waves-light btn modal-trigger" href="#quizResultModal">
                Results
            </a>
            <div id="quizResultModal" className="modal black-text">    
                {!isPlaying ?
                (<div>
                    <div className="modal-content">
                        <h6>You finished taking the quiz</h6>
                        <h3>Your Score {score}</h3>
                        <h5>Time Spent: {timeSpent}</h5>
                        <a className="waves-effect waves-light btn" onClick={forRankCheck}>
                            Check Scoreboard
                        </a>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat">Return</a>
                    </div>
                </div>)
                :
                (<div>
                    <div className="modal-content">
                        <h6>You have to finish your quiz to see the results.</h6>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat">Return</a>
                    </div>
                </div>)
                }
            </div>
        </div>
    )
}