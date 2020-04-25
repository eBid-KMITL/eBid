import React from "react";
import addrPicture from "../../assets/address.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import firebase from "firebase"

const details = {
  name: "นายภูวดล   ลิ่มวณิชสินธุ์",
  phone: "0878941296",
  otherAddress: "บ้าน admin_alps 42/2 หมู่ 2",
  subDistrict: "บางเป้า",
  district: "กันตัง",
  province: "ตรัง",
  postalCode: "92110",
  image: addrPicture,
};

export const UserAddress = () => {
  const [state, setState] = useState(0);
  const location = useLocation();
  var formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  function onLogout() {
    firebase.auth().signOut();
    window.location.reload(false);
  }

  return (
    <div className="address-box">
      <h>ที่อยู่ของฉัน</h>
      <div className="address-img">
        <img src={details.image} alt="address-pic" />
      </div>
      {(() => {
        switch (state) {
          case 0:
            return (
              <div className="address-detail">
                <nobr><b>ชื่อผู้รับ : </b>{details.name}</nobr>
                <br />
                <nobr><b>เบอร์โทรศัพท์ : </b>{details.phone}</nobr>
                <br />
                <nobr><b>ที่อยู่ : </b>{details.otherAddress}</nobr>
                <br />
                <nobr><b>ตำบล/แขวง : </b>{details.subDistrict} <b>อำเภอ/เขต : </b>{details.district}</nobr>
                <br />
                <nobr><b>จังหวัด : </b>{details.province}</nobr>
                <br />
                <nobr><b>รหัสไปรษณีย์ : </b>{details.postalCode}</nobr>
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
                แก้ไขข้อมูล
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
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
};