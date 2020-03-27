import React from "react";
import "./user.scss";
import { NavBar, UserAccount } from "../../components";
import moneyPicture from "../../assets/money.png";
import { Link } from "react-router-dom";

export const Account = () => {
  const details = [
    {
      profileName: "admin_alps",
      money: "9,999,999,999,999,999,999,999",
      moneyUse: "1,000,0000,000,000,000,000",
      moneyGain: "1,000,0000,000,000,000,000,000",
      image: moneyPicture
    }
  ];

  return (
    <div className="main">
      <NavBar />
      <div className="user-container">
        <div classsName="user-left-bar">
          <ul>
            <li>
              <img src={moneyPicture} />
            </li>
            <li>
              <Link to="/user/profile">บัญชีของฉัน</Link>
            </li>
            <li>
              <Link to="/user/account" className="selected">
                เงินในบัญชี
              </Link>
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
            <UserAccount details={detail} />
          ))}
        </div>
      </div>
      <div className="user-footer">
        <p>©2020 eBid</p>
      </div>
    </div>
  );
};