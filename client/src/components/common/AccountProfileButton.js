import React from 'react';
import { NavLink } from "react-router-dom";

/***
 * @param props Takes props.user
 */
export default function AccountProfileButton(props) {

    // const { user, isAuthenticated } = useContext(AuthContext);
    // const { profile, getProfile } = useContext(ProfileContext)

    // const { id } = useParams()
    // const { url, path } = useRouteMatch()
    const user = props.user? props.user: {
        iconURI: null,
        profile: undefined,
        name: "UNDEF"
    }

    const s = {
        height: "50px",
        paddingLeft: "0px",
        paddingRight: "0px",
        marginTop: "5px"
    }

    return (
        <div className="valign-wrapper">
            <NavLink to={"/profile/" + user.profile} style={s}>
                <img className="circle" src={user.iconURI ? user.iconURI : "https://static.thenounproject.com/png/363633-200.png"} width='50px' height='50px' />
            </NavLink>
            {user.name}
        </div>
    )
}

