import React, { useContext, useState, useEffect } from "react";
// import { Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup, NavLink, Alert } from 'reactstrap';
import { AuthContext } from '../../context/AuthState';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

export const LoginModal = () => {
    const initialState = {
        modal: false,
        email: '',
        password: '',
        msg: null
    };
    const [state, setState] = useState(initialState);
    // console.log(state);
    const { loadUser, login, error, isAuthenticated, clearErrors } = useContext(AuthContext);
    useEffect(() => { loadUser(); }, []);
    useEffect(() => {
        // check for login error
        if (error.id === 'LOGIN_FAIL')
            setState({ ...state, msg: error.msg });
        else
            setState({ ...state, msg: null });
        if (state.modal && isAuthenticated)
            toggle();
    }, [error, isAuthenticated]);

    const toggle = () => {
        clearErrors();
        // close modal
        setState({ ...state, modal: !state.modal });
    };

    const onChange = e => {
        setState({ [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault();

        const { email, password } = state;
        const user = { email, password };

        // attemp to login
        login(user);
    };

    document.addEventListener('DOMContentLoaded', function () {
        var elem = document.querySelectorAll('#modal1');
        M.Modal.init(elem);
        var instance = M.Modal.getInstance(elem);
    });

    useEffect(() => { M.AutoInit(); });
    return (
        <div>
            <a className="modal-trigger" href="#modal1" >Modal</a>

            <div id="modal1" className="modal black-text" style={{ margin: "auto" }}>
                <div className="modal-content" style={{ height: "300px", margin: "auto" }}>
                    <div className="row">
                        {state.msg ? (
                            <p className="alert">{state.msg}</p>
                        ) : null}
                        <form className="col s12" onSubmit={onSubmit}>
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn waves-effect waves-light" type="submit" name="action" onSubmit={onSubmit}>Login

                            </button>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <button href="#" className="modal-close waves-effect waves-green btn-flat">Login</button>
                </div>
            </div >
        </div >
    );
    // return (
    //     <div>
    //         <NavLink onClick={toggle} href='#'>
    //             Login
    //         </NavLink>

    //         <Modal
    //             isOpen={state.modal}
    //             toggle={toggle}
    //         >
    //             <ModalHeader toggle={toggle}>Login</ModalHeader>
    //             <ModalBody>
    //                 {state.msg ? (
    //                     <Alert color="danger">{state.msg}</Alert>
    //                 ) : null}
    //                 <Form onSubmit={onSubmit}>
    //                     <FormGroup>

    //                         <Label for="email">Email</Label>
    //                         <Input
    //                             type="email"
    //                             name="email"
    //                             id="email"
    //                             placeholder="Email"
    //                             className="mb-3"
    //                             onChange={onChange}
    //                             autoComplete="email"
    //                         />

    //                         <Label for="password">Password</Label>
    //                         <Input
    //                             type="password"
    //                             name="password"
    //                             id="password"
    //                             placeholder="password"
    //                             className="mb-3"
    //                             onChange={onChange}
    //                             autoComplete="current-password"
    //                         />
    //                         <Button
    //                             color="dark"
    //                             style={{ marginTop: '2rem' }}
    //                             block
    //                         >Login</Button>
    //                     </FormGroup>
    //                 </Form>
    //             </ModalBody>
    //         </Modal>
    //     </div>
    // );
};;