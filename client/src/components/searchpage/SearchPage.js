import React from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import { AppNavbar } from '../common/AppNavbar';
import 'materialize-css';
import QuizCardWraper from "./frontpage/QuizCardWraper";

// sample data
const quiz = [
    {id: '1', name: 'Q1', description: 'Description for Q1'},
    {id: '2', name: 'Q2', description: 'Description for Q2'},
    {id: '3', name: 'Q3', description: 'Description for Q3'},
    {id: '4', name: 'Q4', description: 'Description for Q4'}
]

const SearchPage = () => {
    const { search } = window.location;
    const filterQuizzes = (quiz, query) => {
        if (!query){
            return quiz;
        }
        return (
            quiz.filter((quiz) => {
            const quizName = quiz.name.toLowerCase();
            return quizName.includes(query.toLowerCase());
        }));
    };
    const query = new URLSearchParams(search).get('search');
    const filteredQuizzes = filterQuizzes(quiz, query);
    
    return(
        <div>
            <AppNavbar/>
            <div class="row">
                <div class="input-field col s2">
                    <select className="browser-default">
                        <option value="" disabled selected>Sort</option>
                        <option value="1">Relevance</option>
                        <option value="2">Date Created</option>
                        <option value="3">Likes</option>
                        <option value="4">Name (A-Z)</option>
                    </select>
                </div>
                <div class="input-field col s2">
                    <select className="browser-default">
                        <option value="" disabled selected>Filter</option>
                        <option value="1">Quiz</option>
                        <option value="2">Platform</option>
                        <option value="3">User (Author)</option>
                    </select>
                </div>
            </div>
            <div>
                {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map((quiz) => (
                        <QuizCardWraper id={quiz.id} name={quiz.name} description={quiz.description} />
                ))) : (
                    <div>Sorry, No Results Found</div>
                )}
            </div>
        </div>
    )
}

export default SearchPage;