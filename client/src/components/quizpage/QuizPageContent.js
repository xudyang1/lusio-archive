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
            liked: false, // need to implement: "liked" depends on user
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
            //liked: (depends on user)
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
                <div className="row">
                    <div className="col s6">
                        <span className="row flow-text" style={{fontSize: "30px", fontWeight: "bold"}}>
                            {this.state.name}
                        </span>
                        <span className="row flow-text">
                            {/*TODO: change to platform's name and navigate to platform onClick */}
                                Platform {this.state.platformId}
                        </span>
                        <span className="row flow-text">
                            <div style={{fontSize:"15px"}}>Description: <br/></div>
                            {this.state.description}
                        </span>
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
                <div className="row">
                    <div className="col s5 pull-s6" >
                        <table>
                            <tbody>
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
                            </tbody>
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
                                {this.state.timer != 0 ? <div className="col s4">{this.state.timer}</div>
                                : <div className="col s4">No Timer Set</div>}
                                <div className="col s4">{localStorage.getItem("currentScore")}</div> 
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
