import React , { useState, useEffect, useContext} from 'react';
//import { AppNavbar } from '../AppNavbar';
import { useParams } from 'react-router';
import { QuizzesContext } from '../../context/QuizState';
import sampleQuiz from '../../sampleData/sampleQuiz';


export default function QuizPage(){
    const { id } = useParams();
    const {quiz, getQuiz} = useContext(QuizzesContext)
    
    useEffect(()=>{
        //console.log("Hi")
        getQuiz(id);
        console.log(quiz)
    }, [])


    // const {id} = useParams();
    // var quiz = sampleQuiz.quizzes.filter((quiz)=>(
    //     quiz.quizID == id
    // ))
    // var name = '';
    // var description = '';
    // var platformId = 0;
    // var timer = 5.3;
    // var quizQs = 0;
    // var quizScoreboard = [];
    // quiz = quiz[0];
    // console.log(quiz);
    // if(quiz){
    //     name = quiz.quizName;
    //     description = quiz.quizDesc;
    //     platformId = quiz.platformID;
    //     timer = 5.3;
    //     quizQs = quiz.quizQuestions.length;
    //     quizScoreboard = quiz.scoreboard;
    // }

    // const [likes, setNumLikes] = useState(quiz.likes);
    // const [plays, setNumPlays] = useState(quiz.plays);
    const [liked, setLiked] = useState(false);
    
    const condLikeHandler = () => {
        setLiked(current => !current)
    }
    // const numLikeHandler = () => {
    //     if (!liked){
    //         setNumLikes(current => current + 1);
    //         console.log("You liked a quiz!");
    //     }
    //     else {
    //         setNumLikes(current => current - 1);
    //         console.log("You unliked the quiz.");
    //     }
    // }
    const numPlayHandler = () => {
        //setNumPlays(current => current + 1);
        console.log("You played a quiz");
    }
    const onClick = () =>{
        //numLikeHandler();
        condLikeHandler();
    }
    
    return(
        <div className="container z-depth-3" >
            <div className = "row">
                <div className="col s7 push-s5">
                    <br/>
                    <span className="flow-text" style={{fontSize: "30px", fontWeight: "bold"}}>
                        {quiz.name}
                    </span>
                    <a className="waves-effect waves-light btn" style={{left: "150px"}}><i className="material-icons right">report</i>Report</a>
                    <br/> 
                    <span className="flow-text">
                        Platform {quiz.platformId}
                    </span><br/>
                    <span className="flow-text">
                        <div style={{fontSize:"15px"}}>Description: <br/></div>
                        {quiz.description}
                    </span>
                </div>
                <div className="col s5 pull-s7">
                    <span className="flow-text">
                        <img src="https://www.moma.org/assets/visit/entrance-image--museum-crop-7516b01003659172f2d9dbc7a6c2e9d9.jpg" style={{width:"350px",height:"200px", paddingTop: "10px"}}></img>
                    </span> 
                </div>
            </div>
            <div className="row">
                <div className="col s3">
                    Related Tags : wishlist
                </div>
                <div className="col s9">
                    <div className="row" style={{paddingLeft:"250px"}}>
                        <span> 
                            {quiz.plays} plays
                            <i className="material-icons likeicon" onClick={onClick}>thumb_up</i>
                            <span> {quiz.likes}</span>
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
                    </tr>
                    {quiz.questions.map((user, index)=> {
                        return(
                            <tr key={index}>
                                <td>{user.userID}</td>
                                <td>User Name</td>
                                <td>{user.score}</td>
                            </tr>
                        )
                    })}
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
                            <div className="col s4">{quiz.questions.length}</div>
                            <div className="col s4">{quiz.timer}</div>
                            <div className="col s4">N/A</div>
                        </div>
                    </div>
                    <br/>
                    <div className="row" style={{maxWidth:"100%", maxHeight:"100%"}}>
                        <div className= "col s8">
                            <a href={"/play/"+quiz.id} className="waves-effect waves-light btn" style={{left:"230px"}} onClick={numPlayHandler}>Play Quiz</a>
                        </div>
                        <div className= 'col s4'>
                            <a className="waves-effect waves-light btn" >View Quiz Statistics</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}