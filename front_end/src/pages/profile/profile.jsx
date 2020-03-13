import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../../components";
import firebase from "firebase"
import {firebaseConfig} from '../../firebase_config'
import { useHistory } from "react-router-dom";

export const Profile = () => {
  let history = useHistory()

  function onLogout() {
    firebase.auth().signOut()
    history.replace('/')
    // console.log('asdasdasd')
  }

  return (
    <div className="welcome-main">
      <div className="head-text">
        ยินดีต้อนรับ {firebase.auth().currentUser.email}
      </div>
      <div className="button-wrapper">
        <Link to="/">
          <button type="button" className="btn_s">
            <u>กลับหน้าหลัก</u>
          </button>
        </Link>
        <button type="submit" className="btn"
        onClick={onLogout}
        >
          ออกจากระบบ
          
              </button>
      </div>
    </div>
  )
  
}