import React, { Component } from "react";
import 'materialize-css';
import '../../css/frontpage.css'

class QuizCards extends Component {
    render() {
        return (
            <div>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title center">{this.props.name}</span>
                        <div className="cardText" style={{whitespace: "break-spaces"}}>
                            <img src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" width="200" height="200"/><br/>
                            {this.props.desc}
                        </div>
                    </div>
                    <div className="card-action">
                        <a href="#" style={{ margin: "auto" }}>Play</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuizCards