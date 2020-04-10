import React from 'react';
import './App.scss';
import { Login, Register, Forgot, Home, Error, Result, Profile, Product, Contact, Topup, Category } from "./pages"
import { NavBar } from "./components"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase"
import { firebaseConfig } from './firebase_config'

const App = () => {
  const userInfo = { amount: 999999 }
  firebase.initializeApp(firebaseConfig)

  return (
    <div className="page-container">
      <Router>
        <NavBar userInfo={userInfo} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot" component={Forgot} />
          <Route path="/result" component={Result} />
          <Route path="/profile" component={Profile} />
          <Route path="/product" component={Product} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/topup" component={Topup} />
          <Route path="/category" component={Category} />
          <Route path="/" component={Error} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;