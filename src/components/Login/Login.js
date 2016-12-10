import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import cx from 'classnames';
import Helpers from '../../helpers/helpers';
import Spinner from '../Spinner/spinner';
// import AlertMessage from '../../components/Alert/AlertMessage'

import * as firebase from "firebase";

class Login extends Component {

  state = {
    email: "",
    password: "",
    alertMessage: "",
    alertType: "danger",
    visible: false,
    checkingCredentials: false
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        hashHistory.push('/dashboard');
      }
    });
  };

  showAlertMessage = (msg, time) => {
    this.setState({ alertMessage: msg });
    this.setState({ visible: true });
    setTimeout(() => {
      this.setState({ visible: false });
    }, time);
  };

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  };

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  };

  signInErrorCb = (error) => {
    switch (error.code) {
      case "auth/user-not-found": {
        this.showAlertMessage("There is no account associated with that email address.", 2500);
        break;
      }
      case "auth/wrong-password": {
        this.showAlertMessage("Invalid password, please try again!", 2500);
        break;
      }
      default:
        this.showAlertMessage(error.message, 2500);
        break;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (Helpers.hasEmptyFields(this.state.email, this.state.password)) {
      this.showAlertMessage("There are empty fields!", 2500);
      return;
    }
    if (!Helpers.isValidEmail(this.state.email)) {
      this.showAlertMessage("Invalid email address!", 2500);
      return;
    }
    this.setState({checkingCredentials: true});
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.setState({checkingCredentials: false});
      hashHistory.push('/dashboard');
    }, this.signInErrorCb);
  };

  render() {
    return (
      <div className="login-container">
        {/*<AlertMessage type={this.state.alertType} message={this.state.alertMessage} visible={this.state.visible} />*/}
        <div className="form-signin-container">
          <h2>Login to the App</h2>

          <form className="form-signin" onSubmit={this.handleSubmit}>
            <label className="sr-only">Email address</label>
            <input type="email" placeholder="Email" onChange={this.handleEmailChange} />
            <label className="sr-only">Password</label>
            <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />

            <button className={cx(
              'btn', {
                'btn-disabled': this.state.checkingCredentials,
                'btn-block': !this.state.checkingCredentials
              })} type="submit">
              Log in
              {this.state.checkingCredentials ? <Spinner width={16} height={16} cssClass="button-spinner" /> : null}
            </button>

            <div className="forgot-credentials-container">
              <a href="#">Having trouble logging in?</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
