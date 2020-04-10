import React, { useState } from "react";
import logoID from "../../assets/eID.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import firebase from "firebase"

export const Forgot = () => {

  const [email, setEmail] = useState('')

  function onForgot() {
    firebase.auth().sendPasswordResetEmail(email).then(() =>{
      alert('Send it')
    }).catch(err =>{
      alert(err)
    })
  }




  return (
    <div className="login-page">
      <Helmet><title>Forgot | eBid</title></Helmet>
      <div className="base-container">
        <div className="header">
          <Link to="/">
            ﹤ กลับหน้าหลัก
          </Link>
          <div className="image">
            <img src={logoID} alt="eID" />
          </div>
          <h1>ลืมรหัสใช่ไหม?</h1>
        </div>
        <div className="content">
          <div className="form-container">
            <form action="">
              <div className="form-group">
                <label htmlFor="email">อีเมล</label>
                <input type="email" name="Email" placeholder="กรอกอีเมล" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="button-wrapper">
                <Link to="/login">
                  <button type="button" className="btn_s">
                    <u>ย้อนกลับ</u>
                  </button>
                </Link>
                <button type="submit" className="btn"
                  onClick={onForgot}>
                  ส่งรหัสยืนยัน
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}