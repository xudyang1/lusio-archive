import React, {useContext, useEffect, useState} from 'react';
import "materialize-css/dist/css/materialize.min.css";
import { QuizzesContext } from '../../context/QuizState';
import { AuthContext } from '../../context/AuthState';
import { ProfileContext } from '../../context/ProfileState';

import {useParams} from 'react-router-dom';
import M from 'materialize-css';

export default function QuizResult(){
    const { isPlaying , score , xp, timeSpent, updateQuiz, getQuiz, quiz} = useContext(QuizzesContext);
    const { isAuthenticated, user } = useContext(AuthContext);
    const { updateProfile, getProfile } = useContext(ProfileContext);

    const [isVisible, setVisibility] = useState("hidden");
    const [checked, setChecked] = useState(false);
    const [rank, setRank] = useState(null);
    const { id } = useParams();

    const routeToQuiz = (e) => {
        document.location.href = "/quiz/" + id;
    }

    const routeToAnswers = (e) => {
        document.location.href = "/answers/" + id;
    }

    //retrieving data of quiz board
    //to update leaderboard
    const forRankCheck = async e => {
        //may change after making changes to reducer
        const quizContent = await getQuiz(id, false);
        const quiz = quizContent.data;
        const initialSB = quiz.scoreBoard;
        console.log(initialSB);
        
        if(isAuthenticated){
            rankCheck(user.name, score, initialSB);
            alert("Only up to 10th place will be displayed.");
        }
        if(!isAuthenticated){
            alert("You need to login first");
        }
    }

    

    //Changes in the ranking if the current user has higher score
    //than the user in the scoreboard
    //TODO: discuss about the circumstance of tying score
    const rankCheck = (currentUser, currentScore, initialSB) => {
        if (!checked){
            setRank("11+");
            for (var i = 0; i < initialSB.length; i++) {
            if (initialSB[i].userScore <= currentScore) {
                console.log(currentScore);
                setRank(i+1);
                setVisibility("visible");
                initialSB.splice(i, 0, {userName: currentUser, userScore: currentScore});
                break;
            }
            }

            updateScoreboard(initialSB.slice(0,10));
        }
        else{
            alert("You already updated your score.");
        }
        setChecked(true);
      }
    
    const updateScoreboard = async (updatedSB) => {
        const updateFQuiz = {
            id: id,
            scoreBoard: updatedSB
        };
        updateQuiz(updateFQuiz);
        

        const getQuizzesScoreL = () => { 
            return (getProfile(user.profile)).then(function (result)
             {return result.data.profile.quizzesScore;});
        }
        const qScoreList = await getQuizzesScoreL();
        console.log("QuizzesScore are", qScoreList);

        //check if score already exists in quizzesScore
        for(var i=0; i < qScoreList.length; i++){
            if (qScoreList[i].split(":")[0] == quiz._id){
                //console.log("index", i);
                updateProfile({
                    mode: "DELETE",
                    profile: {
                        owner: user.profile,
                        quizzesScore: qScoreList[i]
                    }
                })
            }
        }
        //storing quiz score in quizzesScore database
        updateProfile({
            mode: "ADD",
            profile: {
                owner: user.profile,
                quizzesScore: quiz._id + ":" + score.toString()
            }
        })
        //window.location.reload(false);
        //routeToQuiz();
    }
    const alertMessage = () => {
        alert("Your score will not be updated automatically. Make sure you update your score first.");
    }
    


    useEffect(() => {
        if (!isPlaying){
            document.getElementById('quizResultModal').click();
        }

        var elem = document.querySelector('#quizResultModal')
        var opt = { preventScrolling: false };
        M.Modal.init(elem, opt);

        var elem2 = document.querySelector('#quizAnswersModal')
        M.Modal.init(elem2, opt); 
    },[])


    return(
        <div>
            <br/>
            {!isPlaying ?
            <a className="waves-effect waves-light btn modal-trigger" href="#quizResultModal">
                Results
            </a>
            : null}
            <div id="quizResultModal" className="modal black-text">
                {!isPlaying ?
                (<div>
                    <div className="modal-content" style={{textAlign: "center"}}>
                        <h6>You finished taking the quiz</h6>
                        <h3>Your Score {score}</h3>
                        <h4>You earned {xp}xp</h4>
                        <h5>Time Spent: <br/> {Math.floor(timeSpent/3600)}hours {Math.floor(timeSpent/60)}minutes {timeSpent%60}seconds</h5>
                        <a className="waves-effect waves-light btn" onClick={forRankCheck}>
                            Update Score on Scoreboard
                        </a>
                        <h6 visibility={isVisible}>Your rank is {rank}</h6>
                    </div>
                    <div className="modal-footer">  
                        <a className="modal-close waves-effect waves-green btn-flat" onClick={routeToQuiz}>Return to Quiz</a>
                    </div>
                </div>)
                :
                (<div>
                    <div className="modal-content" style={{textAlign: "center"}}>
                        <h6>You have to finish your quiz to see the results.</h6>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat">Return</a>
                    </div>
                </div>)
                }
            </div>
           {!isPlaying ? 
           <a href="#quizAnswersModal" className="waves-effect waves-light btn modal-trigger" onClick={alertMessage}>Review Answers</a>
           : null }
            <div id="quizAnswersModal" className="modal">
                <div className="modal-content" style={{textAlign:"center"}}>
                {quiz.showAnsOption ?  
                <h6 onClick={routeToAnswers}><u>Review Answers</u></h6>
                : <h6>Reviewing answers is not available for this quiz.</h6>}
                {quiz.showAnsOption && !isPlaying ? 
                <a className="waves-effect waves-light btn" onClick={forRankCheck}>
                    Update Score First
                </a>
                : null}
                <h6>Your rank is {rank}</h6>
                </div>
            </div> 
            
        </div>
    )
}