import React, {Component} from "react";
import QuizCards from "./QuizCard";

class PlatformSections extends Component{
    render(){
        return(
            <div className="row">
                <div className="col s8">
                    <p className="z-depth-3">
                        <h4>Name</h4>
                        <a>more{">"}{">"}</a>
                        <div className="row">
                        <QuizCards/>
                        <QuizCards/>
                        <QuizCards/>
                        <QuizCards/>
                        </div>
                    </p>
                </div>
            </div>
        )
    }
}

export default PlatformSections