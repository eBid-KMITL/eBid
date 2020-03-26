import React from "react";
import "./style.scss";

export const UserAddress = ({ details }) => {
  return (
    <div className="address-box">
      <h>ที่อยู่ของฉัน</h>
      <div className="address-img">
        <img src={details.image} />
      </div>
      <div className="address-detail">
        Account : {details.profileName}
        <br />
        ชื่อ-นามสกุล : {details.name}
        <br />
        เบอร์โทรศัพท์ : {details.phone}
        <br />
        ที่อยู่ :
        <br />
        {details.bldngName} เลขที่ {details.houseNo} หมู่บ้าน {details.village}{" "}
        หมู่ที่ {details.villageNo}
        <br />
        ตรอก/ซอย {details.alley} ถนน {details.street} ตำบล {details.subDistrict}{" "}
        อำเภอ {details.district}
        <br />
        จังหวัด {details.province}
        <br />
        {details.postalCode}
      </div>
    </div>
  );
};
