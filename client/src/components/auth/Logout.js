import { useContext } from "react";
import { AuthContext } from "../../context/AuthState";

export const Logout = () => {
    const { logout } = useContext(AuthContext);

    return (
        <a onClick={logout} style={{ fontSize: "1.5em" }} >
            Logout
        </a>
    );
};