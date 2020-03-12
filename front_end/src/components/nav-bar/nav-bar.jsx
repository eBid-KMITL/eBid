import React from "react";
import Clock from 'react-live-clock';
import logo from "../../assets/eBid.png";
import { Link } from "react-router-dom";
import { FaUserCircle, FaCoins } from "react-icons/fa"

export const NavBar = ({ status, userInfo }) => {
  return (
    <div className="nav-bar">
      <div className="nav-header">
        <Clock format={'วันที่ DD/MM/YYYY เวลา HH:mm:ss น.'} ticking={true} timezone={'Asia/Bangkok'} />
        <span className="nav-menu">
          <Link to="/register">สมัครสมาชิก</Link><a href="#">ติดต่อเรา</a>
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
            <Link to="/#">
              <button type="submit" className="search-btn"><i className="material-icons">search</i></button>
            </Link>
          </div>
        </div>
        <div className="nav-btn">
          {!status ? (
            <Link to="/login">
              <button type="button" className="login-btn">ลงชื่อเข้าใช้</button>
            </Link>
          ) : (
              <div className="user-status">
                <FaUserCircle /> {userInfo.username}<br />
                <FaCoins /> {userInfo.amount}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}