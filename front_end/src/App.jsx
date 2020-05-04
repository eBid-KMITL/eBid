import React from 'react';
import './App.scss';
import { Login, Register, Forgot, Home, Error, Result, Profile, Product, Contact, Topup, Category, AddProduct } from "./pages"
import { NavBar } from "./components"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import firebase from "firebase"
import { firebaseConfig } from './firebase_config.js'
import axios from 'axios'

const App = () => {
  const userInfo = { amount: 999999 }
  
  const api = axios.create({baseURL : "http://localhost:5001/testebid/us-central1/api"})

  firebase.initializeApp(firebaseConfig)
  
  return (
    <div className="page-container">
      <Router>
        <NavBar userInfo={userInfo} />
        <Switch>
          <Route exact path="/" ><Home api={api}/></Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" ><Register api={api}/></Route>
          <Route exact path="/forgot" component={Forgot} />
          <Route path="/result" component={Result} />
          <Route path="/profile" component={Profile} />
          <Route path="/product"><Product api={api}/></Route>
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/topup" component={Topup} />
          <Route path="/category" component={Category} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/" component={Error} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;