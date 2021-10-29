import React, {Component} from "react";
import QuizCardWraper from "../frontpage/QuizCardWraper";

class GeneralSections extends Component{
    render(){
        
        var quiz = this.props.quiz? this.props.quiz : 
        [["Q1", "Description for Q1"], ["Q2", "Something Something"], ["Q3", "No Description"], ["Q4", "No Description"], ["Q4", "No Description"]]

        var name = this.props.name? this.props.name : "SectionName"

        return(
            <div className="row z-depth-3">
                <div>
                <h4>{name}</h4>
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

export default GeneralSections