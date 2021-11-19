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
                        <div className="cardText" style={{ whitespace: "break-spaces" }}>
                            <img src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" width="200" height="200" /><br />
                            {this.props.desc}
                        </div>
                    </div>
                    <div className="valign-wrapper card-action">
                        <a href={"/quiz/"+this.props.id} style={{ margin: "auto" }}>Play</a>
                        {
                            this.props.canEdit?
                            <a href={"/edit/"+this.props.id} style={{ margin: "auto" }}>Edit</a>
                            :<div></div>
                        }
                        {/* <div>
                            <div className="col s6"><a href={"/quiz/" + this.props.id} style={{ margin: "auto" }}>Play</a></div>
                            <div className="col s6"><a href={"/edit/" + this.props.id} style={{ margin: "auto" }}>Edit</a></div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default QuizCards