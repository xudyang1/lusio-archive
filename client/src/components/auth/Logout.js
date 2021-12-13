import { useContext } from "react";
import { logout } from "../../actions/AuthActions";
import { AuthContext } from "../../context/AuthState";

export const Logout = () => {
    const { authDispatch } = useContext(AuthContext);
    return (
        <a onClick={() => {logout()(authDispatch)}} style={{ fontSize: "1.5em" }} >
            Logout
        </a>
    );
};