import React from "react";
import profilePicture from "../../assets/Profile.png";
import { useState } from "react";

const details = {
  firstName: "ภูวดล",
  surName: "ลิ่มวณิชสินธุ์",
  profileName: "admin_alps",
  gender: "ชาย",
  birthDay: "23/11/2542",
  email: "alpe_panda@hotmail.co.th",
  phone: "0878941296",
  image: profilePicture,
};

export const UserProfile = () => {
  const [state, setState] = useState(0);

  return (
    <div className="profile-box">
      <h>ข้อมูลของฉัน</h>
      <div className="profile-img">
        <img src={details.image} />
      </div>
      {(() => {
        switch (state) {
          case 0:
            return (
              <div className="profile-detail">
                Account : {details.profileName}
                <br />
                ชื่อ : {details.firstName} นามสกุล : {details.surName}
                <br />
                เพศ : {details.gender} วันเกิด : {details.birthDay}
                <br />
                เบอร์โทร : {details.phone}
                <br />
                e-mail : {details.email}
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
                  Account :
                  <input
                    type="text"
                    placeholder="กรอกชื่อ Account"
                    className="inpAccountname"
                    name="Accountname"
                    required
                    minLength="5"
                  />
                </label>
                <br />
                <label>
                  ชื่อ
                  <input
                    type="text"
                    placeholder="กรอกชื่อ"
                    className="inpFirstname"
                    name="Firstname"
                    required
                    minLength="5"
                  />
                  นามสกุล
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
                  เพศ
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
                  วันเกิด :{" "}
                  <input type="date" className="inpBirthday" name="Birthday" />
                </label>
                <br />
                <label>
                  เบอร์โทร
                  <input
                    type="text"
                    className="inpPhone"
                    placeholder="กรอกเบอร์โทร"
                    name="Phone"
                    required minLength="9"
                  />
                </label>
                <br />
                <label>
                  e-mail
                  <input
                    type="email"
                    className="inpEmail"
                    placeholder="กรอก e-mail"
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
              </div>
            );
        }
      })()}
    </div>
  );
};
