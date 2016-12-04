import React, { Component } from 'react';
import { Link } from 'react-router';
import * as firebase from "firebase";

class App extends Component {

  constructor (props) {
    super(props);

    this.state = { userLoggedIn: false };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(this.callBackAuthState);
  };

  callBackAuthState = (user) => {
    if (user) {
      // User is signed in.
      this.setState({ userLoggedIn: true});
    } else {
      // No user is signed in.
      this.setState({ userLoggedIn: false});
    }
  };

  handleLogOutClick = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }, (error) => {
      // An error happened.
      console.log(error);
    });
  };

  render() {
    return (
      <div className="main-container">
        {this.state.userLoggedIn ?
          <div className="home-container">

            <div className="big-right-col">
              <div className="app-name-menu">
                Clinics App
              </div>

              <div className="user-profile-pic"></div>
              <p className="user-profile-name">Raul Rivero Monzon</p>
              <p className="admin-account">Admin</p>

              <ul className="right-menu">
                <li>
                  <Link to="add_patient">
                    <div className="right-menu__add-icon" />
                    Add New Patient
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <div className="right-menu__add-icon" />
                    List of Clinics
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <div className="right-menu__add-icon" />
                    List of Patients
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <div className="right-menu__add-icon" />
                    List of Clinics
                  </Link>
                </li>
              </ul>
            </div>

            <div className="big-main-col">
              <div className="top-header">
                <div className="top-header__title-container"><p>{}</p></div>
                <div className="top-menu__container">
                  <Link to="dashboard"><div className="home top-menu__item" /></Link>
                  <Link to="/" onClick={this.handleLogOutClick}><div className="logout top-menu__item" /></Link>
                </div>
              </div>

              {this.props.children}
            </div>
            <p className="copyright">&copy; 2017. All rights reserved.</p>

          </div>
          : this.props.children
        }
      </div>
    );
  }
}


export default App;
