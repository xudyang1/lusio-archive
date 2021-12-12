import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { PlatformContext } from "../../context/PlatformState"
import { ProfileContext } from "../../context/ProfileState"
import AccountProfileButton from "../common/AccountProfileButton"
import PlatformAdminControl from "./PlatformAdminControl"


export default function PlatformAbout(props) {
    const platformData = props.data
    const { removePlatform, viewType, updatePlatform, platform } = useContext(PlatformContext)
    const { getProfile } = useContext(ProfileContext)

    const [ownerProfile, setOwnerProfile] = useState({})
    const [adminIDS, setAdmins] = useState([])

    const history = useHistory()

    function onClickDeletePlatform() {
        removePlatform(props.id)
        history.push('/')
        window.location.reload(false);
    }

    function transferOwnerToID(userId) {
        console.log(userId)
        addAdmin(ownerProfile._id)
        removeAdmin(userId)
        const payload = {
            mode: "EDIT",
            platform:{
                owner: userId
            }
        }
        updatePlatform(platformData._id, payload)
    }

    function addAdmin(userId) {
        console.log(userId)
        const payload = {
            mode: "ADD",
            platform: {
                admins: userId
            }
        }
        updatePlatform(platformData._id, payload)
    }

    function removeAdmin(userId) {
        console.log(userId)
        const payload = {
            mode: "DELETE",
            platform: {
                admins: userId
            }
        }
        updatePlatform(platformData._id, payload)
        window.location.reload(false);
    }

    const getOwnerProfile = async (userId) => {
        let res = await getProfile(userId, false).then(function (result) {
            setOwnerProfile(result.data.profile)
        })
        //console.log(res)
    }

    useEffect(() => {
        if (platform.owner)
            getOwnerProfile(platform.owner)
        // getProfile(platformData.owner, false).then(function (result) {
        //     if (result)
        //         setOwnerProfile(result.data.profile)
        // })
    }, [platform])

    useEffect(() => {
        if (platform.admins) {
            let adminArr = []
            platform.admins.map((element, index) => {
                getProfile(element, false).then(function (result) {
                    adminArr.push(result.data.profile)
                    setAdmins([...adminArr])
                })
            })
        }
    }, [platform])

    function loadAdmins() {
        let output = []
        adminIDS.map((element, index) => {
            // console.log(element)
            output.push(<AccountProfileButton key={index} user={element} userId={element._id} />)
        })
        return output
    }

    return (
        <div>
            { }
            <div>
                <h4>{platformData.name}</h4>
                <h4>Platform ID: {platformData._id}</h4>
                <h4>Date created: {platformData.createdAt}</h4>

                <div className="row valign-wrapper">
                    <h4 className="col">Owner: </h4>
                    <div className="col"><AccountProfileButton key={-1} user={ownerProfile} userId={platformData.owner} /></div>
                </div>
                <div className="row valign-wrapper">
                    <h4 className="col">Admins: </h4>
                    <div className="col">
                        {
                            loadAdmins()
                        }
                    </div>
                    {/* <div className="col"><AccountProfileButton user={ownerProfile} userId={platformData.owner}/></div> */}
                </div>
            </div>
            <div className="divider"></div>
            {viewType == "OWNER_VIEW" ? <div>
                <div className="row">
                    <PlatformAdminControl
                        callback={addAdmin}
                        buttonText={"Add Admin"}
                        title={"Add Admin"}
                        msg={"Add an admin to this platform, Admins are also allowed to add their quiz to this platform"}
                        id={"AddAdmin"}
                        type={"ADD"}
                        listProfiles={[]}
                    />
                </div>
                <div className="row">
                    <PlatformAdminControl
                        callback={removeAdmin}
                        buttonText={"Remove Admin"}
                        title={"Remove Admin"}
                        msg={"Remove an admin from this platform, they are no longer allowed to modify the platform"}
                        id={"RemoveAdmin"}
                        type={"REMOVE"}
                        listProfiles={adminIDS}
                    />
                </div>
                <div className="row">
                <PlatformAdminControl
                        callback={transferOwnerToID}
                        buttonText={"Transfer Ownership"}
                        title={"Transfer Ownership"}
                        msg={"Transfer the ownership of this platform to another admin. You will become an admin instead"}
                        id={"TransferOwnership"}
                        type={"TRANSFER"}
                        listProfiles={adminIDS}
                    />
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