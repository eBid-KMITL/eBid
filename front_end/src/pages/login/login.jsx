import React, { useState } from "react";
import logoID from "../../assets/eID.png";
import { Link, useLocation } from "react-router-dom";
import firebase from "firebase";
import { FaExclamationCircle } from "react-icons/fa";
import { Helmet } from "react-helmet";

export const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFail, setFail] = useState(false)
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const to = useQuery().get("from")
  function onLogin() {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      if (to) {
        history.replace('/' + to);
      }
      else {
        history.replace('/');
      }
    })
      .catch(err => {
        setFail(true)
      });
  }

  return (
    <div className="login-page">
      <Helmet><title>Login | eBid</title></Helmet>
      <div className="base-container">
        <div className="header">
          <Link to={(to) ? ("/"+to) : ("/")}>
            ﹤ ย้อนกลับ
          </Link>
          <div className="image">
            <img src={logoID} alt="eID" />
          </div>
          <h1>ลงชื่อเข้าใช้</h1>
          {loginFail ? (
            <p id="login-error"><FaExclamationCircle /> &nbsp;อีเมลหรือรหัสผ่านไม่ถูกต้อง</p>
          ) : (
              null
            )
          }
        </div>
        <div className="content">
          <div className="form-container">
            <form>
              <div className="form-group">
                <label htmlFor="email">อีเมล</label>
                <input type="email" name="Email" placeholder="กรอกอีเมล" required value={email} onChange={e => setEmail(e.target.value)} />
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
                <button type="submit" className="btn" formTarget="hiddenFrame"
                  onClick={onLogin}
                >
                  ลงชื่อเข้าใช้
              </button>
              </div>
            </form>
            <iframe title="hiddenFrame" name="hiddenFrame" width="0" height="0" border="0" style={{display: "none"}}></iframe>
          </div>
        </div>
      </div>
    </div>
  )

}
