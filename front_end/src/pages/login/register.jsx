import React from "react";
import logoID from "../../assets/eID.png";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="login-page">
      <div className="base-container">
        <div className="header">
          <div className="image">
            <img src={logoID} alt="eID" />
          </div>
          <div align="right">
            <h1>สมัครสมาชิก</h1>
          </div>
        </div>
        <div className="content">
          <div className="form-container">
            <form action="">
              <div className="form-group">
                <label htmlFor="username">ชื่อผู้ใช้</label>
                <input
                  type="text"
                  name="Username"
                  placeholder="กรอกชื่อผู้ใช้"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">อีเมล</label>
                <input
                  type="email"
                  name="Email"
                  placeholder="กรอกอีเมล"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  type="password"
                  name="Password"
                  placeholder="กรอกรหัสผ่าน"
                  required
                  minLength="8"
                />
              </div>
              <div className="extra">
                <p>
                  <input type="checkbox" required />
                  ฉันยอมรับ <Link to="#">ข้อตกลงและเงื่อนไข</Link>
                </p>
              </div>
              <div className="button-wrapper">
                <Link to="/login">
                  <button type="button" className="btn_s">
                    <u>ลงชื่อเข้าใช้</u>
                  </button>
                </Link>
                <button type="submit" className="btn">
                  สมัครสมาชิก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
