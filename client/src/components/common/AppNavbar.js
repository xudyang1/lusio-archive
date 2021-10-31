import React, { Component, useContext, useEffect } from 'react';
import Modal from "react-responsive-modal";
import 'materialize-css';
import '../../css/frontpage.css';
// import M from 'materialize-css';
import SearchBar from '../SearchBar';
import { LoginModal } from '../auth/LoginModal';
import { AuthContext } from '../../context/AuthState';

const AppNavbar = () => {

  const { loadUser } = useContext( AuthContext );
  //load user
  useEffect(() => { loadUser(); }, []);

  return (
    <nav>
      <div className="nav-wrapper">

        <a href="/" className="brand-logo" style={{ paddingLeft: '1em' }}>Lusio</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <LoginModal />
          </li>
          <li><a href="https://github.com/xudyang1/CSE416_Lusio">Github</a></li>
        </ul>
        <SearchBar />
      </div>
    </nav>
  );
};


// class AppNavbar extends Component {

//   constructor(props){
//     super(props)

//     this.state = {
//       sign: false,
//       login: false
//     }
//   }

//   onOpenModal = () => {
//     this.setState({sign: true});
//   };

//   onOpenModalLogin = () => {
//     this.setState({login: true});
//   };

//   onCloseModal = () => {
//     this.setState({sign: false});
//   };

//   onCloseModalLogin = () => {
//     this.setState({login: false});
//   };

//   render(){
//     const {login, sign} = this.state;
//     return (
//       <nav>
//         <div className="nav-wrapper">
//           <a href="/" className="brand-logo" style={{ paddingLeft: '1em' }}>Lusio</a>
//           <ul id="nav-mobile" className="right hide-on-med-and-down">
//             <li><a href="https://github.com/xudyang1/CSE416_Lusio">Github</a></li>
//             <li><a id="login" onClick={this.onOpenModalLogin}>Login</a></li>
//             <li><a id="signup" onClick={this.onOpenModal}>Register</a></li>
//           </ul>
//           <SearchBar />
//         </div>
//         <Modal open={sign} onClose={this.onCloseModal}>
//               <div className="modal-body">
//                 <h2>Create New Account</h2>
//                 <form className="contact-form form-validate3" novalidate="novalidate">
//                   <div className="form-group">
//                     <input className="form-control" type="text" name="name" id="name" placeholder="ID" required="" autoComplete="off" aria-required="true" />
//                   </div>
//                   <div className="form-group">
//                     <input className="form-control" type="email" name="email" placeholder="E-mail" required="" autoComplete="off" aria-required="true" />
//                   </div>
//                   <div className="form-group">
//                     <input className="form-control" type="password" name="pass" className="form-control" placeholder="Password" required="" autoComplete="off" aria-required="true" />
//                   </div>
//                   <input className="btn btn-md btn-primary btn-center" id="sign_up" type="button" value="Sign Up" />
//                 </form>
//               </div>
//             </Modal>
//             <Modal open={login} onClose={this.onCloseModalLogin}>
//               <div className="modal-body">
//                 <h2>Login</h2>
//                 <form className="contact-form form-validate4" novalidate="novalidate">
//                   <div className="form-group">
//                     <input className="form-control" type="email" name="email" placeholder="E-mail" required="" autoComplete="off" aria-required="true" />
//                   </div>
//                   <div className="form-group">
//                     <input className="form-control" type="password" name="pass" className="form-control" placeholder="Password" required="" autoComplete="off" aria-required="true" />
//                   </div>
//                   <input className="btn btn-md btn-primary btn-center" id="login_btn" type="button" value="Login" />
//                 </form>
//               </div>
//             </Modal>
//       </nav>
//     )
//   }
// }

export default AppNavbar;