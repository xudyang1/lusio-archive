import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthState"
import M from 'materialize-css';
import '../../css/profilepage.css'

//TODO
// _____ ___  ___   ___  
// |_   _/ _ \|   \ / _ \ 
//   | || (_) | |) | (_) |
//   |_| \___/|___/ \___/


export default function ProfileHeader(props) {

    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, {});

    const {} = useContext(AuthContext)

    const onChangeBanner = () => {

    }
    const onChangeDescription = () => {

    }
    const onSubmit = () => {

    }
    const onDelete = () => {

    }

    return (
        <div>
            <h2 className="center">HOME</h2>
            <div class="parallax-container">
                <div class="parallax">
                    <img src="https://i.pinimg.com/736x/87/d1/a0/87d1a0a7b4611165f56f95d5229a72b9.jpg" />
                </div>
            </div>
            <input type="file" name="bannerImage" onChange={onChangeBanner} />

            <textarea id="profileDescription" type="text" row="5" style={{ fontSize: 25, height: 100 }} className="description" name="profileDescrition" value="{this.state.description}" size="30" onChange={onChangeDescription} />

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