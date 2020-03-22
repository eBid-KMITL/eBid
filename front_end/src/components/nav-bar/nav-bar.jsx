import React from "react";
import Clock from 'react-live-clock';
import logo from "../../assets/eBid.png";
import { Link, useLocation, Router } from "react-router-dom";
import { FaUserCircle, FaCoins } from "react-icons/fa"
import firebase from "firebase"

export const NavBar = ({ userInfo }) => {
  const location = useLocation();
  function onLogout() {
    firebase.auth().signOut()
  }

  return (
    <>
        {
          location.pathname !== '/login'
          && location.pathname !== '/register'
          && location.pathname !== '/forgot'
          &&
          <div className="nav-bar" >
            <div className="nav-header">
              <Clock format={'วันที่ DD/MM/YYYY เวลา HH:mm:ss น.'} ticking={true} timezone={'Asia/Bangkok'} />
              <span className="nav-menu">
                {firebase.auth().currentUser ? (
                  <div>
                    <Link to="#">การประมูลของฉัน</Link>
                    <Link to="/topup">เติมเงิน</Link>
                    <Link to="/" onClick={onLogout} >ออกจากระบบ</Link>
                    <Link to="/contact">ติดต่อเรา</Link>
                  </div>
                ) : (
                    <div>
                      <Link to="/register">สมัครสมาชิก</Link>
                      <Link to="/contact">ติดต่อเรา</Link>
                    </div>
                  )}
              </span>
            </div>
            <div className="nav-search-line">
              <div className="nav-logo">
                <Link to="/">
                  <img src={logo} alt="eBid Logo" />
                </Link>
              </div>
              <div className="form-group">
                <div className="search-box">
                  <input type="text" name="Search" placeholder="ค้นหา" />
                  <Link to="/result">
                    <button type="submit" className="search-btn"><i className="material-icons">search</i></button>
                  </Link>
                </div>
              </div>
              <div className="nav-btn">
                {firebase.auth().currentUser ? (
                  <div className="user-status">
                    <FaUserCircle /> <Link to="/profile">{firebase.auth().currentUser.displayName}</Link><br />
                    <FaCoins /> {userInfo.amount} eCoins
                  </div>
                ) : (
                    <Link to="/login">
                      <button type="button" className="login-btn">ลงชื่อเข้าใช้</button>
                    </Link>
                  )}
              </div>
            </div>
          </div >
        }
    </>
  )
}