import React, { Component } from 'react';
import 'materialize-css';
import SectionList from '../sections/SectionList';
import { QUIZ_CARD } from '../../types/cardTypes';
import { QuizzesContext } from '../../context/QuizState';


class SearchPageContent extends Component{    
    static contextType = QuizzesContext;

    constructor(){
        super();
        this.state = {
            quizzes: [],
            sortedQuiz: [],
            platforms: [{
                platId: "",
                platName: ""
            }],
            search: "",
            sortType: "name",
            filterType: "all"
        };
                
    }

    getItem = async (query, getQuizzes) => {
        const setCurrentQuiz = async () => {
            const quizzes = () => {
                return getQuizzes()
                .then(function(result){
                    return result.data;
                })
            }
            const quizL = await quizzes();
            return quizL;
        }
        const quiz = await setCurrentQuiz();
        //--!! Platform ID is User ID in quiz object
        /*let platList = [];
        quiz.forEach(quiz => {
            const platName = this.props.getPlatform(quiz.platformId);
            platList.push({
                platId: quiz.platformId,
                platName: platName
            })
        });
        console.log("PLATLIST: " + platList);*/
        this.setState({
            quizzes: quiz,
            //platforms: platList,
            search: query
        }, () => {
            this.resort();
        });
    }
    
    setSortType = (e) => {
        this.setState({
            sortType: e.target.value
        }, () => {
            this.resort();
        });
    }
    setFilterType = (e) => {
        this.setState({
            filterType: e.target.value
        }, () => {
            this.resort();
        });
    }
    
    findPlatformName = async (platId) => {
        //const platf = platform.find(b => b.id === a.platformId);
        //return platf.name;
        //return platItem;
    }

    filterQuizzes = (quiz, query, filter) => {
        if (!query) {
            return quiz;
        }
        if (filter === "all") {
            return (
                quiz.filter((quiz) => {
                    return (quiz.name.toLowerCase() + quiz.author.toLowerCase()).includes(query.toLowerCase());
                    //return (quiz.name.toLowerCase() + quiz.author.toLowerCase() + findPlatformName(quiz).toLowerCase()).includes(query.toLowerCase());
                }));
        }
        else if (filter === "quiz") {
            return (
                quiz.filter((quiz) => {
                    return (quiz.name.toLowerCase()).includes(query.toLowerCase());
                }));
        }
        /*else if (filter === "platform") {
            return (
                quiz.filter((quiz) => {
                    return (findPlatformName(quiz).toLowerCase()).includes(query.toLowerCase());
                }));
        }*/
        else {
            return (
                quiz.filter((quiz) => {
                    return (quiz.author.toLowerCase()).includes(query.toLowerCase());
                }));
        }
    };
    resort = () => {
        const sorted = [...this.filterQuizzes(this.state.quizzes, this.props.query, this.state.filterType)];
        sorted.sort((a, b) => {
            let quizA = a[this.state.sortType];
            let quizB = b[this.state.sortType];
            switch(this.state.sortType){
                case "name":
                    return quizA.localeCompare(quizB);
                case "createdAt":
                    return (new Date(quizA)) - (new Date(quizB));
                case "likes":
                    return quizB - quizA;
            }
        })
        this.setState({sortedQuiz: sorted}, function (){
            //console.log(this.state.sortedQuiz);
        });
    }
    /*getSortedList = () => {
        let newList = [];
        this.state.sortedQuiz.map(quiz => (
            newList.push(quiz)
        ))
        return newList;
    }*/

    componentDidMount(){
        const {getQuizzes} = this.context;
        this.getItem(this.props.query, getQuizzes);
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="input-field col s2">
                        <select className="browser-default" onChange={this.setSortType}>
                            <option value='' disabled selected>Sort</option>
                            <option value='name'>Name (A-Z)</option>
                            <option value='createdAt'>Date Created</option>
                            <option value='likes'>Likes</option>
                        </select>
                    </div>
                    <div className="input-field col s2">
                        <select className="browser-default" onChange={this.setFilterType}>
                            <option value='all' selected>All</option>
                            <option value='quiz'>Quiz</option>
                            <option value='author'>User (Author)</option>
                        </select>
                    </div>
                </div>
                <div>
                    {this.state.sortedQuiz.length > 0 ?
                         this.state.sortedQuiz.map(quiz => (
                             <div key={quiz.id}>
                                 <div>{`Quiz: ${quiz.name}`}</div>
                                 <div>{`Description: ${quiz.description}`}</div>
                                 <div>{`Author: ${quiz.author}`}</div>
                                 <div>{`Platform: ${quiz.platformId}`}</div>
                                 <div>{`Created: ${(new Date(quiz.createdAt)).toISOString().substring(0, 10)}`}</div>
                                 <div>{`Likes: ${quiz.likes}`}</div>
                                 <br></br>
                             </div>
                         )) : <div></div>
                         //{`Platform: ${this.findPlatformName(quiz.platformId)}`}
                        //(<SectionList items={this.state.sortedQuiz} type={QUIZ_CARD} name={"Search Results for '" + this.state.search + "': "+this.state.sortedQuiz.length}/>) : (<div>Sorry, No Results Found</div>)
                    }
                </div>
            </div>
        )
    }
}
export default SearchPageContent;
