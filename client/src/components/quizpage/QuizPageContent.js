import React, { Component } from 'react';
import { withRouter } from "react-router";
import { QuizzesContext } from '../../context/QuizState';   

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
            platformId: "",
            platformName: "",
            likes: 0,
            liked: false,
            plays: 0,
            timer: 0,
            numQ: 0,
            scoreBoard: [],
            currentScore: 0,
            isDisabled: false
        };
                
    }
    /*
    setPlatformName = async (platformId) => {
        const platformContent = await this.props.passedFunc(platformId, false);
        const platform = platformContent.data;
        console.log(platform);
    }
    */

    getItem = async (id, getQuizzes) => {
        const setCurrentQuiz = async (id) => {
            const quizzes = () => {
                return getQuizzes()
                .then(function(result){
                    return result;
                })
            }
            const quizL = await quizzes();
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
            platformId: quiz.platformId,
            likes: quiz.likes,
            plays: quiz.plays,
            timer: quiz.time,
            numQ: quiz.questions.length,
            scoreBoard: quiz.scoreBoard,

        }
        //, () => this.getPlat(this.state.platformId)
        );
        
    }
    getRecentScore = async (quizId) => {
        if (this.props.userId != "") {
            const getQuizScores = () => {
                return (this.props.getProfile(this.props.userId)).then(function (result)
                {return result.data.profile.quizzesScore;});
            }
            const sList = await getQuizScores();
            console.log(sList);
            for (var i = 0; i < sList.length; i++){
                if (sList[i].split(":")[0] == quizId){
                    //may change from localStorage
                    //need to be discussed
                    this.setState({currentScore: sList[i].split(":")[1]}, ()=> localStorage.setItem("currentScore", this.state.currentScore));  
                }
            } 
        }
        
    }



    getPlat = async (platformId) => {
        const plat = () => { 
            return (this.props.getPlatform(platformId, false)).then(function (result)
             {return result;}
             );
        }
        const platform = await plat();
        console.log("Platform", platform);
    }


    numLikeHandler = async e => {
        e.preventDefault();
        if (this.props.userId != "") {
            await this.handleLikeState(e);

            const updateFQuiz = await {
                id: this.state.id,
                likes: this.state.likes,
            };
            await this.context.updateQuiz(updateFQuiz);
        }
        //userId does not exist : Guest User
        //can not like the Quiz
        else {
            alert("You have to login first");
        }
        

    }
    handleLikeState = async (e) => {
        const getLikedQList = () => { 
            return (this.props.getProfile(this.props.userId)).then(function (result)
             {return result.data.profile.likedQuizzes;});
        }
        const qList = await getLikedQList();
        console.log("LikedQuizzes is", qList);

        //if a quiz is already liked by User
        //action becomes unliking a Quiz
        if (qList.includes(this.state.id)) {
            alert("You unliked the quiz.");
            this.setState({likes: this.state.likes-1, liked: false});
            await this.props.updateProfile({
                mode: "DELETE",
                profile: {
                    owner: this.props.userId,
                    likedQuizzes: this.state.id
                }
            })
        }
        //if a quiz is not liked by User
        //action becomes liking a Quiz
        else {
            alert("You liked the quiz.");
            this.setState({likes: this.state.likes+1, liked: true});
            await this.props.updateProfile({
                mode: "ADD",
                profile: {
                    owner: this.props.userId,
                    likedQuizzes: this.state.id
                }
            })
        }
    }
    numLikeHandler = async e => {
        e.preventDefault();
        if (this.props.userId != "") {
            await this.handleLikeState(e);

            const updateFQuiz = await {
                id: this.state.id,
                likes: this.state.likes,
            };
            await this.context.updateQuiz(updateFQuiz);
        }
        //userId does not exist : Guest User
        //can not like the Quiz
        else {
            alert("You have to login first");
        }
    }
    numPlayHandler = async (e) => {
        e.preventDefault();
        await this.handlePlayState(e);

        const updateFQuiz = await {
            id: this.state.id,
            plays: this.state.plays
        };
        await this.context.updateQuiz(updateFQuiz);
        document.location.href = "/play/" + this.state.id;
    }
    handlePlayState = async (e) => {
        console.log(this.props.userId);
        if (this.props.userId != "") {
            const getPlayedQList = () => { 
                return (this.props.getProfile(this.props.userId)).then(function (result)
                 {return result.data.profile.quizzesTaken;});
            }
            const qList = await getPlayedQList();
    
            // Removes quiz from quiz history
            if (qList.includes(this.state.id)) {
                await this.props.updateProfile({
                    mode: "DELETE",
                    profile: {
                        owner: this.props.userId,
                        quizzesTaken: this.state.id
                    }
                })
            }
            // Adds / re-add (for re-ordering) to quiz history list
            await this.props.updateProfile({
                mode: "ADD",
                profile: {
                    owner: this.props.userId,
                    quizzesTaken: this.state.id
                }
            })
        }
        // Guest users also increase play count
        this.setState({plays: this.state.plays+1});
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        const {getQuizzes} = this.context;
        this.getItem(id, getQuizzes); 
        this.getRecentScore(id);  
    }

    render(){
        return(
            <div>
                <table>
                    <tr><td>
                    <table style={{width:"70%", marginRight:"0px", marginLeft:"auto"}}>
                        <p>
                            <span>
                                <img src={this.state.quizImgURI} style={{width: "420px", height: "300px"}}></img>
                            </span> 
                        </p>
                        <p style={{fontSize: "30px", fontWeight: "bold"}}>
                            {this.state.name}
                        </p>
                        <p>
                            {/*TODO: change to platform's name and navigate to platform onClick */}
                            <div style={{fontSize:"17px"}}>Platform: <br/></div>
                            {this.state.platformId}
                        </p>
                        <p>
                            <div style={{fontSize:"17px"}}>Description: <br/></div>
                            {this.state.description}
                        </p>
                        <div>
                            <div>
                                <div>
                                    <br/>
                                    <span> 
                                        <i className="material-icons likeicon" onClick={this.numLikeHandler}>thumb_up</i>
                                        <span style={{marginRight:"20%"}}> {this.state.likes}</span>
                                        {this.state.plays} plays
                                    </span>
                                </div>
                            </div>
                        </div>
                    </table>
                    </td><td style={{padding:"5%", width:"50%"}}>
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
                    </td></tr>
                </table>
                <table>
                    <tr><td>
                        <table style={{width:"90%", marginRight:"0px", marginLeft:"auto", border:".5px solid gray"}}>
                            <tr>
                                <td style={{textAlign: 'center', fontSize: "20px", border:".5px solid gray"}}># OF QUESTIONS</td>
                                <td style={{textAlign: 'center', fontSize: "20px", border:".5px solid gray"}}>TIMER SET</td>
                                <td style={{textAlign: 'center', fontSize: "20px", border:".5px solid gray"}}>PERSONAL SCORE</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center', fontSize: "25px", fontWeight: "Bold"}}>{this.state.numQ}</td>
                                {this.state.timer != 0 ? <td style={{textAlign: 'center', fontSize: "25px", fontWeight: "Bold"}}>{this.state.timer}</td>
                                : <td style={{textAlign: 'center', fontSize: "25px", fontWeight: "Bold"}}>No Timer Set</td>}
                                <td style={{textAlign: 'center', fontSize: "25px", fontWeight: "Bold"}}>{localStorage.getItem("currentScore")}</td>
                            </tr>
                        </table>
                        </td><td style={{padding:"10%", width:"35%"}}>
                        <div>
                            <button className="waves-effect waves-light btn-large" style={{width:"140%", fontSize:"85%"}} onClick={this.numPlayHandler} disabled={this.state.isDisabled}>Play Quiz</button>
                        </div>
                    </td></tr>
                </table>
            </div>
        )
    }
}
export default withRouter(QuizPageContent);
