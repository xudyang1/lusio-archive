import React, { useState, useEffect, useContext, Component } from 'react';
import { withRouter } from "react-router";
import { QuizzesContext } from '../../context/QuizState';

class QuizPageContent extends Component{    
    static contextType = QuizzesContext;

    constructor(){
        super();
        this.state = {
            id: "",
            name: "",
            description: "",
            author: "",
            platformId: 0,
            likes: 0,
            plays: 0,
            timer: 0,
            numQ: 0,
            scoreboard: []
        };
    }

    getItem = async (id, getQuizzes) => {
        const setCurrentQuiz = async (id) => {
            const quizzes = () => {
                return getQuizzes()
                .then(function(result){
                    //console.log("result is", result);
                    return result;
                })
            }
            const quizL = await quizzes();
            //console.log("QuizList is ",quizL.data);
            const quiz = quizL.data.filter(q => q._id === id);
            console.log("Quiz", quiz[0]);
            return quiz[0];
        }
        const quiz = await setCurrentQuiz(id);
        this.setState({
            id: quiz._id,
            name: quiz.name,
            description: quiz.description,
            author: quiz.author,
            platformId: 0,
            likes: quiz.likes,
            plays: quiz.plays,
            timer: quiz.time,
            numQ: quiz.questions.length,
            scoreboard: []
        });
        console.log("QUIZ STATE: " + this.state);
    }

    condLikeHandler = () => {
        //setLiked(current => !current)
    }
    numLikeHandler = () => {/*
        if (!liked){
            setNumLikes(current => current + 1);
            console.log("You liked a quiz!");
        }
        else {
            //setNumLikes(current => current - 1);
            console.log("You unliked the quiz.");
        }*/
    }
    /*
    const numPlayHandler = () => {
        setNumPlays(current => current + 1);
        console.log("You played a quiz");
    }*/
    onClick = () =>{
        //numLikeHandler();
        //condLikeHandler();
    }

    render(){
        return(
            <div>
                <div>
                    <span className="flow-text" style={{fontSize: "30px", fontWeight: "bold"}}>
                        Name {this.state.name}
                    </span>
                    <span className="flow-text">
                            Platform {this.state.platformId}
                    </span><br/>
                    <span className="flow-text">
                        <div style={{fontSize:"15px"}}>Description: <br/></div>
                        {this.state.description}
                    </span>
                </div>
                <div className="col s5 pull-s7">
                    <span className="flow-text">
                        <img src="https://www.moma.org/assets/visit/entrance-image--museum-crop-7516b01003659172f2d9dbc7a6c2e9d9.jpg" style={{width:"350px",height:"200px", paddingTop: "10px"}}></img>
                    </span> 
                </div>
                <div className="row">
                <div className="col s3">
                    Related Tags : wishlist
                </div>
                <div className="col s9">
                    <div className="row" style={{paddingLeft:"250px"}}>
                        <span> 
                            {/*{plays} plays*/}
                            {/*onClick={onClick} in below statement*/}
                            <i className="material-icons likeicon">thumb_up</i>
                            <span> {this.state.likes}</span>
                        </span>
                    </div>
                </div>
            </div>      
            <hr></hr>
            <div className="row" >
                <div className="col s4">
                <table>
                    <tr>
                        <th bgcolor="lightgrey"></th>
                        <th bgcolor="lightgrey">Ranking</th>
                        <th bgcolor="lightgrey">Score</th>
                    </tr>{/*
                    {quizScoreboard.map((user, index)=> {
                        return(
                            <tr key={index}>
                                <td>{user.userID}</td>
                                <td>User Name</td>
                                <td>{user.score}</td>
                            </tr>
                        )
                    })}*/}
                </table>
                </div>
                <div className="col s8">
                    
                    <div className="container">
                        <div className="row" style={{textAlign: 'center', fontSize: "20px"}}>
                            <div className="col s4"># OF QUESTIONS</div>
                            <div className="col s4">TIMER SET</div>
                            <div className="col s4">PERSONAL SCORE</div>
                        </div>
                        <div className="row" style={{textAlign: 'center', fontSize: "25px", fontWeight: "Bold"}}>
                            <div className="col s4">{this.state.numQ}</div>
                            <div className="col s4">{this.state.timer}</div>
                            <div className="col s4">N/A</div>
                        </div>
                    </div>
                    <br/>
                    <div className="row" style={{maxWidth:"100%", maxHeight:"100%"}}>
                        {/*<div className= "col s8">
                            <a href={"/play/"+id} className="waves-effect waves-light btn" style={{left:"230px"}} onClick={numPlayHandler}>Play Quiz</a>
                        </div>*/}
                        <div className= 'col s4'>
                            <a className="waves-effect waves-light btn-small" >View Quiz Statistics</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default withRouter(QuizPageContent);
