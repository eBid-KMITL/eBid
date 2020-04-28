import React from "react";
import "./style.scss";
import moneyPicture from "../../assets/eGold.png";
import firebase from "firebase";
import userinfo from "../../db/userinfo.json";

// const details = 
//   {
//     money: "9,999,999,999,999,999,999,999",
//     moneyUse: "1,000,0000,000,000,000,000",
//     moneyGain: "1,000,0000,000,000,000,000,000",
//     image: moneyPicture
//   }

export const UserAccount = () => {
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });

  return (
    <div className="account-box">
      <h>เงินในบัญชีของฉัน</h>
      <div className="account-img">
        <img src={moneyPicture} alt="account-pic"/>
      </div>
      <div className="account-detail">
        <nobr><b>ชื่อผู้ใช้ : </b>{firebase.auth().currentUser.displayName}</nobr>
        <br />
        <nobr><b>เงินในบัญชี : </b>{formatter.format(userinfo.balance)} eCoin</nobr>
        <br />
        <nobr><b>ใช้เงินไปแล้ว : </b>{formatter.format(userinfo.used)} eCoin</nobr>
        <br />
        <nobr><b>ได้รับเงินแล้ว : </b>{formatter.format(userinfo.recieve)} eCoin</nobr>
        <br />
        <div className="button">
          <button type="button" className="btn">
            ถอนเงิน
          </button>
        </div>
      </div>
    </div>
  );
};
