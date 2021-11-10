import React, {Component} from "react";
import PlatformSections from "./PlatformSections";
import DailyChallengeSection from "./DailyChallengeSection";
import {CreateQuizButton} from "../editquizpage/CreateQuizButton";
import 'materialize-css';
import '../../css/frontpage.css'


class HomeContent extends Component{
    render(){
        var tempPlatform = ["MoMA", "Motion Pictures", "NASA", "NYC Dept of Edu", "ABCD"];
        
        /**
         * Add a way to get data from database and place the name of platforms here
         * 
         * 
        **/

        return (
            <div className="row">
                <div className="col s9">
                    {
                        tempPlatform.map((element, index)=>(
                            <PlatformSections key={index} name={element}/>
                        ))
                    }
                </div>
                <div className="col s3">
                    <DailyChallengeSection/>
                    <CreateQuizButton/>
                </div>
            </div>
        )
    }
}

export default HomeContent