import React from "react";
import profilePicture from "../../assets/Profile.png";
import { useState } from "react";
import firebase from "firebase";
import moment from "moment";
import userinfo from "../../db/userinfo.json";

// const details = {
//   firstName: "ภูวดล",
//   surName: "ลิ่มวณิชสินธุ์",
//   gender: "ชาย",
//   birthDay: "23/11/2542",
//   email: "alpe_panda@hotmail.co.th",
//   phone: "0878941296",
//   image: profilePicture,
// };

export const UserProfile = () => {
  const now = moment().format("YYYY-MM-DD");
  const [state, setState] = useState(0);

  return (
    <div className="profile-box">
      <h>ข้อมูลของฉัน</h>
      <div className="profile-img">
        <img src={profilePicture} alt="profile-pic" />
      </div>
      {(() => {
        switch (state) {
          default:
            return (
              <div className="profile-detail">
                <nobr><b>ชื่อผู้ใช้ : </b>{firebase.auth().currentUser.displayName}</nobr>
                <br />
                <nobr><b>ชื่อ : </b>{userinfo.firstName} <b>นามสกุล : </b>{userinfo.lastName}</nobr>
                <br />
                <nobr><b>เพศ : </b>{userinfo.gender}</nobr>
                <br />
                <nobr><b>วันเกิด : </b>{moment(userinfo.birthDay, "YYYY-MM-DD").format("DD MMMM YYYY")}</nobr>
                <br />
                <nobr><b>เบอร์โทร : </b>{userinfo.phone}</nobr>
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
                      defaultValue={userinfo.firstName}
                    />
                    <b>นามสกุล</b>
                    <input
                      type="text"
                      placeholder="กรอกนามสกุล"
                      className="inpSurname"
                      name="Surename"
                      required
                      minLength="5"
                      defaultValue={userinfo.lastName}
                    />
                  </label>
                  <br />
                  <label>
                    <b>เพศ</b>
                    <label className="container">
                      ชาย
                    <input type="radio" name="gender" value="male" defaultChecked={(userinfo.gender === "ชาย") ? true : false}/>
                      <span className="checkmark"></span>{" "}
                    </label>
                    <label className="container">
                      หญิง
                    <input type="radio" name="gender" value="female" defaultChecked={(userinfo.gender === "หญิง") ? true : false}/>
                      <span className="checkmark"></span>{" "}
                    </label>
                  </label>
                  <br />
                  <label>
                    <b>วันเกิด</b>
                    <input type="date" className="inpBirthday" name="Birthday" max={now} defaultValue={userinfo.birthDay}/>
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
                      defaultValue={userinfo.phone}
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
                      defaultValue={firebase.auth().currentUser.email}
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
                  <button
                      type="button"
                      className="btn_s"
                      onClick={() => setState(0)}
                    >
                      ยกเลิก
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