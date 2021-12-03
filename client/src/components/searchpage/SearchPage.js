import React, { useContext, useState, useEffect } from 'react';
import 'materialize-css';
import SectionList from '../common/SectionList';
import { QUIZ_CARD } from '../../types/cardTypes';
import { QuizzesContext } from '../../context/QuizState';
import { PlatformContext } from '../../context/PlatformState';

// sample data
const squiz = [
    { id: '1', name: 'Q1', description: 'Description for Q1', author: 'Qwert', platformId: '1', likes: 4, createdAt: new Date('2010/01/22') },
    { id: '2', name: 'Q2', description: 'Description for Q2', author: 'qazx', platformId: '2', likes: 1, createdAt: new Date('2010/01/21') },
    { id: '3', name: 'Q3', description: 'Description for Q3', author: 'sktop', platformId: '2', likes: 10, createdAt: new Date('2021/10/22') },
    { id: '4', name: 'Qtop', description: 'Description for Q4', author: 'desktop', platformId: '3', likes: 0, createdAt: new Date('2021/01/22') },
    { id: '5', name: 'Q25', description: 'Description for Q25', author: 'shinetop', platformId: '3', likes: 200, createdAt: new Date('2021/01/22') }
]
const platform = [
    { id: '1', name: 'ABC' },
    { id: '2', name: 'MoMA' },
    { id: '3', name: 'Shuttle' }
]



function SearchPage() {
    const { getQuizzes } = useContext(QuizzesContext)
    const { getPlatformList } = useContext(PlatformContext)
    let quiz = [];
    //console.log("!!!: " + getList());

    function findPlatformName(a) {
        const platf = platform.find(b => b.id === a.platformId);
        return platf.name;
    }
    const { search } = window.location;
    const filterQuizzes = (quiz, query, filter) => {
        if (!query) {
            return quiz;
        }
        if (filter === 'all') {
            return (
                quiz.filter((quiz) => {
                    return (quiz.name.toLowerCase() + quiz.author.toLowerCase() + findPlatformName(quiz).toLowerCase()).includes(query.toLowerCase());
                }));
        }
        else if (filter === 'quiz') {
            return (
                quiz.filter((quiz) => {
                    return (quiz.name.toLowerCase()).includes(query.toLowerCase());
                }));
        }
        else if (filter === 'platform') {
            return (
                quiz.filter((quiz) => {
                    return (findPlatformName(quiz).toLowerCase()).includes(query.toLowerCase());
                }));
        }
        else {
            return (
                quiz.filter((quiz) => {
                    return (quiz.author.toLowerCase()).includes(query.toLowerCase());
                }));
        }
    };
    const query = new URLSearchParams(search).get('search');
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('name');
    const [filterType, setFilterType] = useState('all');
    useEffect(() => {
        async function getList() {
            const quizzes = () => {
                return getQuizzes()
                .then(function(result){
                    quiz.push(result.data);
                    console.log("RESULT: " + result.data[0]._id);
                    return result;
                })
            }
            await quizzes();
            console.log("LIST: " + quiz);
            return quiz[0];
        }
        quiz = getList();
        console.log("QQ: "+quiz);
        const sortArray = type => {
            const stypes = {
                name: 'name',
                createdAt: 'createdAt',
                likes: 'likes'
            };
            const sortTypes = stypes[type];
            const sorted = [...filterQuizzes(quiz, query, filterType)].sort((a, b) => b[sortTypes] - a[sortTypes]);
            setData(sorted);
        };
        sortArray(sortType, filterType);
    }, [sortType, filterType]);

    return (
        <div>
            <div className="row">
                <div className="input-field col s2">
                    <select className="browser-default" onChange={(e) => setSortType(e.target.value)}>
                        <option value='' disabled selected>Sort</option>
                        <option value='name'>Name (A-Z)</option>
                        <option value='createdAt'>Date Created</option>
                        <option value='likes'>Likes</option>
                    </select>
                </div>
                <div className="input-field col s2">
                    <select className="browser-default" onChange={(e) => setFilterType(e.target.value)}>
                        <option value='all' selected>All</option>
                        <option value='quiz'>Quiz</option>
                        <option value='platform'>Platform</option>
                        <option value='author'>User (Author)</option>
                    </select>
                </div>
            </div>
            <div>
                {data.length > 0 ?
                    // data.map(quiz => (
                    //     <div key={quiz.id}>
                    //         <div>{`Quiz: ${quiz.name}`}</div>
                    //         <div>{`Description: ${quiz.description}`}</div>
                    //         <div>{`Author: ${quiz.author}`}</div>
                    //         <div>{`Platform: ${findPlatformName(quiz)}`}</div>
                    //         <div>{`Created: ${quiz.created}`}</div>
                    //         <div>{`Likes: ${quiz.likes}`}</div>
                    //         <br></br>
                    //     </div>
                    // ))) 
                    (<SectionList items={data} type={QUIZ_CARD} name={"Search Results: "+data.length}/>) : (<div>Sorry, No Results Found</div>)
                }
            </div>
        </div>
    )
}

export default SearchPage;