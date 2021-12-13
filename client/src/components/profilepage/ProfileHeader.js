import { createRef, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthState";
import { ProfileContext } from "../../context/ProfileState";

import M from 'materialize-css';
import '../../css/profilepage.css';

export default function ProfileHeader(props) {

    const { isAuthenticated, user } = useContext(AuthContext);
    const { updateProfile, viewType, updateImage } = useContext(ProfileContext);

    const textRef = createRef();

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const fileInputRef = useRef(null);
    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);

    const onSubmit = (e) => {
        e.preventDefault();

        updateProfile({
            mode: "EDIT",
            profile: {
                description: textRef.current.value
            }
        });
        setChanged(false);
        M.toast({ html: 'SUCCESS!', classes: 'rounded', inDuration: 500 });
    };
    const handleChangeImage = (e) => {
        e.preventDefault();
        console.log("image", image, preview);
        const payload = { image: image, field: "bannerURI" };
        updateImage(payload);
        M.toast({ html: 'SUCCESS!', classes: 'rounded', inDuration: 500 });
    };
    useEffect(() => {
        var elems = document.querySelectorAll('.parallax');
        var instances = M.Parallax.init(elems, {});
    });

    const [changed, setChanged] = useState(false);
    return (
        <div>
            <h2 className="center">{props.name ? props.name + "'s Home" : ""}</h2>
            <div className="parallax-container">
                <div className="parallax">
                    <img src={preview || props.banner} />
                </div>

            </div>
            {viewType == "OWNER_VIEW" ?
                <div style={{ margin: "0.1em" }}>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (file && file.type.substring(0, 5) === "image") {
                                setImage(file);
                            } else {
                                setImage(null);
                            }
                        }} />
                    <div className="btn" style={{ margin: "0.2em" }}
                        onClick={(event) => {
                            event.preventDefault();
                            fileInputRef.current.click();
                        }}>Choose Image</div>
                    {preview ? <div className="btn" style={{ margin: "0.2em" }} onClick={handleChangeImage}>Save</div> : <></>}
                    {preview ? <div className="btn"
                        onClick={() => { setImage(null); setPreview(null); }}>Cancel</div> : <></>}
                </div>
                : <></>
            }
            <textarea ref={textRef} id="profileDescription" type="text" row="5" style={{ fontSize: 25, height: 100, maxWidth: "100%", resize: "none" }} className="description" name="profileDescrition" defaultValue={props.description ? props.description : ""} size="30" onChange={(e) => { e.preventDefault(); setChanged(e.target.value != props.description); }} />

            {viewType == "OWNER_VIEW" && (changed) ?
                <div>
                    <div className="btn" color="dark" style={{ marginTop: '2rem' }} onClick={onSubmit} >
                        Finish Edit
                        <i className="material-icons" >edit</i>
                    </div>
                    <div className="btn blue" color="dark" style={{ marginTop: '2rem' }} onClick={(e) => { e.preventDefault(); textRef.current.value = props.description; setChanged(false); }} >
                        Cancel
                    </div>
                </div>
                : <div></div>
            }

        </div>
    );
}