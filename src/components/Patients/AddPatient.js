import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import cx from 'classnames';

import Helpers from '../../helpers/helpers';
import * as firebase from "firebase";

class AddPatient extends Component {

  state = {
    name: "",
    phone: "",
    driverLic: "",
    insuranceName: "",
    claimNumber: "",
    initiationDate: "",
    executingQuery: false
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        hashHistory.push('/');
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // if (Helpers.hasEmptyFields(this.state.name, this.state.driverLic)) {
    //   this.showAlertMessage("There are empty fields!", 2500);
    //   return;
    // }
  };

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  };

  handleDriverLicChange = (e) => {
    this.setState({driverLic: e.target.value});
  };

  render() {
    return (
      <div className="form-add-patient-container">
        <form className="form-add-patient" onSubmit={this.handleSubmit}>
          <label className="sr-only">Name</label>
          <input type="text" placeholder="Name" onChange={this.handleNameChange} />
          <label className="sr-only">Password</label>
          <input type="text" placeholder="Driver's Licence Number" onChange={this.handleDriverLicChange} />

          <button className={cx(
            'btn', {
              'btn-disabled': this.state.executingQuery,
              'btn-block': !this.state.executingQuery
            })} type="submit">
            Add Patient
            {this.state.executingQuery ? <div className="loading button-spinner" /> : null}
          </button>
        </form>
      </div>
    );
  }
}


export default AddPatient;
