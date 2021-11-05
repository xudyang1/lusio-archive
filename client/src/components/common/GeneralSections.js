import React, { Component } from "react";
import QuizCardWraper from "../frontpage/QuizCardWraper";

class GeneralSections extends Component {
    render() {

        var items = this.props.items ? this.props.items :
            [["Q1", "Description for Q1"], ["Q2", "Something Something"], ["Q3", "No Description"], ["Q4", "No Description"], ["Q4", "No Description"]]

        var name = this.props.name ? this.props.name : "SectionName"
        var type = this.props.type ? this.props.type : "quiz"

        return (
            <div className="row z-depth-3">
                <div>
                    <h4>{name}</h4>
                    <a>more{">"}{">"}</a>
                </div>
                <div className="col">
                    {
                        items.map((element, index) => (
                            <QuizCardWraper key={index} id={index} name={element[0] + " from " + this.props.name} desc={element[1]} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default GeneralSections