import React, { useState, useEffect } from 'react';
import './App.scss';
import { Login, Register, Forgot, Home, Error, Result, Welcome } from "./pages"
import { NavBar } from "./components"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import firebase from "firebase"
import {firebaseConfig} from './firebase_config'


const App = () => {
  const userInfo = { username: "prayuth007", amount: "999,999" }  
  firebase.initializeApp(firebaseConfig)

  return (
    <Router>
      <NavBar status={0} userInfo={userInfo} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/result" component={Result} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/" component={Error} />
      </Switch>
    </Router>
  )
}

export default App;