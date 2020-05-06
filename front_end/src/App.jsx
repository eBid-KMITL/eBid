import React, { useState, useEffect } from 'react';
import './App.scss';
import { Login, Register, Forgot, Home, Error, Result, Profile, Product, Contact, Topup, Category, AddProduct } from "./pages"
import { NavBar } from "./components"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase"
import { firebaseConfig } from './firebase_config.js'
import axios from 'axios'

const App = () => {
  const userInfo = { amount: 999999 }
  const [userData, setUserData] = useState(null);
  const api = axios.create({ baseURL: "http://localhost:5001/testebid/us-central1/api" })
  
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    let checkuser = window.localStorage.getItem('user')
    if(checkuser){
      setUserData(JSON.parse(checkuser))
      firebase.firestore().collection('user').onSnapshot(snapshot => {
        // console.log('snap')
        snapshot.forEach(doc => {
          var data = doc.data()
          data.uid = doc.id  
            if (firebase.auth().currentUser && data.uid === firebase.auth().currentUser.uid){
              setUserData(data)
              window.localStorage.setItem("user",JSON.stringify(data))
              // console.log(firebase.auth().currentUser.email)
            }
        })
      })
    }

    firebase.firestore().collection('Product').onSnapshot(snapshot => {
      // console.log('snap of Product')
    })
  }
  
  // useEffect(() => {
    
  // }, [])

  return (
    <div className="page-container">
      <Router>
        <NavBar userData={userData} />
        <Switch>
          <Route exact path="/" ><Home api={api} userData={userData}/></Route>
          <Route exact path="/login" ><Login api={api} setUserData={setUserData}/></Route>
          <Route exact path="/register" ><Register api={api} userData={userData}/></Route>
          <Route exact path="/forgot" ><Forgot api={api} userData={userData}/></Route>
          <Route path="/result" ><Result api={api} userData={userData}/></Route>
          <Route path="/profile"  ><Profile api={api} userData={userData} /></Route>
          <Route path="/product"><Product api={api} userData={userData}/></Route>
          <Route exact path="/contact" ><Contact api={api} userData={userData}/></Route>
          <Route exact path="/topup" ><Topup api={api} userData={userData}/></Route>
          <Route path="/category" ><Category api={api} userData={userData}/></Route>
          <Route path="/addproduct" ><AddProduct api={api} userData={userData}/></Route>
          <Route path="/" ><Error api={api} /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;