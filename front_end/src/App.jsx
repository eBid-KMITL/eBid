import React from 'react';
import './App.scss';
import { Login, Register, Forgot, Home, Error, Result } from "./pages"
import { NavBar } from "./components"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import fire from "./firebase_config"

const App = () => {
  const userInfo = {username: "prayuth007", amount: "999,999"}

  return (
    <Router>
      <NavBar status={0} userInfo={userInfo}/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/result" component={Result}/>
        <Route path="/" component={Error}/>
      </Switch>
    </Router>
  )
}

export default App;