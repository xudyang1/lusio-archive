export default function PlatformCard(props) {
    const name = props.element.name
    const id = props.element._id
    const img = props.element.bannerURI

    return (
        <div className="card">
            <div className="card-content black-text">
                <span className="card-title truncate">{name}</span>
            </div>
            <div >
            <img src={img} width="200" height="200" /><br />
            </div>
            <div className="valign-wrapper card-action">
                <a href={"/platform/" + id} style={{ margin: "auto" }}>Go</a>
            </div>
        </div>
    )
}