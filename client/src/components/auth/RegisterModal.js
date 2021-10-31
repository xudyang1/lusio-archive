import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../context/AuthState';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import "materialize-css/dist/js/materialize.min.js";
import "../../css/auth.css";

export const RegisterModal = () => {
    const initialState = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };
    const [state, setState] = useState(initialState);
    // console.log(state);
    const { register, error, isAuthenticated, clearErrors } = useContext(AuthContext);
   
    useEffect(() => {
        // check for register error
        console.log("modal.error msg", state.msg);
        if (error && error.id === 'REGISTER_FAIL')
            setState({ ...state, msg: error.msg });
        else
            setState({ ...state, msg: null });
        if (state.modal && isAuthenticated)
            toggle();
    }, [error, isAuthenticated]);

    const toggle = () => {
        clearErrors();
        // close modal
        console.log("toggle", error);
        setState({ ...state, modal: !state.modal });
    };

    const handleOnChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    // login
    const handleOnSubmit = e => {
        e.preventDefault();

        const user = { email: state.email, password: state.password };
        console.log("login attempt, data", user);
        // attemp to login
        login(user);
    };

    document.addEventListener('DOMContentLoaded', function () {
        var elem = document.querySelectorAll('#loginModal');
        M.Modal.init(elem);
    });

    // close modal if login successfully
    useEffect(() => {
        if (isAuthenticated) {
            var elem = document.querySelector('#loginModal');
            var instance = M.Modal.getInstance(elem);
            console.log("instance:", { instance: instance });
            instance.close();
        }
    }, [isAuthenticated]);

    return (
        <div>
            <a className="modal-trigger" href="#loginModal" onClick={toggle}>Login</a>
            <div id="loginModal" className="modal black-text ">
                <div className="modal-content">
                    <h3 className="modalHeader col s12">Login</h3>
                    <div className="row">
                        <div>
                            {state.msg ? (<p className="deep-orange-text text-accent-4">{state.msg}</p>) : null}
                        </div>
                        <form className="col s12" onSubmit={handleOnSubmit}>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="email" type="email" className="validate" name="email" onChange={handleOnChange} />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">
                                    lock_open
                                </i>
                                <input id="password" type="password" className="validate" name="password" onChange={handleOnChange} />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn blue accent-2 sendBtn" type="submit" name="action">
                                Login<span className="material-icons right sendIcon">send</span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat">Back</a>
                </div>
            </div >
        </div >
    );
};;
class RegisterModal extends Component {

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }

        }
        // if authenticated close modal 
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // create user object
        const newUser = {
            name,
            email,
            password
        };

        // attemps to register
        this.props.register(newUser);

        // close modal
        // this.toggle();
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color="danger">{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    autoComplete="username"
                                />

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    autoComplete="email"
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                    autoComplete="new-password"
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
