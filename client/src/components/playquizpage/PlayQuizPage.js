import React, { useContext } from 'react';
import "materialize-css/dist/css/materialize.min.css";
import PlayQuizContent from './PlayQuizContent';
import { QuizzesContext } from '../../context/QuizState';
import QuizResult from './QuizResult';
export default function PlayQuizPage() {
    return (
        <div>
            <PlayQuizContent />
        </div>
    )
}