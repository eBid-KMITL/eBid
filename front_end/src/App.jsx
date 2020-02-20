import React from 'react';
import './App.scss';
import { Login, Register, Forgot, Home, Error } from "./pages"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";




const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/" component={Error}/>
      </Switch>
    </Router>
  )
}

export default App;