<<<<<<< Updated upstream
import React from 'react';
import AppNavbar from '../common/AppNavbar';

=======
import React, {Component} from 'react';
//import AppNavbar from '../common/AppNavbar';
import ProfileSidebar from './ProfileSidebar';
import '../../css/frontpage.css';
import banner from '../../bannerimg.jpg';
import sampleUserProfile from '../../sampleData/sampleUser.json'
>>>>>>> Stashed changes

export default class ProfilePage extends Component{
    
    constructor(props){
      super(props);
      //more states to be added
      this.state={
        userID: this.props.match.params.id,
        profileIcon: banner,
        bannerURI: banner,
        description:""
      }
    }
    componentDidMount(){
      var id = this.state.userID;
      console.log("Current User ID is : ", id);
      var userP = sampleUserProfile.Users.filter((user)=>(
        user.userID == id
      ))
      userP = userP[0]
      if (userP){
        this.setState({
          profileIcon: userP.userProfileIconImgURL,
          bannerURI: userP.userBannerImgURL,
          description: userP.userDescription
        })
      }
    }

<<<<<<< Updated upstream
export default function ProfilePage(){
    return(
    <div>
      <AppNavbar/>
    </div>
    )
}
=======
  
    onChangeDescription =(e) => {
      this.setState({description: e.target.value});

      
    }
    onChangeBanner = (e) => {
      if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        this.setState({
          bannerURI: URL.createObjectURL(img)
        });
      }

      
    }
    onChangeProfileIcon = (e) => {
      if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        this.setState({
          profileIcon: URL.createObjectURL(img)
        });
      }

      
    }
    onSubmit = (e) => {
      e.preventDefault();

      const userProfile = {
        description: this.state.description,
        bannerURI: this.state.bannerURI,
        profileIcon: this.state.profileIcon
      }
      //Backend to be implemented (ADDONS)
      console.log(userProfile);
      //axios.put("http://localhost:5000/profile/")
    }

   render(){
      return(
      <div class='row'>
        <div className="col s3">
          <ProfileSidebar/>
        </div>
        <div className="col s9 z-depth-3">
          <img className="profile-banner" alt="Banner" width="100%" height="250" src={this.state.bannerURI}>  
          </img>
          <input type="file" name="bannerImage" onChange={this.onChangeBanner} />
          <textarea id="profileDescription" type="text" row="5" style={{fontSize: 30, height:150}} className="description" name="profileDescrition" value={this.state.description} size="30" onChange={this.onChangeDescription}/>
          <a><i className="material-icons prefix" >edit</i></a>
        </div>
      </div>
      )
   }
}

>>>>>>> Stashed changes
