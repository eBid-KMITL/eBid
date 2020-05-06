import React, { useState } from "react";
import topup from "../../assets/topup.png";
import { Helmet } from "react-helmet";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import { Ellipsis } from 'react-spinners-css';

export const Topup = ({ userData }) => {
  const history = useHistory();
  const [success, setSuccess] = useState(0);
  const [loading, setLoading] = useState(false);
  const id = userData.uid
  let getCode = ''
  let coin = 0
  let balance = userData.balance
  function getCoin(e) {
    e.preventDefault();
    setLoading(true);
    getCode = document.getElementById("code").value
    if (getCode === "123456") {
      coin = 100
      setSuccess(1)
    }
    else if (getCode === "123456789") {
      coin = 1000
      setSuccess(1)
    }
    else if(getCode === "ebidmillion"){
      coin = 1000000
      setSuccess(1)
    }
    else {
      setSuccess(2)
    }
    firebase.firestore().collection('user').doc(id).update({
      balance: balance + coin
    }).then(() => {
      setLoading(false);
      // console.log("succes")
    }).catch(err => {
      setLoading(false);
      console.log(err)
    })
  }


  return (
    <>
      {userData ? (<div className="topup-main">
        <Helmet><title>Topup | eBid</title></Helmet>

        <div className="topup-wrap">
          <div className="topup-banner">
            <img src={topup} alt="eBid Logo" />
          </div>
          <div className="topup-container">
            <h1>เติมเงิน</h1>
            <form onSubmit={e => { getCoin(e) }}>
              <div className="form-group">
                <input type="text" id="code" name="Code" placeholder="กรอกรหัสเติมเงิน" required />
                {success === 1 ? (
                  <p id="sent-code"><FaExclamationCircle />&nbsp;เติมเงินเรียบร้อย</p>
                ) : success === 2 ? (
                  <p id="input-error"><FaExclamationCircle />&nbsp;รหัสเติมเงินไม่ถูกต้องโปรดตรวจสอบ</p>
                ) : (
                      <p id="info"><FaExclamationCircle />&nbsp;1 บาท มีค่าเท่ากับ 1 eCoin</p>
                    )
                }
              </div>
              <div className="button-wrapper">
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? <Ellipsis color="white" size={40} /> : "เติมเงิน"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>) : history.push("/login")
      }
    </>
  )
}