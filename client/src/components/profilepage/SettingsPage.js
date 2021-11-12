import { useContext, useEffect } from "react";
import { Link, useHistory} from "react-router-dom";
import { AuthContext } from "../../context/AuthState";

export default function SettingsPage() {
    const { deleteAccount, isAuthenticated } = useContext(AuthContext);
    const history = useHistory()

    const onDelete = (e) => {
        deleteAccount();
        history.push('/')
    };
    return (
        <div>
            {isAuthenticated?
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
                </div>
            </div>) : null}
        </div>
    );
}