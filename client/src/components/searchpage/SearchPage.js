import React, { useState, useEffect, useContext } from 'react';
import 'materialize-css';
import SectionList from '../sections/SectionList';
import { QUIZ_CARD } from '../../types/cardTypes';
import { QuizzesContext } from '../../context/QuizState';

// sample data
// const quiz = [
//     { id: '1', name: 'Q1', description: 'Description for Q1', author: 'Qwert', platform_id: '1', likes: 4, created: new Date('2010/01/22') },
//     { id: '2', name: 'Q2', description: 'Description for Q2', author: 'qazx', platform_id: '2', likes: 1, created: new Date('2010/01/21') },
//     { id: '3', name: 'Q3', description: 'Description for Q3', author: 'sktop', platform_id: '2', likes: 10, created: new Date('2021/10/22') },
//     { id: '4', name: 'Qtop', description: 'Description for Q4', author: 'desktop', platform_id: '3', likes: 0, created: new Date('2021/01/22') },
//     { id: '5', name: 'Q25', description: 'Description for Q25', author: 'shinetop', platform_id: '3', likes: 200, created: new Date('2021/01/22') }
// ]
// const platform = [
//     { id: '1', name: 'ABC' },
//     { id: '2', name: 'MoMA' },
//     { id: '3', name: 'Shuttle' }
// ]

function SearchPage() {
    const { getQuizzes } = useContext(QuizzesContext)
    const [allQuizzes, setAllQuizzes] = useState([])
    const [allPlatforms, setAllPlatforms] = useState([])

    function findPlatformName(a) {
        const platf = allPlatforms.find(b => b.id === a.platform_id);
        return platf.name;
    }
    const { search } = window.location;
    const filterQuizzes = (quiz, query, filter) => {
        if (!query) {
            return quiz;
        }
        // if (filter === 'all') {
        //     return (
        //         quiz.filter((quiz) => {
        //             return (quiz.name.toLowerCase() + quiz.author.toLowerCase() + findPlatformName(quiz).toLowerCase()).includes(query.toLowerCase());
        //         }));
        // }
        if (filter === 'quiz') {
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
        const sortArray = type => {
            const stypes = {
                name: 'name',
                created: 'created',
                likes: 'likes'
            };
            const sortTypes = stypes[type];
            const sorted = [...filterQuizzes(allQuizzes, query, filterType)].sort((a, b) => b[sortTypes] - a[sortTypes]);
            setData(sorted);
        };
        sortArray(sortType, filterType);
    }, [sortType, filterType, allQuizzes, allPlatforms]);

    useEffect(()=>{
        let res = getQuizzes().then(function(result){ setAllQuizzes(result.data) });
    }, [])

    return (
        <div>
            <div className="row">
                <div className="input-field col s2">
                    <select className="browser-default" onChange={(e) => setSortType(e.target.value)}>
                        <option value='' disabled selected>Sort</option>
                        <option value='name'>Name (A-Z)</option>
                        <option value='created'>Date Created</option>
                        <option value='likes'>Likes</option>
                    </select>
                </div>
                <div className="input-field col s2">
                    <select className="browser-default" onChange={(e) => setFilterType(e.target.value)}>
                        <option value='quiz' selected>Quiz</option>
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
                    (<SectionList items={data} name={"Search Result :"+data.length} type={QUIZ_CARD} detailed={true}/>) : (<div>Sorry, No Results Found</div>)
                }
            </div>
{/* =======
import React, { useContext } from 'react';
import 'materialize-css';
import { PlatformContext } from '../../context/PlatformState';
import SearchPageContent from "./SearchPageContent";

function SearchPage() {
    const { getPlatform } = useContext(PlatformContext);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('search');

    return (
        <div>
            <SearchPageContent query={query} getPlatform={getPlatform}/>
>>>>>>> 291102fb3219b9795dc10652b10a7ab1df157b8c */}
        </div>
    )
}

export default SearchPage;