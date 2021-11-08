import React, {Component} from "react";
import QuizCards from "../frontpage/QuizCard";
import 'materialize-css';

class QuizCardWraper extends Component{
    render(){
        return(
            <div className="col s3">
                <QuizCards id={this.props.index} name={this.props.name} desc={this.props.desc}/>
            </div>
        )
    }
}

export default QuizCardWraper