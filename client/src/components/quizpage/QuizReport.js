import React , { Component} from 'react';
import { withRouter } from "react-router";
import emailjs from 'emailjs-com';

class QuizReport extends Component {
    constructor() {
        super();
        this.state = {
            selectedOption: "____",
            quizId: "",
            userId: "",
            userName: ""
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.handleReport = this.handleReport.bind(this);
    }
    getItem(){
        this.setState({
            quizId: this.props.match.params.id,
            userId: this.props.userId,
            userName: this.props.userName
        }, () => {});
    }
    onChangeValue(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }
    handleReport(e) {
        e.preventDefault();
        var templateParams = {
            from_name: "Lusio Team",
            from_email: "lusioquiz@gmail.com",
            message: "Quiz " + this.state.quizId + " has been reported for " + this.state.selectedOption + " by User " + this.state.userName + " (" + this.state.userId + ")"
        }
        emailjs.send('service_ad57k0p', 'template_iycih3s', templateParams, 'user_AIO163yEXkq8D7aABTTKl').then((res) => {
            console.log('Success', res.status, res.text);
            alert("Report Success");
        }, (err) => {
            console.log('Failed...', err);
            alert("Report Failed - Please try again");
        })
    }

    componentDidMount(){
        this.getItem();
    }

    render() {
        return (
            <form onSubmit={this.handleReport} style={{ textAlign: "left", margin: "15px" }}>
                <label>
                    <input value="Abusive Community" name="group1" type="radio" checked={this.state.selectedOption === "Abusive Community"} onChange={this.onChangeValue} />
                    <span>Abusive Community</span>
                </label>
                <label>
                    <input value="Copyright Infringement" name="group1" type="radio" checked={this.state.selectedOption === "Copyright Infringement"} onChange={this.onChangeValue} />
                    <span>Copyright Infringement</span>
                </label>
                <label>
                    <input value="Trash / Scam" name="group1" type="radio" checked={this.state.selectedOption === "Trash / Scam"} onChange={this.onChangeValue} />
                    <span>Trash / Scam</span>
                </label>
                <label>
                    <input value="Sexual or Violent Content" name="group1" type="radio" checked={this.state.selectedOption === "Sexual or Violent Content"} onChange={this.onChangeValue} />
                    <span>Sexual or Violent Content</span>
                </label>
                <button type="submit" className="modal-close waves-effect waves-green btn blue" style={{ margin: "30px" }}>SUBMIT</button>
            </form>
        );
    }
}

export default withRouter (QuizReport);

