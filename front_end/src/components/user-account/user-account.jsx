import React from "react";
import "./style.scss";

export const UserAccount = ({ details }) => {
  return (
    <div className="account-box">
      <h>เงินในบัญชีของฉัน</h>
      <div className="account-img">
        <img src={details.image} />
      </div>
      <div className="account-detail">
        Account : {details.profileName}
        <br />
        เงินในบัญชี : {details.money} - บิด
        <br />
        ใช้เงินไปแล้ว : {details.moneyUse} - บิด
        <br />
        ได้รับเงินแล้ว : {details.moneyGain} - บิด
        <br />
      </div>
    </div>
  );
};
