import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthState";
import M from 'materialize-css';
import '../../css/profilepage.css';
import { ProfilesContext} from "../../context/ProfileState";
//TODO
// _____ ___  ___   ___  
// |_   _/ _ \|   \ / _ \ 
//   | || (_) | |) | (_) |
//   |_| \___/|___/ \___/


export default function ProfileHeader(props) {

    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, {});

    const {} = useContext(AuthContext);

    const { addProfile, deleteAccount } = useContext(ProfilesContext);
    const initialState = {
        description: "write down your description here",
        bannerURI: "https://i.pinimg.com/736x/87/d1/a0/87d1a0a7b4611165f56f95d5229a72b9.jpg",
        profileIconURI: "https://www.seekpng.com/png/detail/506-5061704_cool-profile-avatar-picture-cool-picture-for-profile.png"
    };
    const [state, setState] = useState(initialState);

    
    const onChangeBanner = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setState({bannerURI : URL.createObjectURL(img)});
        }
    }
    const onChangeDescription = (e) => {
        setState({ ...state, description : e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const { description, bannerURI, profileIconURI } = state;
        const userProfile = { description, bannerURI, profileIconURI };

        addProfile(userProfile);
    }
    const onDelete = () => {
        const { description, bannerURI, profileIconURI } = state;
        const userProfile = { description, bannerURI, profileIconURI };

        //deleteAccount(userProfile);
    }

    return (
        <div>
            <h2 className="center">HOME</h2>
            <div className="parallax-container">
                <div class="parallax">
                    <img src={state.bannerURI}/>
                </div>
            </div>
            <input type="file" name="bannerImage" onChange={onChangeBanner} />

            <textarea id="profileDescription" type="text" row="5" style={{ fontSize: 25, height: 100 }} className="description" name="profileDescrition" value={state.description} size="30" onChange={onChangeDescription} />

            <button color="dark" style={{ marginTop: '2rem' }} onClick={onSubmit} >
                Finish Edit
                <i className="material-icons prefix" ></i>
            </button>
            <button color="dark" style={{ marginTop: '2rem' }} onClick={onDelete}>
                Delete Account
            </button>
        </div>
    )
}