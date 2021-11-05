import React, { useState, useEffect } from 'react';
import 'materialize-css';

// sample data
const quiz = [
    {id: '1', name: 'Q1', description: 'Description for Q1', author: 'Qwert', platform_id: '1', likes: 4, created: new Date('2010/01/22')},
    {id: '2', name: 'Q2', description: 'Description for Q2', author: 'qazx', platform_id: '2', likes: 1, created: new Date('2010/01/21')},
    {id: '3', name: 'Q3', description: 'Description for Q3', author: 'sktop', platform_id: '2', likes: 10, created: new Date('2021/10/22')},
    {id: '4', name: 'Qtop', description: 'Description for Q4', author: 'desktop', platform_id: '3', likes: 0, created: new Date('2021/01/22')},
    {id: '5', name: 'Q25', description: 'Description for Q25', author: 'shinetop', platform_id: '3', likes: 200, created: new Date('2021/01/22')}
]
const platform = [
    {id: '1', name: 'ABC'},
    {id: '2', name: 'MoMA'},
    {id: '3', name: 'Shuttle'}
]



function SearchPage () {
    function findPlatformName(a){
        const platf = platform.find(b => b.id === a.platform_id);
        return platf.name;
    }
    const { search } = window.location;
    const filterQuizzes = (quiz, query, filter) => {
        if (!query){
            return quiz;
        }
        if(filter === 'all'){
            return (
                quiz.filter((quiz) => {
                    return (quiz.name.toLowerCase() + quiz.author.toLowerCase() + findPlatformName(quiz).toLowerCase()).includes(query.toLowerCase());
            }));
        }
        else if (filter === 'quiz'){
            return (
                quiz.filter((quiz) => {
                    return (quiz.name.toLowerCase()).includes(query.toLowerCase());
            }));
        }
        else if (filter === 'platform'){
            return (
                quiz.filter((quiz) => {
                    return (findPlatformName(quiz).toLowerCase()).includes(query.toLowerCase());
            }));
        }
        else{
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
            const sorted = [...filterQuizzes(quiz, query, filterType)].sort((a, b) => b[sortTypes] - a[sortTypes]);
            setData(sorted);
        };
        sortArray(sortType, filterType);
    }, [sortType, filterType]);
    
    return(
        <div>
            <div class="row">
                <div class="input-field col s2">
                    <select className="browser-default" onChange={(e) => setSortType(e.target.value)}>
                        <option value='' disabled selected>Sort</option>
                        <option value='name'>Name (A-Z)</option>
                        <option value='created'>Date Created</option>
                        <option value='likes'>Likes</option>
                    </select>
                </div>
                <div class="input-field col s2">
                    <select className="browser-default" onChange={(e) => setFilterType(e.target.value)}>
                        <option value='all' selected>All</option>
                        <option value='quiz'>Quiz</option>
                        <option value='platform'>Platform</option>
                        <option value='author'>User (Author)</option>
                    </select>
                </div>
            </div>
            <div>
                {data.length > 0 ? (
                    data.map(quiz => (
                        <div key={quiz.id}>
                            <div>{`Quiz: ${quiz.name}`}</div>
                            <div>{`Description: ${quiz.description}`}</div>
                            <div>{`Author: ${quiz.author}`}</div>
                            <div>{`Platform: ${findPlatformName(quiz)}`}</div>
                            <div>{`Created: ${quiz.created}`}</div>
                            <div>{`Likes: ${quiz.likes}`}</div>
                            <br></br>
                        </div>
                    ))) : (
                        <div>Sorry, No Results Found</div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchPage;