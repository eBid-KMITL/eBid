import React from "react";
import addrPicture from "../../assets/address.png";
import { useState } from "react";

const details = {
  profileName: "admin_alps",
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

  return (
    <div className="address-box">
      <h>ที่อยู่ของฉัน</h>
      <div className="address-img">
        <img src={details.image} />
      </div>
      {(() => {
        switch (state) {
          case 0:
            return (
              <div className="address-detail">
                Account : {details.profileName}
                <br />
                ชื่อ-นามสกุล : {details.name}
                <br />
                เบอร์โทรศัพท์ : {details.phone}
                <br />
                ที่อยู่ :
                <br />
                {details.otherAddress}
                <br />
                ตำบล/แขวง {details.subDistrict} อำเภอ/เขต {details.district}
                <br />
                จังหวัด {details.province}
                <br />
                {details.postalCode}
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
                  ชื่อ-สกุล
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
                  ที่อยู่
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
                  แขวง
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
                  เขต
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
                  จังหวัด
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
                  รหัสไปรษณีย์
                  <input
                    type="text"
                    className="inpPostalCode"
                    placeholder="กรอกรหัสไปรษณีย์"
                    name="PostalCode"
                    required
                    minLength="5"
                  />
                </label>
                <br />
                <label>
                  เบอร์โทร
                  <input
                    type="text"
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