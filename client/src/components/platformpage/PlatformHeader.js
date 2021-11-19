import React, { Component } from 'react';
import { useHistory, useParams } from 'react-router';

export default function PlatformHeader(props) {
    const { id } = useParams();
    const history = useHistory();

    function onClickAbout(){
        history.push(`/platform/${id}/About`)
    }

    function onClickHeader(){
        history.push(`/platform/${id}`)
    }

    return (
        <div>
            <div className="row valign-wrapper">
                <div className="col s8">
                    <h2 onClick={onClickHeader}>{props.name}</h2>
                </div>
                <div className="col s2">
                    <button className="btn waves-effect waves-light">Subscribe</button>
                </div>
                <div className="col s2">
                    <button className="btn waves-effect waves-light" onClick={onClickAbout}>About</button>
                </div>
            </div>
            <div className="parallax-container">
                <div className="parallax">
                    <img src={props.banner}/>
                </div>
            </div>
        </div>
    )
}