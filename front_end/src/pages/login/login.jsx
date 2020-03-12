import React from "react";
import logoID from "../../assets/eID.png";
import { Link } from "react-router-dom";


export const Login = () => {
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
                <label htmlFor="username">ชื่อผู้ใช้</label>
                <input type="text" name="Username" placeholder="กรอกชื่อผู้ใช้" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input type="password" name="Password" placeholder="กรอกรหัสผ่าน" required minLength="8" />
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
                <button type="submit" className="btn">
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