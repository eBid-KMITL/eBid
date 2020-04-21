import React from "react";
import "./style.scss";
import moneyPicture from "../../assets/money.png";
import { useLocation } from "react-router-dom";
import firebase from "firebase"

const details = 
  {
    money: "9,999,999,999,999,999,999,999",
    moneyUse: "1,000,0000,000,000,000,000",
    moneyGain: "1,000,0000,000,000,000,000,000",
    image: moneyPicture
  }

export const UserAccount = () => {
  const location = useLocation();
  var formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  function onLogout() {
    firebase.auth().signOut();
    window.location.reload(false);
  }

  return (
    <div className="account-box">
      <h>เงินในบัญชีของฉัน</h>
      <div className="account-img">
        <img src={details.image} alt="account-pic"/>
      </div>
      <div className="account-detail">
        Account : {firebase.auth().currentUser.displayName}
        <br />
        เงินในบัญชี : {details.money} - บิด
        <br />
        ใช้เงินไปแล้ว : {details.moneyUse} - บิด
        <br />
        ได้รับเงินแล้ว : {details.moneyGain} - บิด
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
