import React, {Component} from "react";
import QuizCardWraper from "./QuizCardWraper";
import QuizCards from "./QuizCard";

class PlatformSections extends Component{
    render(){

        var quiz = [["Q1", "Description for Q1"], ["Q2", "Something Something"], ["Q3", "No Description"], ["Q4", "No Description"], ["Q4", "No Description"]]

        /**
         * Add a way to get data from database and place the quizes from platforms {this.props.name} here
         * 
         * 
        **/

        return(
            <div className="row z-depth-3">
                <div>
                <h4>{this.props.name? this.props.name : "Name"}</h4>
                <a>more{">"}{">"}</a>
                </div>
                <div className="col">
                    {
                        quiz.map((element, index)=>(
                            <QuizCardWraper key={index} id={index} name={element[0]+" from "+this.props.name} desc={element[1]}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default PlatformSections