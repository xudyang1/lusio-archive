import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthState";

export default function SettingsPage() {
    const { deleteAccount, isAuthenticated } = useContext(AuthContext);

    // const onDelete = (e) => {
    //     e.preventDefault();
    //     deleteAccount();
    // };
    return (
        <div>
            {isAuthenticated?
            (<div className="row z-depth-3">
                <div style={{ margin: "10px" }}>
                    <div>
                        <h4>Settings</h4>
                    </div>
                    <div className="valign-wrapper center">
                        <button color="dark" style={{ marginTop: '2rem' }} onClick={() => deleteAccount()}>
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>) : null}
        </div>
    );
}