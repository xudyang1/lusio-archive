import { createRef, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthState";
import { ProfileContext } from "../../context/ProfileState";
import { UPDATE_SUCCESS } from "../../types/actionTypes";
import { ImagePreview } from "../common/ImagePreview";
import M from 'materialize-css';

export default function SettingsPage() {
    const { deleteAccount, isAuthenticated, updateUser } = useContext(AuthContext);
    const { profile, updateProfile, viewType, updateImage } = useContext(ProfileContext);
    const [name, setName] = useState(null);
    const [pass, setPass] = useState(null);
    const [deleteMsg, setDeleteMsg] = useState(null);

    const history = useHistory();
    const bannerRef = createRef();
    const nameRef = createRef();
    const passwordRef = createRef();


    const onChangeName = (e) => {
        updateUser({ content: { name: nameRef.current.value } });
        M.toast({ html: 'SUCCESS!', classes: 'rounded', inDuration: 500 });
        // window.location.reload(false);
    };
    const onChangePassword = (e) => {
        updateUser({ content: { password: passwordRef.current.value } });
        M.toast({ html: 'SUCCESS!', classes: 'rounded', inDuration: 500 });
        // window.location.reload(false);
    };

    const onDelete = (e) => {
        deleteAccount();
        history.push('/');
    };

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const onUploadIcon = (e) => {
        // console.log("Image file", imageFile)
        updateImage({
            image: imageFile,
            field: "iconURI"
        });
        M.toast({ html: 'SUCCESS!', classes: 'rounded', inDuration: 500 });
    };
    const [nameError, setNameError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    // format check
    useEffect(() => {
        const namePattern = /^(?=.*[a-zA-Z])[a-zA-Z\d-_]{3,10}$/;

        if (name && !name.match(namePattern))
            setNameError(true);
        else
            setNameError(false);

    }, [name]);
    useEffect(() => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*-_=,.?]{8,30}$/;

        if (pass && !pass.match(passwordPattern))
            setPassError(true);
        else
            setPassError(false);

    }, [pass]);
    useEffect(() => {
        const deleteMsgPattern = /^Yes, delete my account$/;

        if (deleteMsg && !deleteMsg.match(deleteMsgPattern))
            setDeleteError(true);
        else
            setDeleteError(false);

    }, [deleteMsg]);
    return (
        <div>
            {(viewType == "OWNER_VIEW" && isAuthenticated) ?
                (<div className="row z-depth-3">
                    <div style={{ margin: "10px" }}>
                        <div>
                            <h4>Settings</h4>
                        </div>
                        <div className="row">
                            <div className="col" style={{ marginTop: '2rem' }}><ImagePreview isCircle={true} imageWidth="64px"
                                imageHeight="64px" editable={true} setImageFile={setImageFile}
                                setImagePreview={setImagePreview} /></div>
                            <div className="col"><button color="dark" style={{ marginTop: '3rem', marginLeft: "10.5em" }} onClick={onUploadIcon} disabled={!imagePreview}>
                                Change Icon
                            </button></div>
                        </div>
                        <div className="row">
                            <div className="col"><input placeholder="New Name" id="name" type="text" ref={nameRef} onChange={(e) => { setName(e.target.value); }} /></div>
                            <div className="col"><button color="dark" style={{ marginTop: '2rem' }} onClick={onChangeName} disabled={!name || nameError}>
                                Change Name
                            </button></div>
                            <div className="col" style={{ marginTop: '2rem', color: "red" }}>{nameError ?
                                <>
                                    <li>Length of 3 to 10 alphanumeric characters or special characters _-</li>
                                    <li>Must contain 1 letter</li>
                                </> : <></>}</div>
                        </div>
                        <div className="row">
                            <div className="col"><input placeholder="New Password" id="password" type="text" ref={passwordRef} onChange={(e) => { setPass(e.target.value); }} /></div>
                            <div className="col"><button color="dark" style={{ marginTop: '2rem' }} onClick={onChangePassword} disabled={!pass || passError}>
                                Change Password
                            </button></div>
                            <div className="col" style={{ marginTop: '2rem', color: "red" }}>{passError ?
                                <><li>8-40 characters long and must contain:</li>
                                    <li style={{ marginLeft: "2em" }}>1 Uppercase letter A to Z</li>
                                    <li style={{ marginLeft: "2em" }}>1 Lowercase letter a to z</li>
                                    <li style={{ marginLeft: "2em" }}>1 Number 0 to 9</li>
                                    <li style={{ marginLeft: "2em" }}>1 Special character of !@#$%^&*-_=,.?</li>
                                </> : <></>}</div>
                        </div>
                        <div className="row" style={{ marginTop: '2rem', color: "red" }}><b>Danger Zone</b></div>
                        <div className="valign-wrapper center">
                            <div className="col"><input placeholder="Yes, delete my account" id="deleteMsg" type="text" onChange={(e) => { setDeleteMsg(e.target.value); }} /></div>
                            <div className="col"><button color="dark" style={{ marginTop: '1rem' }} onClick={onDelete} disabled={!deleteMsg || deleteError}>
                                Delete Account
                            </button></div>
                            <div className="col" style={{ marginTop: '1rem', color: "red" }}>{deleteError ?
                                <><li>Type the message: Yes, delete my account</li>
                                </> : <></>}</div>
                        </div>
                    </div>
                </div>) : null
            }
        </div >
    );
}