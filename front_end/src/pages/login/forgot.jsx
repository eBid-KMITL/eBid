import React, { useState } from "react";
import logoID from "../../assets/eID.png";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import firebase from "firebase"
import { FaExclamationCircle } from "react-icons/fa";

export const Forgot = () => {
  const history = useHistory();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  function onForgot(e) {
    e.preventDefault();
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      setSent(true);
    }).catch(err => {
      setError(true);
    })
  }

  return (
    <div className="login-page">
      <Helmet><title>Forgot | eBid</title></Helmet>
      <div className="base-container">
        <div className="header">
          <Link to="#" onClick={() => history.goBack()}>
            ﹤ ย้อนกลับ
          </Link>
          <div className="image">
            <img src={logoID} alt="eID" />
          </div>
          <h1>ลืมรหัสใช่ไหม?</h1>
          {sent ? (
            <p id="sent-forgot"><FaExclamationCircle /> &nbsp;ส่งอีเมลเรียบร้อยแล้ว</p>
          ) : error ? (
            <p id="input-error"><FaExclamationCircle /> &nbsp;อีเมลไม่ถูกต้องหรือไม่พบผู้ใช้</p>
          ) : (
                null
              )
          }
        </div>
        <div className="content">
          <div className="form-container">
            <form onSubmit={e => { onForgot(e) }}>
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
                <button type="submit" className="btn" formTarget="hiddenFrame"
                  onClick={onForgot}>
                  รีเซ็ตรหัสผ่าน
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <iframe title="hiddenFrame" name="hiddenFrame" width="0" height="0" border="0" style={{ display: "none" }}></iframe>
    </div>
  )
}