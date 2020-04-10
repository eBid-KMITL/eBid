import React from "react";
import psswPicture from "../../assets/password.png";

export const UserPassword = () => {
  return (
    <div className="password-box">
      <h>ตั้งค่ารหัสผ่าน</h>
      <div className="password-img">
        <img src={psswPicture} />
      </div>
      <div className="password-detail">
        <div className="form-group">
          รหัสผ่านเก่า
          <input
            type="password"
            name="oldPassword"
            placeholder="กรอกรหัสผ่านเก่า"
            required
            minLength="8"
          />
        </div>
        <div className="form-group">
          รหัสผ่านใหม่
          <input
            type="password"
            name="newPassword"
            placeholder="กรอกรหัสผ่านใหม่"
            required
            minLength="8"
          />
        </div>
        <div className="form-group">
          ยืนยันรหัสผ่านใหม่
          <input
            type="password"
            name="submPassword"
            placeholder="ยืนยันรหัสผ่านใหม่"
            required
            minLength="8"
          />
        </div>
        <div className="button">
          <button type="submit" className="btn">
            เปลี่ยนรหัสผ่าน
          </button>
        </div>
      </div>
    </div>
  );
};
