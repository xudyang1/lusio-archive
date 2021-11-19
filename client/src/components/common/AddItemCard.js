

export default function AdddItemCard(props) {
    return (
        <div>
            <div className="card blue-grey darken-1">
                <a class="btn-floating btn-large waves-effect waves-light red" onClick={props.callback}><i class="material-icons">add</i></a>
            </div>
        </div>
    )
}