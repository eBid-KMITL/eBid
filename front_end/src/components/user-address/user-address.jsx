import React, { useState, useEffect } from "react";
import addrPicture from "../../assets/address.png";
import userinfo from "../../db/userinfo.json";

// const details = {
//   name: "นายภูวดล   ลิ่มวณิชสินธุ์",
//   phone: "0878941296",
//   otherAddress: "บ้าน admin_alps 42/2 หมู่ 2",
//   subDistrict: "บางเป้า",
//   district: "กันตัง",
//   province: "ตรัง",
//   postalCode: "92110",
//   image: addrPicture,
// };

export const UserAddress = () => {
  const [state, setState] = useState(0);
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="address-box">
      <h>ที่อยู่ของฉัน</h>
      <div className="address-img">
        <img src={addrPicture} alt="address-pic" />
      </div>
      {(() => {
        switch (state) {
          default:
            return (
              <div className="address-detail">
                <nobr><b>ชื่อผู้รับ : </b>{userinfo.recipient}</nobr>
                <br />
                <nobr><b>เบอร์โทรศัพท์ : </b>{userinfo.tell}</nobr>
                <br />
                <nobr><b>ที่อยู่ : </b>{userinfo.address}</nobr>
                <br />
                <nobr><b>ตำบล/แขวง : </b>{userinfo.subDistrict} <b>อำเภอ/เขต : </b>{userinfo.district}</nobr>
                <br />
                <nobr><b>จังหวัด : </b>{userinfo.province}</nobr>
                <br />
                <nobr><b>รหัสไปรษณีย์ : </b>{userinfo.postalCode}</nobr>
                <div className="button">
                  <button
                    type="submit"
                    className="btn"
                    onClick={() => setState(1)}
                  >
                    แก้ไขข้อมูล
                  </button>
                </div>
              </div>
            );
          case 1:
            return (
              <div className="address-detail">
                <br />
                <label>
                  <b>ชื่อผู้รับ</b>
                  <input
                    type="text"
                    placeholder="กรอกชื่อ-สกุล"
                    className="inpName"
                    name="Name"
                    required
                    minLength="20"
                    defaultValue={userinfo.recipient}
                  />
                </label>
                <br />
                <label>
                  <b>ที่อยู่</b>
                  <input
                    type="text"
                    className="inpAddressOther"
                    placeholder="กรอกที่อยู่"
                    name="OtherAddress"
                    required
                    minLength="5"
                    defaultValue={userinfo.address}
                  />
                </label>
                <br />
                <label>
                  <b>ตำบล/แขวง</b>
                  <input
                    type="text"
                    className="inpAddressSubDis"
                    placeholder="กรอกตำบล/แขวง"
                    name="Subdistrict"
                    required
                    minLength="5"
                    defaultValue={userinfo.subDistrict}
                  />
                </label>
                <br />
                <label>
                  <b>อำเภอ/เขต</b>
                  <input
                    type="text"
                    className="inpAddressDis"
                    placeholder="กรอกอำเภอ/เขต"
                    name="District"
                    required
                    minLength="5"
                    defaultValue={userinfo.district}
                  />
                </label>
                <br />
                <label>
                  <b>จังหวัด</b>
                  <input
                    type="text"
                    className="inpAddressProv"
                    placeholder="กรอกจังหวัด"
                    name="Province"
                    required
                    minLength="5"
                    defaultValue={userinfo.province}
                  />
                </label>
                <br />
                <label>
                  <b>รหัสไปรษณีย์</b>
                  <input
                    type="number"
                    className="inpPostalCode"
                    placeholder="กรอกรหัสไปรษณีย์"
                    name="PostalCode"
                    required
                    minLength="5"
                    defaultValue={userinfo.postalCode}
                  />
                </label>
                <br />
                <label>
                  <b>เบอร์โทร</b>
                  <input
                    type="tel"
                    className="inpPhone"
                    placeholder="กรอกเบอร์โทร"
                    name="Phone"
                    required
                    minLength="9"
                    defaultValue={userinfo.tell}
                  />
                </label>
                <br />
                <div className="button">
                  <button
                    type="submit"
                    className="btn"
                    onClick={() => setState(0)}
                  >
                    ยืนยันข้อมูล
                  </button>
                  <button
                    type="button"
                    className="btn_s"
                    onClick={() => setState(0)}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
};