import React, { useState, useEffect } from "react";
import psswPicture from "../../assets/password.png";
import firebase from "firebase"
import { FaExclamationCircle } from "react-icons/fa";
import { Ellipsis } from 'react-spinners-css';

export const UserPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  function onForgot(e) {
    const a = document.getElementById("email").value
    e.preventDefault();
    setLoading(true);
    console.log(a + " " + firebase.auth().currentUser.email)
    if (firebase.auth().currentUser.email === a) {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        setSent(true);
        setLoading(false);
      }).catch(err => {
        setError(true);
        setLoading(false);
      })
    }
    else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="password-box">
      <h>ตั้งค่ารหัสผ่าน</h>
      <div className="password-img">
        <img src={psswPicture} alt="password-pic" />
      </div>
      <div className="password-detail">
        <p>หากคุณต้องการเปลี่ยนรหัสผ่านโปรดกรอกอีเมลผู้ใช้ของคุณเพื่อรีเซ็ตรหัสทางอีเมล</p>
        {sent ? (
          <p id="sent-forgot"><FaExclamationCircle /> &nbsp;ส่งเรียบร้อยแล้ว โปรดตรวจสอบอีเมลของท่าน</p>
        ) : error ? (
          <p id="input-error"><FaExclamationCircle /> &nbsp;อีเมลไม่ถูกต้อง โปรดใส่อีเมลผู้ใช้ของคุณ</p>
        ) : (
              null
            )
        }
        <form onSubmit={e => { onForgot(e, e.target.value) }}>
          <div className="form-group">
            อีเมล
          <input
              type="email"
              id="email"
              placeholder="กรอกอีเมล"
              required
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="button">
            <button type="submit" className="btn" disabled={loading || sent}>
              {sent ? ("ส่งแล้ว") : (loading ? <Ellipsis color="white" size={40} /> : "รีเซ็ตรหัสผ่าน")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
