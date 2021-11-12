import { createRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthState";
import { ProfileContext} from "../../context/ProfileState";

import M from 'materialize-css';
import '../../css/profilepage.css';
import axios from "axios";
//TODO
// _____ ___  ___   ___  
// |_   _/ _ \|   \ / _ \ 
//   | || (_) | |) | (_) |
//   |_| \___/|___/ \___/


export default function ProfileHeader(props) {

    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, {});

    const { isAuthenticated, user } = useContext(AuthContext);
    const { updateProfile, deleteAccount } = useContext(ProfileContext);

    const textRef = createRef()
    {/* user.id to be used */}
    const initialState = {
        userId: isAuthenticated ? user.id : "",
        accountStatus: 0,
        name: isAuthenticated ? user.name : "",
        email: isAuthenticated ? user.email : "",
        description:"write down your description here",
        profileIcon: "https://www.seekpng.com/png/detail/506-5061704_cool-profile-avatar-picture-cool-picture-for-profile.png",
        profileBanner: "https://i.pinimg.com/736x/87/d1/a0/87d1a0a7b4611165f56f95d5229a72b9.jpg",
        level: 0,
        currentExp: 0,
        maxExp: 0,
        achievements: [""],
        quizzes: [""],
        subscribedUser: [""],
        subscribedPlat: [""]  
    };
    const [state, setState] = useState(initialState);

    const onChangeBanner = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setState({profileBanner : URL.createObjectURL(img)});
        }
    }
    const onChangeDescription = (e) => {
        // setState({ ...state, description : e.target.value });
        setState({description: e.target.value});
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const { userId, accountStatus, name, email, description, profileIcon, profileBanner, level, currentExp, maxExp, achievements, quizzes, subscribedUser, subscribedPlat} = state;
        const userProfile = { userId, accountStatus, name, email, description, profileIcon, profileBanner, level, currentExp, maxExp, achievements, quizzes, subscribedUser, subscribedPlat };
        //updateProfile(userProfile);

        console.log(textRef.current.value)
        updateProfile({
            mode: "EDIT",
            profile:{
                description: textRef.current.value
            }
        })

    }
    const onDelete = (e) => {
        e.preventDefault();
        //deleteAccount(userProfile);
    }

    return (
        <div>
            <h2 className="center">{props.name+"'s Home"}</h2>
            <div className="parallax-container">
                <div className="parallax">
                    <img src={props.banner}/>
                </div>
            </div>
            <input type="file" name="bannerImage" onChange={onChangeBanner} />
// <<<<<<< LiuxinLi

            <textarea ref={textRef} id="profileDescription" type="text" row="5" style={{ fontSize: 25, height: 100 }} className="description" name="profileDescrition" defaultValue={props.description? props.description : ""} size="30"/>

// =======
//             {/*<textarea id="profileDescription" type="text" row="5" style={{ fontSize: 25, height: 100 }} className="description" name="profileDescrition" value={state.description} size="30" onChange={onChangeDescription} />*/}
//             <div className="text-box">
//                 <input name="profileDescription" placeholder="Description" onChange={onChangeDescription} defaultValue={state.description}/>
//             </div>
// >>>>>>> main
            <button color="dark" style={{ marginTop: '2rem' }} onClick={onSubmit} >
                Finish Edit
                <i className="material-icons prefix" ></i>
            </button>
        </div>
    )
}