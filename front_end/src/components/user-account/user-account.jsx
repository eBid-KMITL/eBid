import React, { useEffect, useState } from "react";
import "./style.scss";
import moneyPicture from "../../assets/eGold.png";
import firebase from "firebase";
import userinfo from "../../db/userinfo.json";
import Modal from 'react-responsive-modal';

export const UserAccount = ({ userData }) => {
  useEffect(() => {
    window.scrollTo(0, 0)

  }, [])
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  const [withdraw, setWithdraw] = useState(false);
  const [money, setMoney] = useState(0)
  function onOpenWithdraw() {
    setWithdraw(true);
  }
  function onCloseWithdraw() {
    setWithdraw(false);
  }

  function getMoney(e) {
    e.preventDefault();
    let withdrawMoney = parseInt(document.getElementById("bid-price").value)
    let newBalance = userData.balance - withdrawMoney
    firebase.firestore().collection('user').doc(userData.uid).update({
      balance: newBalance
    }).then(() => {
      onCloseWithdraw()
    })
  }


  return (
    <div className="account-box">
      <h>เงินในบัญชีของฉัน</h>
      <div className="account-img">
        <img src={moneyPicture} alt="account-pic" />
      </div>
      <div className="account-detail">
        <nobr><b>ชื่อผู้ใช้ : </b>{userData.displayName}</nobr>
        <br />
        <nobr><b>เงินในบัญชี : </b>{formatter.format(userData.balance)} eCoin</nobr>
        <br />
        <nobr><b>ใช้เงินไปแล้ว : </b>{formatter.format(userData.used)} eCoin</nobr>
        <br />
        <nobr><b>ได้รับเงินแล้ว : </b>{formatter.format(userData.recieve)} eCoin</nobr>
        <br />
        <div className="button">
          <button type="button" className="btn" onClick={() => onOpenWithdraw()}>
            ขอถอนเงิน
          </button>
        </div>
      </div>
      <Modal open={withdraw} center={true} onClose={() => onCloseWithdraw()} little>
        <h1>ถอนเงินจากบัญชี</h1>
        <form name="bid-price" onSubmit={e => getMoney(e)}>
          <input name="withdraw-input" id="withdraw" type="number" title="ใส่จำนวนเงินไม่เกินจำนวนเงินที่ถอนได้" placeholder="กรอกจำนวนเงินที่ต้องการถอน" min={1} max={userData.balance - userData.used} required />
          <p id="ecoin-alert">ใส่จำนวนเงินไม่เกินจำนวนเงินที่ถอนได้</p>
          <div className="form-foot">
            <div className="price-container">
              <p id="price-tag">เงินคงเหลือที่ถอนได้</p>
              <h3 id="curPrice">
                {formatter.format(userData.balance - userData.used)} eCoin</h3>
              <button className="btn_c" id="close-withdraw" type="submit" >ถอนเงิน</button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
