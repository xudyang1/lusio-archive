import React, {Component} from "react";
import QuizCards from "./QuizCard";
import 'materialize-css';
import '../frontpage.css'

class DailyChallengeSection extends Component{
    render(){
        return(
            <div className="dailyChallenge">
                <div className="col s12">
                    <div className="row z-depth-3">
                        <h4>Daily Challenge</h4>
                        <QuizCards/>
                        <h4>Scoreboard</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyChallengeSection