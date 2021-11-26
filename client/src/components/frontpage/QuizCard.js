import React, { Component } from "react";
import 'materialize-css';
import '../../css/frontpage.css'

export default function QuizCard(props) {
    return (
        <div>
            {
                props.quizDeleteCallback?
                <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={()=>props.quizDeleteCallback()}><i class="material-icons">delete</i></a>
                :<div></div>
            }
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title center">{props.name}</span>
                    <div className="cardText" style={{ whitespace: "break-spaces" }}>
                        <img src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" width="200" height="200" /><br />
                        {props.desc}
                    </div>
                </div>
                <div className="valign-wrapper card-action">
                    <a href={"/quiz/" + props.id} style={{ margin: "auto" }}>Play</a>
                    {
                        props.canEdit ?
                            <a href={"/edit/" + props.id} style={{ margin: "auto" }}>Edit</a>
                            : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}
