import React, { useState } from "react";
import logoID from "../../assets/eID.png";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import firebase from "firebase";
import { FaExclamationCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Ellipsis } from 'react-spinners-css';

export const Forgot = () => {
  const history = useHistory();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  function onForgot(e) {
    e.preventDefault();
    setLoading(true);
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      setSent(true);
      setLoading(false);
    }).catch(err => {
      setError(true);
      setLoading(false);
    })
  }

  return (
    <div className="login-page">
      <Helmet><title>Forgot | eBid</title></Helmet>
      <div className="base-container">
        <div className="header">
          <Link to="#" onClick={() => history.push("/")} style={{ display: "flex", alignItems: "center" }} >
            <IoIosArrowBack /> กลับหน้าหลัก
          </Link>
          <div className="image">
            <img src={logoID} alt="eID" />
          </div>
          <h1>ลืมรหัสใช่ไหม?</h1>
          {sent ? (
            <p id="sent-forgot"><FaExclamationCircle /> &nbsp;ส่งเรียบร้อยแล้ว โปรดตรวจสอบอีเมล</p>
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
                <button type="submit" className="btn" disabled={loading||sent}>
                  {sent ? ("ส่งแล้ว") : (loading ? <Ellipsis color="white" size={40} /> : "รีเซ็ตรหัสผ่าน")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}