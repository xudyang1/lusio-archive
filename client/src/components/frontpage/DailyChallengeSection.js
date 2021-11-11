import React, {Component} from "react";
import QuizCards from "./QuizCard";
import 'materialize-css';
import '../../css/frontpage.css'

class DailyChallengeSection extends Component{
    render(){
        return(
            <div className="dailyChallenge">
                <div className="col s12">
                    <div className="row z-depth-3">
                        <h4>Daily Challenge</h4>
                        <QuizCards key={1} id={1} name={"Awesome Daily Challenge"} desc={"featured quiz of the day, take a challenge now, I dare you"}/>
                        <h4>Scoreboard</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyChallengeSection