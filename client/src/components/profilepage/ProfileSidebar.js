import React, { Component } from 'react';
import M from 'materialize-css';
import '../../css/profilepage.css'
import ProfilePage from './ProfilePage';


export default class ProfileSidebar extends Component{
    constructor(props){
        super(props);
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
       
        
        this.state={
            profileIconURI: "https://www.seekpng.com/png/detail/506-5061704_cool-profile-avatar-picture-cool-picture-for-profile.png"
        }

      }
      
      componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState(nextProps)
        }
      }
    render(){
        return(
            <div>
                <ul id="slide-out" className="sidenav sidenav-fixed">
                    <li><div className="user-view">
                        <div className="background">
                        {/* <img src="images/office.jpg"/> */}
                        </div>
                        <a href="#user"><img className="circle" src={this.state.profileIconURI} width='65%' height='300px' /></a>
                        <a href="#name"><span className="name">John Doe</span></a>
                        <a href="#email"><span className="email">jdandturk@gmail.com</span></a>
                    </div></li>
                    <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                    <li><a href="#!">Second Link</a></li>
                    <li><div className="divider"></div></li>
                    <li><a className="subheader">Subheader</a></li>
                    <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
        );
    }
}

