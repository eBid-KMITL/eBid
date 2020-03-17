import React from "react";
import logoID from "../../assets/eID.png";
import { Link } from "react-router-dom";

export const Forgot = () => {
  return (
    <div className="login-page">
      <div className="base-container">
        <div className="header">
          <Link to="/">
            <a><u>&lt; กลับหน้าหลัก</u></a>
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
                <input type="email" name="Email" placeholder="กรอกอีเมล" required />
              </div>
              <div className="button-wrapper">
                <Link to="/login">
                  <button type="button" className="btn_s">
                    <u>ย้อนกลับ</u>
                  </button>
                </Link>
                <button type="submit" className="btn">
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