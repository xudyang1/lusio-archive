import React , { useState, useEffect} from 'react';
//import { AppNavbar } from '../AppNavbar';
import { useParams } from 'react-router';
import sampleQuiz from '../../sampleData/sampleQuiz';


export default function QuizPage(){
    const {id} = useParams();
    var quiz = sampleQuiz.quizzes.filter((quiz)=>(
        quiz.quizID == id
    ))
    var name = '';
    var description = '';
    var platformId = 0;
    var timer = 5.3;
    var quizQs = 0;
    var quizScoreboard = [];
    quiz = quiz[0];
    console.log(quiz);
    if(quiz){
        name = quiz.quizName;
        description = quiz.quizDesc;
        platformId = quiz.platformID;
        timer = 5.3;
        quizQs = quiz.quizQuestions.length;
        quizScoreboard = quiz.scoreboard;
    }

    const [likes, setNumLikes] = useState(quiz.quizLikes);
    const [plays, setNumPlays] = useState(quiz.quizPlays);
    const [liked, setLiked] = useState(false);
    
    const condLikeHandler = () => {
        setLiked(current => !current)
    }
    const numLikeHandler = () => {
        if (!liked){
            setNumLikes(current => current + 1);
            console.log("You liked a quiz!");
        }
        else {
            setNumLikes(current => current - 1);
            console.log("You unliked the quiz.");
        }
    }
    const numPlayHandler = () => {
        setNumPlays(current => current + 1);
        console.log("You played a quiz");
    }
    const onClick = () =>{
        numLikeHandler();
        condLikeHandler();
    }
    
    return(
        <div class="container z-depth-3" >
            <div class = "row">
                <div class="col s7 push-s5">
                    <br/>
                    <span class="flow-text" style={{fontSize: "30px", fontWeight: "bold"}}>
                        {name}
                    </span>
                    <a class="waves-effect waves-light btn" style={{left: "150px"}}><i class="material-icons right">report</i>Report</a>
                    <br/> 
                    <span class="flow-text">
                        Platform {platformId}
                    </span><br/>
                    <span class="flow-text">
                        <div style={{fontSize:"15px"}}>Description: <br/></div>
                        {description}
                    </span>
                </div>
                <div class="col s5 pull-s7">
                    <span class="flow-text">
                        <img src="https://www.moma.org/assets/visit/entrance-image--museum-crop-7516b01003659172f2d9dbc7a6c2e9d9.jpg" style={{width:"350px",height:"200px", paddingTop: "10px"}}></img>
                    </span> 
                </div>
            </div>
            <div class="row">
                <div class="col s3">
                    Related Tags : wishlist
                </div>
                <div class="col s9">
                    <div class="row" style={{paddingLeft:"250px"}}>
                        <span> 
                            {plays} plays
                            <i class="material-icons likeicon" onClick={onClick}>thumb_up</i>
                            <span> {likes}</span>
                        </span>
                    </div>
                </div>
            </div>      
            <hr></hr>
            <div class="row" >
                <div class="col s4">
                <table>
                    <tr>
                        <th bgcolor="lightgrey"></th>
                        <th bgcolor="lightgrey">Ranking</th>
                        <th bgcolor="lightgrey">Score</th>
                    </tr>
                    {quizScoreboard.map((user)=> {
                        return(
                            <tr>
                                <td>{user.userID}</td>
                                <td>User Name</td>
                                <td>{user.score}</td>
                            </tr>
                        )
                    })}
                </table>
                </div>
                <div class="col s8">
                    
                    <div className="container">
                        <div class="row" style={{textAlign: 'center', fontSize: "20px"}}>
                            <div class="col s4"># OF QUESTIONS</div>
                            <div class="col s4">TIMER SET</div>
                            <div class="col s4">PERSONAL SCORE</div>
                        </div>
                        <div class="row" style={{textAlign: 'center', fontSize: "25px", fontWeight: "Bold"}}>
                            <div class="col s4">{quizQs}</div>
                            <div class="col s4">{timer}</div>
                            <div class="col s4">N/A</div>
                        </div>
                    </div>
                    <br/>
                    <div class="row" style={{maxWidth:"100%", maxHeight:"100%"}}>
                        <div class= "col s8">
                            <a class="waves-effect waves-light btn" style={{left:"230px"}} onClick={numPlayHandler}>Play Quiz</a>
                        </div>
                        <div class= 'col s4'>
                            <a class="waves-effect waves-light btn" >View Quiz Statistics</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}