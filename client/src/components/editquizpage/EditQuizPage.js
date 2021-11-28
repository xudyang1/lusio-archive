import React, { useEffect } from 'react';
import "materialize-css/dist/css/materialize.min.css";
import EditQuizContent from './EditQuizContent';
import { QuizzesContext } from '../../context/QuizState';
import { AuthContext } from '../../context/AuthState';
import { useParams } from 'react-router';
import { useState, useContext } from 'react';

export default function EditQuizPage(){
  //TODO: discuss whether to set
  //auth mode on the server side or control from the client side
  //two mode types if on server: PLAYER_VIEW (can play) | OWNER_VIEW (can edit, can play)
  const { getQuiz} = useContext(QuizzesContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [ isOwner, setMode ] = useState(false);
  const { id } = useParams();
  
  const checkMode = async e => {
    //may change after making changes to reducer
    const quizContent = await getQuiz(id, false);
    const quiz = quizContent.data;
    const owner = quiz.author;

    //console.log("can retake?", canRetake);
    if(isAuthenticated && owner == user.name){
        console.log("owner", owner);
        console.log("player's name", user.name);
        setMode(true);
    }
  }
  useEffect(()=> {
    checkMode();
  })
  return(
        <div>
          {isOwner ? <EditQuizContent/> : <div>You do not have access to this page.</div>}
        </div>
        )
}