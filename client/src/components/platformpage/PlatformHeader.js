import React, { Component } from 'react';

class PlatformHeader extends Component{
    render(){
        return(
            <div>
                <div className="row valign-wrapper">
                    <div className="col s8">
                        <h2>{this.props.name}</h2>
                    </div>
                    <div className="col s2">
                        <button className="btn waves-effect waves-light">Subscribe</button>
                    </div>
                    <div className="col s2">
                        <button className="btn waves-effect waves-light">About</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlatformHeader