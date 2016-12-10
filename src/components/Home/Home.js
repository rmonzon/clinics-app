import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import * as firebase from "firebase";

import Spinner from '../Spinner/spinner';

class Home extends Component {

  state = {
    isFetchingData: false,
    patients: []
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        hashHistory.push('/');
      } else {
        this.setState({isFetchingData: true});
        const self = this;
        firebase.database().ref('/patients/').once('value').then(function(snapshot) {
          self.buildTable(snapshot.val());
        });
      }
    });
  };

  buildTable = (data) => {
    let tempData = [];
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        tempData.push(
          <div key={k} className="table-body">
            <div className="table-col-body">Clinic ID</div>
            <div className="table-col-body">{data[k].name}</div>
            <div className="table-col-body">{data[k].driverLic}</div>
            <div className="table-col-body">{data[k].insuranceName}</div>
            <div className="table-col-body">{data[k].claimNumber}</div>
            <div className="table-col-body">{data[k].initiationDate}</div>
            <div className="table-col-body">{data[k].phone}</div>
          </div>
        );
      }
    }
    console.log(data);
    this.setState({patients: tempData, isFetchingData: false});
  };

  render() {
    return (
      <div className="home-body-container">
        <p>List of Patients</p>

        <div className="table-container">
          <div className="table-header">
            <div className="table-col-header">Clinic ID</div>
            <div className="table-col-header">Full Name</div>
            <div className="table-col-header">Driver Lic #</div>
            <div className="table-col-header">Insurance</div>
            <div className="table-col-header">Claim Number</div>
            <div className="table-col-header">Initial Date</div>
            <div className="table-col-header">Phone</div>
          </div>

          {this.state.isFetchingData ?
            <Spinner width={23} height={23} color="#198FD7" borderColor="#daedf3" cssClass="table-spinner" />
            : this.state.patients
          }
        </div>
      </div>
    );
  }
}


export default Home;

