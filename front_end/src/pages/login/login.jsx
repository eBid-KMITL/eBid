import React, { useState } from "react";
import logoID from "../../assets/eID.png";
import { Link } from "react-router-dom";
import firebase from "firebase"
import {firebaseConfig} from '../../firebase_config'
import { useHistory } from "react-router-dom";

export const Login = () => {
  
  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory()

  
  function onLogin() {
      firebase.auth().signInWithEmailAndPassword('zuzu.wc@gmail.com','12345678').then(() => {
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
                <input type="text" name="Email" placeholder="กรอกอีเมล" required   />
              </div>
              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input type="password" name="Password" placeholder="กรอกรหัสผ่าน" required minLength="8"  />
              </div>
              <div className="extra">
                <p>ยังไม่ได้เป็นสมาชิก? <Link to="/register">สมัครสมาชิก</Link></p>
                <p><Link to="/forgot" >ลืมรหัสผ่าน</Link></p>
              </div>
              <div className="button-wrapper">
                <Link to="/">
                  <button type="button" className="btn_s">
                    <u>กลับหน้าหลัก</u>
                  </button>
                </Link>
                <button type="button" className="btn"
                  onClick= {onLogin} 
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
