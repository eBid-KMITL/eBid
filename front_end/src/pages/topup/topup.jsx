import React from "react"
import topup from "../../assets/topup.png";
import { Helmet } from "react-helmet";
import firebase from "firebase"

export const Topup = () => {
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
            <form>
              <div className="form-group">
                <input type="text" name="Code" placeholder="กรอกรหัสเติมเงิน" required />
              </div>
              <div className="button-wrapper">
                <button type="submit" className="btn">
                  ยืนยัน
          </button>
              </div>
            </form>
          </div>
        </div>
      </div>) : (window.location = "/")
      }
    </>
  )
}