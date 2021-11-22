export default function PlatoformCard(props) {
    return (
        <div className="card">
            <div className="card-content black-text">
                <span className="card-title truncate">{props.name}</span>
            </div>
            <div >
                {props.description}
            </div>
            <div className="valign-wrapper card-action">
                <a href={"/platform/" + props.id} style={{ margin: "auto" }}>Go</a>
            </div>
        </div>
    )
}