import React, { useState } from "react";
import Moment from 'react-moment';
import 'moment/locale/th';
import logo from "../../assets/eBid.png";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaCoins } from "react-icons/fa";
import firebase from "firebase";

export const NavBar = ({ userInfo }) => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [Users, setUser] = useState("")
  const [coin,setCoin] = useState("")
  let users = []
  let userName = ''
  let eCoin = ''
  firebase.firestore().collection('user').onSnapshot(snapshot=>{
    console.log('snap')
    users = []
    snapshot.forEach(doc=>{
      const data = doc.data()
      data.uid=doc.id
      users.push(data)
      if (firebase.auth().currentUser && data.uid === firebase.auth().currentUser.uid){
        userName = data.displayName
        eCoin = data.balance
        setUserName()
      }
    })
    // setUsers()
    // setUser(users)
  })
  firebase.firestore().collection('Product').onSnapshot(snapshot => {
    console.log('snap of Product')
  })
  function setUserName(){
    setName(userName)
    setCoin(eCoin)
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      
    }
  });
  var formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  function onLogout() {
    firebase.auth().signOut();
    window.location.replace("/");
  }
  const search = useQuery().get("search");

  return (
    <>
      {
        location.pathname !== '/login'
        && location.pathname !== '/register'
        && location.pathname !== '/forgot'
        &&
        <div className="nav-bar" >
          <div className="nav-header">
            <Moment interval={1000} format={'[วันที่] D MMMM YYYY [เวลา] HH:mm:ss [น.]'} />
            <span className="nav-menu">
              {firebase.auth().currentUser ? (
                <div>
                  <Link to="/addproduct">ลงประมูลสินค้า</Link>
                  <Link to="/profile?m=4">การประมูลของฉัน</Link>
                  <Link to="/topup">เติมเงิน</Link>
                  <Link to="#" onClick={onLogout} >ออกจากระบบ</Link>
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
                <img src={logo} title="หน้าหลัก" alt="eBid Logo" />
              </Link>
            </div>
            <div className="form-group">
              <form action="/result">
                <div className="search-box">
                  <input type="search" name="search" id="search-input" placeholder="ค้นหา" defaultValue={search ? search : ""} />
                  <button type="submit" className="search-btn" title="ค้นหา"><i className="material-icons">search</i></button>
                </div>
              </form>
            </div>
            <div className="nav-btn">
              {firebase.auth().currentUser ? (
                <div className="user-status">
                  <FaUserCircle /> <Link to="/profile" title="ไปที่หน้าโปรไฟล์">{name}</Link><br />
                  <p title={coin + " eCoin"} style={{ margin: 0, cursor: "default" }}><FaCoins /> {coin} eCoins</p>
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