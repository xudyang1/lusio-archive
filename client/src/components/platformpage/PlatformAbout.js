import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { PlatformContext } from "../../context/PlatformState"
import { ProfileContext } from "../../context/ProfileState"
import AccountProfileButton from "../common/AccountProfileButton"
import PlatformAdminControl from "./PlatformAdminControl"


export default function PlatformAbout(props) {
    const platformData = props.data
    const { removePlatform, viewType } = useContext(PlatformContext)
    const { getProfile } = useContext(ProfileContext)
    const [ownerProfile, setOwnerProfile] = useState({})

    const history = useHistory()

    function onClickDeletePlatform() {
        removePlatform(props.id)
        history.push('/')
        window.location.reload(false);
    }

    function transferOwnerToID(userId){

    }

    function addAdmin(userId){

    }

    useEffect(() => {
        getProfile(platformData.owner, false).then(function (result) {
            //console.log("result from quizcard", result)
            setOwnerProfile(result.data.profile)
        })
    }, [])

    return (
        <div>
            <div>
                <h4>{platformData.name}</h4>
                <h4>Platform ID: {platformData._id}</h4>
                <h4>Subscribers: {platformData.subscribers.length}</h4>
                <h4>Data created: {platformData.createdAt}</h4>

                <div className="row valign-wrapper">
                    <h4 className="col">Owner: </h4>
                    <div className="col"><AccountProfileButton user={ownerProfile} userId={platformData.owner} /></div>
                </div>
                <div className="row valign-wrapper">
                    <h4 className="col">Admins: </h4>
                    {/* <div className="col"><AccountProfileButton user={ownerProfile} userId={platformData.owner}/></div> */}
                </div>

                {/* {platformData.name}<br />
                Platform ID: {platformData._id}<br />
                owner ID: {platformData.owner}<br />
                {platformData.description}<br />
                {platformData.likes}<br />
                data created: {platformData.createdAt}<br /> */}
            </div>
            <div className="divider"></div>
            {viewType == "OWNER_VIEW" ? <div>
                <div className="row">
                    <PlatformAdminControl />
                </div>
                <div className="row">
                    <a className="waves-effect waves-light btn modal-trigger red" onClick={onClickDeletePlatform}>
                        Transfer Ownership
                    </a>
                </div>
                <div className="row">
                    <a className="waves-effect waves-light btn modal-trigger red" onClick={onClickDeletePlatform}>
                        Delete Platform
                    </a>
                </div>
            </div> : <div />}
        </div>
    )
}