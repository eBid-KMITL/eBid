import React from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { Helmet } from "react-helmet";

export const Profile = ({ userData }) => {
  const history = useHistory();
  function onLogout() {
    firebase.auth().signOut();
    history.push('/');
    window.location.reload(false);
  }

  return (
    <>
      {userData ?
        (<div className="welcome-main">
          <Helmet><title>Profile | eBid</title></Helmet>
          <div className="head-text">
            ยินดีต้อนรับ {userData.displayName}
          </div>
          <div className="button-wrapper">
            <Link to="/">
              <button type="button" className="btn_s">
                <u>กลับหน้าหลัก</u>
              </button>
            </Link>
            <button type="button" className="btn"
              onClick={onLogout}
            >
              ออกจากระบบ</button>
          </div>
        </div>) : history.push("/login")
      }
    </>
  )

}