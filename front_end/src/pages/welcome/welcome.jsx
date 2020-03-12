import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../../components";

export const Welcome = () => {
  return (
    <div className="welcome-main">
      <div className="head-text">
        ยินดีต้อนรับ
      </div>
      <div className="button-wrapper">
        <Link to="/">
          <button type="button" className="btn_s">
            <u>กลับหน้าหลัก</u>
          </button>
        </Link>
        <button type="submit" className="btn">
          ออกจากระบบ
              </button>
      </div>
    </div>
  )
}