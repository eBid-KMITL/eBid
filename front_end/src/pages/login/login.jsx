import React, { useState } from "react";
import logoID from "../../assets/eID.png";
import { Link } from "react-router-dom";
import firebase from "firebase"

export const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFail, setFail] = useState(0)
  function onLogin() {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      // alert('Authentication Completed');
      history.replace('/profile')
    })
      .catch(err => {
        // alert(err);
        setFail(1)
      });
  }
  
  return (
    <div className="content-wrap" id="login">
      <div className="login-page">
        <div className="base-container">
          <div className="header">
            <Link id="btn_main" to="/">
              <a>﹤ กลับหน้าหลัก</a>
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
                  <input id="txt_email" type="text" name="Email" placeholder="กรอกอีเมล" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">รหัสผ่าน</label>
                  <input id="txt_password" type="password" name="Password" placeholder="กรอกรหัสผ่าน" required minLength="8" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="extra">
                  <p>ยังไม่ได้เป็นสมาชิก? <Link id="btn_register" to="/register">สมัครสมาชิก</Link></p>
                  { loginFail ? (
                    <p id="login-error">อีเมลหรือรหัสผ่านไม่มีอยู่ หรือไม่ถูกต้อง</p>
                  ) : (
                    null
                  )
                  }
                </div>
                <div className="button-wrapper">
                  <Link to="/forgot">
                    <button  id="btn_forgot" type="button" className="btn_s">
                      <u>ลืมรหัสผ่าน</u>
                    </button>
                  </Link>
                  <button id="btn_signin" type="button" className="btn"
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
    </div>
  )

}
