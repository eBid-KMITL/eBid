import React from 'react';
import './App.scss';
import { Login, Register, Forgot, Home, Error, Result, Profile, Product, Contact, Topup, Category, AddProduct } from "./pages"
import { NavBar } from "./components"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase";
import { firebaseConfig } from './firebase_config.js';
import axios from 'axios';

const App = () => {
  const userInfo = { amount: 999999 }
  const api = axios.create({baseURL : "http://localhost:5001/testebid/us-central1/api"})

  firebase.initializeApp(firebaseConfig)
  
  return (
    <div className="page-container">
      <Router>
        <NavBar userInfo={userInfo} />
        <Switch>
          <Route exact path="/"><Home api={api}/></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/register"><Register /></Route>
          <Route exact path="/forgot"><Forgot /></Route>
          <Route path="/result"><Result /></Route>
          <Route path="/profile"><Profile api={api}/></Route>
          <Route path="/product"><Product userInfo={userInfo} api={api}/></Route>
          <Route exact path="/contact"><Contact /></Route>
          <Route exact path="/topup"><Topup /></Route>
          <Route path="/category"><Category /></Route>
          <Route path="/addproduct"><AddProduct /></Route>
          <Route path="/"><Error /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;