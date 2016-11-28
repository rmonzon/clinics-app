import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import * as firebase from "firebase";

class Home extends Component {

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        hashHistory.push('/');
      }
    });
  };

  render() {
    return (
      <div>
        this is home
      </div>
    );
  }
}


export default Home;

