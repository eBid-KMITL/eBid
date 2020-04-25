import React from "react";
import profilePicture from "../../assets/Profile.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import firebase from "firebase";
import moment from "moment";

const details = {
  firstName: "ภูวดล",
  surName: "ลิ่มวณิชสินธุ์",
  gender: "ชาย",
  birthDay: "23/11/2542",
  email: "alpe_panda@hotmail.co.th",
  phone: "0878941296",
  image: profilePicture,
};

export const UserProfile = () => {
  const now = moment().format("YYYY-MM-DD");
  const [state, setState] = useState(0);
  const location = useLocation();
  var formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  function onLogout() {
    firebase.auth().signOut();
    window.location.reload(false);
  }

  return (
    <div className="profile-box">
      <h>ข้อมูลของฉัน</h>
      <div className="profile-img">
        <img src={details.image} alt="profile-pic" />
      </div>
      {(() => {
        switch (state) {
          case 0:
            return (
              <div className="profile-detail">
                <nobr><b>ชื่อผู้ใช้ : </b>{firebase.auth().currentUser.displayName}</nobr>
                <br />
                <nobr><b>ชื่อ : </b>{details.firstName} <b>นามสกุล : </b>{details.surName}</nobr>
                <br />
                <nobr><b>เพศ : </b>{details.gender}</nobr>
                <br />
                <nobr><b>วันเกิด : </b>{details.birthDay}</nobr>
                <br />
                <nobr><b>เบอร์โทร : </b>{details.phone}</nobr>
                <br />
                <nobr><b>อีเมล : </b>{firebase.auth().currentUser.email}</nobr>
                <br />
                <div className="button">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setState(1)}
                  >
                    แก้ไขข้อมูล
                  </button>
                </div>
              </div>
            );
          case 1:
            return (
              <div className="profile-detail">
                <label>
                  <nobr><b>ชื่อผู้ใช้ : </b>{firebase.auth().currentUser.displayName}</nobr>
                </label>
                <br />
                <form>
                  <label>
                    <b>ชื่อ</b>
                    <input
                      type="text"
                      placeholder="กรอกชื่อ"
                      className="inpFirstname"
                      name="Firstname"
                      required
                      minLength="5"
                    />
                    <b>นามสกุล</b>
                    <input
                      type="text"
                      placeholder="กรอกนามสกุล"
                      className="inpSurname"
                      name="Surename"
                      required
                      minLength="5"
                    />
                  </label>
                  <br />
                  <label>
                    <b>เพศ</b>
                    <label className="container">
                      ชาย
                    <input type="radio" name="gender" value="male" />
                      <span className="checkmark"></span>{" "}
                    </label>
                    <label className="container">
                      หญิง
                    <input type="radio" name="gender" value="female" />
                      <span className="checkmark"></span>{" "}
                    </label>
                  </label>
                  <br />
                  <label>
                    <b>วันเกิด</b>
                    <input type="date" className="inpBirthday" name="Birthday" max={now} />
                  </label>
                  <br />
                  <label>
                    <b>เบอร์โทร</b>
                    <input
                      type="tel"
                      className="inpPhone"
                      placeholder="กรอกเบอร์โทร"
                      name="Phone"
                      required minLength="9"
                    />
                  </label>
                  <br />
                  <label>
                    <b>อีเมล</b>
                    <input
                      type="email"
                      className="inpEmail"
                      placeholder="กรอกอีเมล"
                      name="eMail"
                    />
                  </label>
                  <br />
                  <div className="button">
                    <button
                      type="submit"
                      className="btn"
                      onClick={() => setState(0)}
                    >
                      ยืนยันข้อมูล
                  </button>
                  </div>
                </form>
              </div>
            );
        }
      })()}
    </div>
  );
};