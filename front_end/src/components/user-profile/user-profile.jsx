import React from "react";
import "./style.scss";

export const UserProfile = ({details }) => {
  return (
    <div className="profile-box">
      <h>ข้อมูลของฉัน</h>
      <div className="profile-img">
        <img src={details.image} />
      </div>
      <div className="profile-detail">
        Account : {details.profileName}
        <br />
        ชื่อ : {details.firstName} นามสกุล : {details.surName}
        <br />
        เพศ : {details.gender} วันเกิด : {details.birthDay}
        <br />
        เบอร์โทร : {details.phone}
        <br />
        e-mail : {details.email}
        <br />
      </div>
    </div>
  );
};
