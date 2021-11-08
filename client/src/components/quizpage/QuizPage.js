import React from 'react';
import { useParams } from 'react-router';
import Question from './Question';
//import { AppNavbar } from '../AppNavbar';

export default function QuizPage() {
    const {id} = useParams();
    return (
        <div>
            Quiz Title id: {id}
            Quiz description
            <Question/>
        </div>
    )
}