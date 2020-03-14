import React, { useState, useEffect } from 'react';
import './App.scss';
import { Login, Register, Forgot, Home, Error, Result, Profile, Product, Contact } from "./pages"
import { NavBar, Footer } from "./components"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import firebase from "firebase"
import {firebaseConfig} from './firebase_config'


const App = () => {
  const userInfo = { username: "admin", amount: "999,999" }  
  firebase.initializeApp(firebaseConfig)

  return (
    <Router>
      <NavBar status={1} userInfo={userInfo} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/result" component={Result} />
        <Route path="/profile" component={Profile} />
        <Route path="/product" component={Product} />
        <Route path="/contact" component={Contact} />
        <Route path="/" component={Error} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;