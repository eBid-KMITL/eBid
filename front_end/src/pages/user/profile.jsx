import React from "react";
import "./user.scss";
import { NavBar, UserProfile } from "../../components";
import profilePicture from "../../assets/Profile.png";
import { Link } from "react-router-dom";

export const Profile = () => {
  const details = [
    {
      firstName: "ภูวดล",
      surName: "ลิ่มวณิชสินธุ์",
      profileName: "admin_alps",
      gender: "ชาย",
      birthDay: "23/11/2542",
      email: "alpe_panda@hotmail.co.th",
      phone: "(+66) 878941296",
      image: profilePicture
    }
  ];

  return (
    <div className="main">
      <NavBar />
      <div className="user-container">
        <div classsName="user-left-bar">
          <ul>
            <li>
              <img src={profilePicture} />
            </li>
            <li>
              <Link to="/user/profile" className="selected">
                บัญชีของฉัน
              </Link>
            </li>
            <li>
              <Link to="/user/account">เงินในบัญชี</Link>
            </li>
            <li>
              <Link to="/user/address">ที่อยู่</Link>
            </li>
            <li>
              <Link to="/user/password">ตั้งค่ารหัสผ่าน</Link>
            </li>
            <li>
              <Link to="/user/mystatement">การซื้อของฉัน</Link>
            </li>
            <li>
              <Link to="/user/myproduct">สินค้าของฉัน</Link>
            </li>
            <li>
              <Link to="#">
                <button type="button" className="btn">
                  เติมเงิน
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {details.map(detail => (
            <UserProfile details={detail} />
          ))}
        </div>
      </div>
      <div className="user-footer">
        <p>©2020 eBid</p>
      </div>
    </div>
  );
};
