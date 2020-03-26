import React from "react";
import "./user.scss";
import { NavBar, UserAddress } from "../../components";
import addrPicture from "../../assets/address.png";
import { Link } from "react-router-dom";

export const Address = () => {
  const details = [
    {
      profileName: "admin_alps",
      name: "นายภูวดล   ลิ่มวณิชสินธุ์",
      phone: "(+66) 878941296",
      bldngName: "บ้าน admin_alps",
      houseNo: "42/2",
      village: "-",
      villageNo: "2",
      alley: "-",
      street: "-",
      subDistrict: "บางเป้า",
      district: "กันตัง",
      province: "ตรัง",
      postalCode: "92110",
      image: addrPicture
    }
  ];

  return (
    <div className="main">
      <NavBar />
      <div className="user-container">
        <div classsName="user-left-bar">
          <ul>
            <li>
              <img src={addrPicture} />
            </li>
            <li>
              <Link to="/user/profile">บัญชีของฉัน</Link>
            </li>
            <li>
              <Link to="/user/account">เงินในบัญชี</Link>
            </li>
            <li>
              <Link to="/user/address" className="selected">
                ที่อยู่
              </Link>
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
            <UserAddress details={detail} />
          ))}
        </div>
      </div>
      <div className="user-footer">
        <p>©2020 eBid</p>
      </div>
    </div>
  );
};
