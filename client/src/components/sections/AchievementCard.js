export default function AchievementCard(props) {
    return (
        <div className="card">
            <div className="card-content black-text">
                <span className="card-title truncate">{props.element.title}</span>
            </div>
            <div >
                {
                    props.achieved ?
                        <img src={props.element.imageURI} width="200" height="200" /> 
                        :<img src={props.element.imageURI} width="200" height="200" style={{ opacity: "0.3" }} />
                }
            </div>
            <div className="card-action">
                {props.element.description}
            </div>
        </div>
    )
}