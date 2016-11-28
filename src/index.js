import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import './styles/index.css';
import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyApy6AvfWmzas7o6UeEnj5DW84DQL4Suhc",
  authDomain: "clinics-app.firebaseapp.com",
  databaseURL: "https://clinics-app.firebaseio.com",
  storageBucket: "clinics-app.appspot.com",
  messagingSenderId: "633851366663"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="dashboard" component={Home} />
      {/*<Route path="register" component={Register} />*/}
      {/*<Route path="posts/:postId" component={PostDetails} />*/}
      {/*<Route path="posts/edit/:postId" component={EditPost} />*/}
    </Route>
  </Router>,
  document.getElementById('root')
);
