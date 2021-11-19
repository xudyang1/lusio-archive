import { CreateQuizButton } from "../editquizpage/CreateQuizButton";


export default function AddItemCard(props) {
    return (
        <div>
            <div>
                <a className="btn-floating btn-large waves-effect waves-light red" onClick={props.callback}><i class="material-icons">add</i></a>
            </div>
        </div>
    )
}