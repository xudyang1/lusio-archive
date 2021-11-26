import React, { useContext, useState, useEffect } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup, NavLink, Alert } from 'reactstrap';
import { AuthContext } from '../../context/AuthState';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import "materialize-css/dist/js/materialize.min.js";
import "../../css/auth.css";
import Spinner from '../common/Spinner';

export const LoginModal = () => {
    const initialState = {
        modalInstance: null,
        email: null,
        password: null,
        msg: null,
        loading: false
    };
    const [state, setState] = useState(initialState);

    const { login, loadUser, error, isAuthenticated, clearErrors } = useContext(AuthContext);

    // check for login error
    useEffect(() => {
        if (error && error.id === 'LOGIN_FAIL')
            setState({ ...state, msg: error.msg, loading: false });
        else
            setState({ ...state, msg: null, loading: false });
    }, [error]);

    // init modal & close modal if login success
    useEffect(() => {
        if (!isAuthenticated) {
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
        if (isAuthenticated && state.modalInstance.isOpen) {
            setState({ ...state, loading: false })
            state.modalInstance.close();
        }
    }, [isAuthenticated]);

    // set email & password 
    const handleOnChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    // login
    const handleOnSubmit = e => {
        e.preventDefault();

        const { email, password } = state;
        const user = { email, password };
        console.log("login attempt, data", user);
        // attemp to login
        setState({ ...state, loading: true })
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
                            {state.loading ? <Spinner /> :
                                <button className="btn blue accent-2 sendBtn" type="submit" name="action">
                                    Login<span className="material-icons right sendIcon">login</span>
                                </button>}
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