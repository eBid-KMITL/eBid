import React from "react"
import topup from "../../assets/topup.png";
import { Link } from "react-router-dom";

export const Topup = () => {
  return (
    <div className="topup-main">
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
    </div>
  )
}