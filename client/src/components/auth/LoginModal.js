import React, { useContext, useState, useEffect, useReducer, useRef } from 'react';
import { AuthContext } from '../../context/AuthState';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../../css/auth.css";
import Spinner from '../common/Spinner';
import { login } from '../../actions/AuthActions';
import { errorInitialState, ErrorReducer } from '../../reducers/ErrorReducer';
import { clearErrors } from '../../actions/ErrorActions';

const initialState = {
    modalInstance: null,
    email: null,
    password: null,
    loading: false
};

export const LoginModal = () => {
    // normal flow
    const [state, setState] = useState(initialState);
    // error flow
    const [error, errorDispatch] = useReducer(ErrorReducer, errorInitialState);
    // auth flow
    const { authDispatch, isAuthenticated } = useContext(AuthContext);

    // modal init
    const loginModalRef = useRef(null);
    useEffect(() => {
        // clear errors before open and after close
        const options = {
            preventScrolling: false,
            onOpenStart: () => errorDispatch(clearErrors()),
            onCloseEnd: () => errorDispatch(clearErrors())
        };
        M.Modal.init(loginModalRef.current, options);
        // set modal instance
        state.modalInstance = M.Modal.getInstance(loginModalRef.current);
    }, []);

    // get email & password from input
    const handleOnChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    // login
    const handleOnSubmit = e => {
        e.preventDefault();

        const { email, password } = state;
        const user = { email, password };
        // attemp to login
        setState({ ...state, loading: true });
        login(user)(authDispatch, errorDispatch);
    };

    // check for login error
    useEffect(() => {
        setState({ ...state, loading: false });
    }, [error]);

    // close modal if login success
    useEffect(() => {
        if (isAuthenticated && state.modalInstance.isOpen) {
            setState({ ...state, loading: false });
            state.modalInstance.close();
        }
    }, [isAuthenticated]);

    return (
        <div>
            <a className="modal-trigger" href="#loginModal">Login</a>
            <div id="loginModal" className="modal black-text " ref={loginModalRef}>
                <div className="modal-content">
                    <h3 className="modalHeader col s12">Login</h3>
                    <div className="row">
                        <div>
                            {error.msg && (<p className="deep-orange-text text-accent-4">{error.msg}</p>)}
                        </div>
                        <form className="col s12" onSubmit={handleOnSubmit}>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="loginEmail" type="email" className="validate" name="email" autoComplete="email" onChange={handleOnChange} />
                                <label htmlFor="loginEmail">Email</label>
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">
                                    lock_open
                                </i>
                                <input id="loginPassword" type="password" className="active validate" name="password" autoComplete="current-password" onChange={handleOnChange} />
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