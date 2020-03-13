import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../../components";
import firebase from "firebase"

export const Welcome = ({history}) => {

  function onLogout() {
    firebase.auth().signOut()
    history.replace('/')
  }

  return (
    <div className="welcome-main">
      <div className="head-text">
        ยินดีต้อนรับ {firebase.auth().currentUser.displayName}
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