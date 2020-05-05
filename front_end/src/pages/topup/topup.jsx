import React from "react";
import topup from "../../assets/topup.png";
import { Helmet } from "react-helmet";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

export const Topup = () => {
  const history = useHistory();
  // const id = firebase.auth().currentUser.uid
  const id = 'VbcxIsGXNveiOjuaHuSDJ650dnI2'
  let getCode = ''
  let coin = 0
  let balance = 0
  function getCoin(e) {
    e.preventDefault();
    getCode = document.getElementById("code").value
    if (getCode === "123456") {
      coin = 100
    }
    else if (getCode === "123456789"){
      coin = 1000
    }
    firebase.firestore().collection('user').doc(id).update({
      balance : balance + coin
    }).then(()=>{
      console.log("succes")
    }).catch(err =>{
      console.log(err)
    })
  }


  return (
    <>
      {firebase.auth().currentUser ? (<div className="topup-main">
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
                <p style={{ margin: 0 }}>1 บาท มีค่าเท่ากับ 1 eCoin</p>
              </div>
              <div className="button-wrapper">
                <button type="submit" className="btn">
                  ยืนยัน
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