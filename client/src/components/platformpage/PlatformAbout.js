import { useContext } from "react"
import { useHistory } from "react-router"
import { PlatformContext } from "../../context/PlatformState"


export default function PlatformAbout(props) {
    const platformData = props.data
    const { removePlatform } = useContext(PlatformContext)
    const history = useHistory()
    function onClickDeletePlatform() {
        removePlatform(props.id)
        history.push('/')
        window.location.reload(false);
    }

    return (
        <div>
            <div>
                {platformData.name}<br />
                Platform ID: {platformData._id}<br />
                owner ID: {platformData.owner}<br />
                {platformData.description}<br />
                {platformData.likes}<br />
                data created: {platformData.createdAt}<br />
            </div>
            <div>
                <a className="waves-effect waves-light btn modal-trigger red" onClick={onClickDeletePlatform}>
                    Delete Account
                </a>
            </div>
        </div>
    )
}