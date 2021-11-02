import React, { useContext, useState, useEffect } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup, NavLink, Alert } from 'reactstrap';
import { AuthContext } from '../../context/AuthState';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import "materialize-css/dist/js/materialize.min.js";
import "../../css/auth.css";
import { RegisterModal } from './RegisterModal';
// added library of ReactDOM
import ReactDOM from 'react-dom';

export const LoginModal = () => {
    const initialState = {
        modalInstance: null,
        email: null,
        password: null,
        msg: null
    };
    const [state, setState] = useState(initialState);

    const [createAcc, setCreateAcc] = useState(false);

    const { login, error, isAuthenticated, clearErrors } = useContext(AuthContext);

    // check for login error
    useEffect(() => {
        // console.log("modal.error msg", state.msg);
        if (error && error.id === 'LOGIN_FAIL')
            setState({ ...state, msg: error.msg });
        else
            setState({ ...state, msg: null });
    }, [error]);

    // init modal & close modal if login success
    useEffect(() => {
        if (!isAuthenticated) {
            console.log("Loading Modal Init....................");
            var elem = document.querySelector('#loginModal');
            // clear errors before open and after close
            var options = {
                preventScrolling: false,
                onOpenStart: clearErrors,
                onCloseEnd: clearErrors
            };
            M.Modal.init(elem, options);
            // set modal instance
            state.modalInstance = M.Modal.getInstance(elem);
        };
        // console.log("outside if, state: ", { modalInstance: state.modalInstance, auth: isAuthenticated });
        if (isAuthenticated && state.modalInstance.isOpen) {
            // console.log("Inside if, state: ", { modalInstance: state.modalInstance, auth: isAuthenticated });
            state.modalInstance.close();
        }
    }, [isAuthenticated]);
    
    useEffect(() => {
        if (createAcc){
            var elem = document.querySelector('#loginModal');
            state.modalInstance = M.Modal.getInstance(elem);
            state.modalInstance.close();
            setCreateAcc(false);
            
            // for RegisterModal
            //trying to figure out how to render RegisterModal without formatting again on LoginModal
            console.log('Loading Create New Account Modal............')
            //ReactDOM.render(<RegisterModal/>, document.querySelector('#registerModal'));
        };
    });

    // for createAccount state (Link)
    const handleLinkToRegister = () =>{
        setCreateAcc(true);
    }

    // set email & password 
    const handleOnChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    // login
    const handleOnSubmit = e => {
        e.preventDefault();

        const { email, password } = state;
        const user = { email, password };
        // console.log("login attempt, data", user);
        // attemp to login
        login(user);
    };

    return (
        <div>
            <a className="modal-trigger" href="#loginModal">Login</a>
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
                                <input id="loginEmail" type="email" className="validate" name="email" onChange={handleOnChange} />
                                <label htmlFor="loginEmail">Email</label>
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">
                                    lock_open
                                </i>
                                <input id="loginPassword" type="password" className="active validate" name="password" onChange={handleOnChange} />
                                <label htmlFor="loginPassword">Password</label>
                            </div>
                            <div className="col s12">
                                {/* 
                                {displayCreate ? <li><RegisterModal/></li> : <li></li>}
                                */}
                                <a style={{float: "left", color: "darkblue"}} onClick={handleLinkToRegister}><u>Create Account</u></a>
                                <a style={{float: "right", color: "darkblue"}}><u>Forgot Password</u></a>
                            </div>
                            
                            <button className="btn blue accent-2 sendBtn" type="submit" name="action">
                                Login<span className="material-icons right sendIcon">login</span>
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
};