import React, { useState, useEffect, useContext, Component } from 'react';
import { withRouter } from "react-router";
import { QuizzesContext } from '../../context/QuizState';
import PlayQuizPage from '../playquizpage/PlayQuizPage';


class QuizPageContent extends Component{    
    static contextType = QuizzesContext;

    constructor(){
        super();
        this.state = {
            id: "",
            name: "",
            quizImgURI: "",
            description: "",
            author: "",
            platformId: 0,
            likes: 0,
            liked: false, // need to implement: "liked" depends on user
            plays: 0,
            timer: 0,
            numQ: 0,
            scoreBoard: [],
            retakeOption: false,
            isDisabled: false
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
            return quiz[0];
        }
        const quiz = await setCurrentQuiz(id);
        this.setState({
            id: quiz._id,
            name: quiz.name,
            quizImgURI: quiz.quizImgURI,
            description: quiz.description,
            author: quiz.author,
            platformId: 0,
            likes: quiz.likes,
            //liked: (depends on user)
            plays: quiz.plays,
            timer: quiz.time,
            numQ: quiz.questions.length,
            scoreBoard: quiz.scoreBoard,
            //played: this.props.played,
            retakeOption: quiz.retakeOption
        });
        
    }

    /*
    checkRetake = () => {
        console.log(this.state.retakeOption);
        console.log(this.state.played);
        if (!this.state.retakeOption && this.state.played) {
            this.setState({isDisabled: true});
        }
    }
    */

    numLikeHandler = async e => {
        e.preventDefault();
        await this.handleLikeState();
        const updateFQuiz = await {
            id: this.state.id,
            likes: this.state.likes,
        };
        await this.context.updateQuiz(updateFQuiz);

    }
    handleLikeState = () => {
        if (!this.state.liked){
            this.setState({likes: this.state.likes+1, liked: true});
            //console.log("You liked the quiz");
        }
        else {
            this.setState({likes: this.state.likes-1, liked: false});
            //console.log("You unliked the quiz");
        }
    }
    
    numPlayHandler = async e => {
        e.preventDefault();
        await this.handlePlayState();

        const updateFQuiz = await {
            id: this.state.id,
            plays: this.state.plays
        };
        await this.context.updateQuiz(updateFQuiz);
        //console.log("You played a quiz");
        document.location.href = "/play/" + this.state.id;
    }
    handlePlayState = () => {
        this.setState({plays: this.state.plays+1});
        //console.log("You played the quiz");
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        const {getQuizzes, playQuiz} = this.context;
        this.getItem(id, getQuizzes);

        
        //this.checkRetake();
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col s6">
                        <p className="row flow-text" style={{fontSize: "30px", fontWeight: "bold"}}>
                            {this.state.name}
                        </p>
                        <p className="row flow-text">
                                Platform {this.state.platformId}
                        </p>
                        <p className="row flow-text">
                            <div style={{fontSize:"15px"}}>Description: <br/></div>
                            {this.state.description}
                        </p>
                    </div>   
                    <div className="col s6 pull-s6" style={{bottom:"100px"}}>
                        <span className="flow-text">
                            <img src={this.state.quizImgURI} style={{width: "350px", height: "250px"}}></img>
                        </span> 
                    </div>
                </div>
                <div className="row">
                    <div className="col s5 pull-s6">
                        Related Tags : wishlist
                    </div>
                    <div className="col s7">
                        <div className="row" style={{paddingLeft:"200px"}}>
                            <span> 
                                {this.state.plays} plays
                                <i className="material-icons likeicon" onClick={this.numLikeHandler}>thumb_up</i>
                                <span> {this.state.likes}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginBottom: "25px"}}>
                    <hr className="row" style={{width:"150%", position:"absolute", right:"1px"}}></hr>
                </div>
                <div class="row">
                    <div className="col s5 pull-s6" >
                        <table>
                            <tr>
                                <th bgcolor="lightgrey"></th>
                                <th bgcolor="lightgrey">Rank</th>
                                <th bgcolor="lightgrey">Score</th>
                            </tr>
                            {this.state.scoreBoard.map((user, index)=> {
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.userScore}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div className="col s7 pull-s2">
                        <div className="row">
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
                        <div className="row" >
                            <button className="waves-effect waves-light btn"  onClick={this.numPlayHandler} disabled={this.state.isDisabled}>Play Quiz</button>
                            <button className="waves-effect waves-light btn" style={{left: "50px"}}>View Quiz Statistics</button>
                        </div>
                    </div>
                </div>
               
            </div>
        )
    }
}
export default withRouter(QuizPageContent);
