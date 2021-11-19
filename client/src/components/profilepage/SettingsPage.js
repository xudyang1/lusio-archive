import { createRef, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthState";
import { ProfileContext } from "../../context/ProfileState";

export default function SettingsPage() {
    const { deleteAccount, isAuthenticated, updateUser } = useContext(AuthContext);
    const { profile, updateProfile } = useContext(ProfileContext);

    const history = useHistory();
    const iconRef = createRef();
    const bannerRef = createRef();
    const nameRef = createRef();
    const passwordRef = createRef();

    const onUploadIcon = (e) => {
        //console.log(iconRef.current.value)
        updateProfile({
            mode: "EDIT",
            profile: {
                iconURI: iconRef.current.value
            }
        });
        window.location.reload(false);
    };

    const onUploadBanner = (e) => {
        //console.log(bannerRef.current.value)
        updateProfile({
            mode: "EDIT",
            profile: {
                bannerURI: bannerRef.current.value
            }
        });
        window.location.reload(false);
        //console.log(profile)
    };
    const onChangeName = (e) => {
        updateUser({ content: { name: nameRef.current.value } });

        window.location.reload(false);
    };
    const onChangePassword = (e) => {
        updateUser({ content: { password: passwordRef.current.value } });

        window.location.reload(false);
    };

    const onDelete = (e) => {
        deleteAccount();
        history.push('/');
    };
    return (
        <div>
            {isAuthenticated ?
                (<div className="row z-depth-3">
                    <div style={{ margin: "10px" }}>
                        <div>
                            <h4>Settings</h4>
                        </div>
                        <div className="valign-wrapper center">
                            <button color="dark" style={{ marginTop: '2rem' }} onClick={onDelete}>
                                Delete Account
                            </button>
                        </div>
                        <div className="row">
                            <div className="col"><input placeholder="New Icon URL" id="icon" type="text" ref={iconRef} /></div>
                            <div className="col"><button color="dark" style={{ marginTop: '2rem' }} onClick={onUploadIcon}>
                                Upload Icon
                            </button></div>
                        </div>
                        <div className="row">
                            <div className="col"><input placeholder="New Banner URL" id="banner" type="text" ref={bannerRef} /></div>
                            <div className="col"><button color="dark" style={{ marginTop: '2rem' }} onClick={onUploadBanner}>
                                Upload Banner
                            </button></div>
                        </div>
                        <div className="row">
                            <div className="col"><input placeholder="New Name" id="name" type="text" ref={nameRef} /></div>
                            <div className="col"><button color="dark" style={{ marginTop: '2rem' }} onClick={onChangeName}>
                                Change Name
                            </button></div>
                        </div>
                        <div className="row">
                            <div className="col"><input placeholder="New Password" id="password" type="text" ref={passwordRef} /></div>
                            <div className="col"><button color="dark" style={{ marginTop: '2rem' }} onClick={onChangePassword}>
                                Change Password
                            </button></div>
                        </div>
                    </div>
                </div>) : null}
        </div>
    );
}