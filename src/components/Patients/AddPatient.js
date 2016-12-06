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
    if (Helpers.hasEmptyFields(this.state.name, this.state.driverLic)) {
      this.showAlertMessage("There are empty fields!", 2500);
      return;
    }
    this.setState({executingQuery: true});
    const user = firebase.auth().currentUser;
    this.addPatient(user.uid, user.email).then(this.addPatientSuccessCb,
      (error) => {
        // this.showAlertMessage(error.message, "danger", 3000);
        this.setState({executingQuery: false});
        console.log(error);
      });
  };

  addPatientSuccessCb = () => {
    // this.showAlertMessage("Your post was created successfully!", "success", 2500);
    this.setState({
      name: "",
      phone: "",
      driverLic: "",
      insuranceName: "",
      claimNumber: "",
      initiationDate: "",
      executingQuery: false
    });
  };

  addPatient = (uid, username) => {
    const patientData = {
      name: this.state.name,
      phone: this.state.phone,
      driverLic: this.state.driverLic,
      insuranceName: this.state.insuranceName,
      claimNumber: this.state.claimNumber,
      initiationDate: this.state.initiationDate,
      userEmail: username,
      datetime: (new Date()).toJSON()
    };
    const newPatientKey = firebase.database().ref().child('patients').push().key;

    let updates = {};
    updates['/patients/' + newPatientKey] = patientData;
    updates['/clinic-patients/' + uid + '/' + newPatientKey] = patientData;

    return firebase.database().ref().update(updates);
  };

  handleNameChange = e => {
    this.setState({name: e.target.value});
  };

  handleDriverLicChange = e => {
    this.setState({driverLic: e.target.value});
  };

  handleInsuranceCompany = e => {
    this.setState({insuranceName: e.target.value});
  };

  handleClaimNumber = e => {
    this.setState({claimNumber: e.target.value});
  };

  handleInitiationDate = e => {
    this.setState({initiationDate: e.target.value});
  };

  handlePhoneNumber = e => {
    this.setState({phone: e.target.value});
  };

  render() {
    return (
      <div className="form-add-patient-container">
        <form className="form-add-patient" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-col-50">
              <label className="sr-only">Full Name</label>
              <input type="text" placeholder="Barack Obama" onChange={this.handleNameChange} />
            </div>
            <div className="form-col-50-right">
              <label className="sr-only">Driver's Licence Number</label>
              <input type="text" placeholder="F255-921-50-094-0" onChange={this.handleDriverLicChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col-50">
              <label className="sr-only">Insurance Company</label>
              <input type="text" placeholder="GEICO" onChange={this.handleInsuranceCompany} />
            </div>
            <div className="form-col-50-right">
              <label className="sr-only">Claim Number</label>
              <input type="number" placeholder="123456789" onChange={this.handleClaimNumber} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col-50">
              <label className="sr-only">Initiation Date</label>
              <input type="text" placeholder="MM/DD/YYYY" onChange={this.handleInitiationDate} />
            </div>
            <div className="form-col-50-right">
              <label className="sr-only">Phone Number</label>
              <input type="text" placeholder="(123)-456-7890" onChange={this.handlePhoneNumber} />
            </div>
          </div>

          <div className="form-button-container">
            <button className={cx(
              'btn', {
                'btn-disabled': this.state.executingQuery,
                'btn-block': !this.state.executingQuery
              })} type="submit">
              Add Patient
              {this.state.executingQuery ? <div className="loading button-spinner" /> : null}
            </button>
          </div>
        </form>
      </div>
    );
  }
}


export default AddPatient;
