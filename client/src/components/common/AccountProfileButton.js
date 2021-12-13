import React from 'react';
import { NavLink } from "react-router-dom";
import { ImagePreview } from './ImagePreview';

/***
 * @param props Takes props.user
 */
export default function AccountProfileButton(props) {

    // const { user, isAuthenticated } = useContext(AuthContext);
    // const { profile, getProfile } = useContext(ProfileContext)

    // const { id } = useParams()
    // const { url, path } = useRouteMatch()
    const userId = props.userId

    const user = props.user ? props.user : {
        iconURI: null,
        name: "UNDEF"
    }

    const s = {
        height: "50px",
        paddingLeft: "0px",
        paddingRight: "0px",
        marginTop: "5px",
        marginRight: "10px"
    }

    return (
        <div className="valign-wrapper" style={{width: "120px"}}>
            <a href={"/profile/" + userId} style={s}>
                {/* <img className="circle" src={user.iconURI ? user.iconURI : "https://static.thenounproject.com/png/363633-200.png"} width='50px' height='50px' /> */}
                <ImagePreview isCircle={true} imageSrc={user.iconURI} imageWidth='50px' imageHeight='50px' />
            </a>
            {user.name}
        </div>
    )
}

