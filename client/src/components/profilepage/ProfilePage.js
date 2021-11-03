import React, {Component} from 'react';
//import AppNavbar from '../common/AppNavbar';
import ProfileSidebar from './ProfileSidebar';
import '../../css/frontpage.css';
import { addProfile } from '../../actions/ProfileActions';

import sampleUserProfile from '../../sampleData/sampleUser.json'

export default class ProfilePage extends Component{
  constructor(props){
    super(props);
    
    this.state={
      userID: this.props.match.params.id,
      profileIconURI: "https://www.seekpng.com/png/detail/506-5061704_cool-profile-avatar-picture-cool-picture-for-profile.png",
      bannerURI: '',
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
        profileIconURI: userP.userProfileIconImgURL,
        bannerURI: userP.userBannerImgURL,
        description: userP.userDescription
      })
    }
  }


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
        profileIconURI: URL.createObjectURL(img)
      });
    }
  }
  onSubmit = (e) => {
    e.preventDefault();

    const userProfile = {
      description: this.state.description,
      bannerURI: this.state.bannerURI,
      profileIconURI: this.state.profileIconURI
    }
    //Backend to be implemented (ADDONS)

    console.log("profile creation attempt, data", userProfile);
    //axios.put("http://localhost:5000/profile/")
    addProfile(userProfile);
  }
  render(){
    return(
    <div class='row'>
      <div className="col s3 z-depth-3">
        <ProfileSidebar profileIconURI={this.state.profileIconURI}/>
      </div>
      <div className="col s9 z-depth-3">
        <img className="profile-banner" alt="Banner" width="100%" height="250" src={this.state.bannerURI}>  
        </img>
        <input type="file" name="bannerImage" onChange={this.onChangeBanner} />
        <textarea id="profileDescription" type="text" row="5" style={{fontSize: 25, height:100}} className="description" name="profileDescrition" value={this.state.description} size="30" onChange={this.onChangeDescription}/>
        <button color="dark" style={{ marginTop: '2rem' }} block onClick={this.onSubmit} >
          Finish Edit
          <i className="material-icons prefix" ></i>
        </button>
      </div>
    </div>
    )
 }
}