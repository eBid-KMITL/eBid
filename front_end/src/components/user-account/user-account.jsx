import React from "react";
import "./style.scss";
import moneyPicture from "../../assets/eGold.png";
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
        <nobr><b>ชื่อผู้ใช้ : </b>{firebase.auth().currentUser.displayName}</nobr>
        <br />
        <nobr><b>เงินในบัญชี : </b>{details.money} eCoin</nobr>
        <br />
        <nobr><b>ใช้เงินไปแล้ว : </b>{details.moneyUse} eCoin</nobr>
        <br />
        <nobr><b>ได้รับเงินแล้ว : </b>{details.moneyGain} eCoin</nobr>
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
