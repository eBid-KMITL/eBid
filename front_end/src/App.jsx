import React, { useState, useEffect } from 'react';
import './App.scss';
import { Login, Register, Forgot, Home, Error, Result, Profile, Product, Contact, Topup } from "./pages"
import { NavBar, Footer } from "./components"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase"
import { firebaseConfig } from './firebase_config'


const App = () => {
  const status = 1
  const userInfo = { username: "admin", amount: "0" }
  firebase.initializeApp(firebaseConfig)

  return (
    <div className="page-container">
      <Router>
        <div className="content-wrap">
          <NavBar status={status} userInfo={userInfo} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/result" component={Result} />
            <Route path="/profile" component={Profile} />
            <Route path="/product" component={Product} />
            <Route path="/contact" component={Contact} />
            <Route path="/topup" component={Topup} />
            <Route path="/" component={Error} />
          </Switch>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App;