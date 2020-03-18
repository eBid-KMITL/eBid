import React, { useState } from "react";
import logoID from "../../assets/eID.png";
import { Link } from "react-router-dom";
import firebase from "firebase"

export const Login = ({history}) => {
  
  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  function onLogin() {
      firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
        alert('Authentication Completed');
        history.replace('/profile')
      })
      .catch(err => { 
        alert(err);
      });
    }
  return (
    <div className="login-page">
      <div className="base-container">
        <div className="header">
          <Link to="/">
            <a>&lt; กลับหน้าหลัก</a>
          </Link>
          <div className="image">
            <img src={logoID} alt="eID" />
          </div>
          <h1>ลงชื่อเข้าใช้</h1>
        </div>
        <div className="content">
          <div className="form-container">
            <form>
              <div className="form-group">
                <label htmlFor="email">อีเมล</label>
                <input type="text" name="Email" placeholder="กรอกอีเมล" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input type="password" name="Password" placeholder="กรอกรหัสผ่าน" required minLength="8" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="extra">
                <p>ยังไม่ได้เป็นสมาชิก? <Link to="/register">สมัครสมาชิก</Link></p>
              </div>
              <div className="button-wrapper">
                <Link to="/forgot">
                  <button type="button" className="btn_s">
                    <u>ลืมรหัสผ่าน</u>
                  </button>
                </Link>
                <button type="button" className="btn"
                  onClick={onLogin}
                >
                  ลงชื่อเข้าใช้
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}
