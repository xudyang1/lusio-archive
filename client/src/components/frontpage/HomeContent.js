import React, {Component} from "react";
//import PlatformSections from "./PlatformSections";
import DailyChallengeSection from "./DailyChallengeSection";
import 'materialize-css';
import '../../css/frontpage.css'
import GeneralSections from "../common/GeneralSections";


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
                            <GeneralSections key={index} name={element} type={"quiz"}/>
                        ))
                    }
                </div>
                <div className="col s3">
                    <DailyChallengeSection/>
                </div>
            </div>
        )
    }
}

export default HomeContent