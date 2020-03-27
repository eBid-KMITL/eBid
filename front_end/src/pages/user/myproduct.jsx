import React from "react";
import "./user.scss";
import { NavBar, UserMyProduct } from "../../components";
import profilePicture from "../../assets/cart.png";
import { Link } from "react-router-dom";

export const MyProduct = () => {

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
              <Link to="/user/profile">บัญชีของฉัน</Link>
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
              <Link to="/user/myproduct" className="selected">
                สินค้าของฉัน
              </Link>
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
            <UserMyProduct  />
        </div>
      </div>
      <div className="user-footer">
        <p>©2020 eBid</p>
      </div>
    </div>
  );
};
