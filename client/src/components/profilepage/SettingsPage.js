import { createRef, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthState";
import { ProfileContext } from "../../context/ProfileState";

export default function SettingsPage() {
    const { deleteAccount, isAuthenticated } = useContext(AuthContext);
    const { profile, updateProfile } = useContext(ProfileContext)

    const history = useHistory()
    const iconRef = createRef();
    const bannerRef = createRef();

    const onUploadIcon = (e) => {
        //console.log(iconRef.current.value)
        updateProfile({
            mode: "EDIT",
            profile: {
                iconURI: iconRef.current.value
            }
        })
    }

    const onUploadBanner = (e) => {
        //console.log(bannerRef.current.value)
        updateProfile({
            mode: "EDIT",
            profile: {
                bannerURI: bannerRef.current.value
            }
        })
        console.log(profile)
    }

    const onDelete = (e) => {
        deleteAccount();
        history.push('/')
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
                    </div>
                </div>) : null}
        </div>
    );
}