import React, { useState, useEffect } from "react";
import profilePicture from "../../assets/Profile.png";
import firebase from "firebase";
import NavigationPrompt from "react-router-navigation-prompt";
import Modal from "react-responsive-modal";
import moment from "moment";
import userinfo from "../../db/userinfo.json";

export const UserProfile = ({ userData }) => {

  const now = moment().format("YYYY-MM-DD");
  const [state, setState] = useState(0);
  var genDer = ''
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const id = userData?.uid

  function checkGender(check) {
    genDer = check
  }

  function updateProfile(e) {
    e.preventDefault();
    const data = {
      firstName: document.getElementById("Name").value,
      lastName: document.getElementById("SurName").value,
      gender: genDer ? (genDer) : "other",
      birthDay: document.getElementById("birthday").value,
      phone: document.getElementById("phone").value
    }
    console.log('sending')
    console.log(data)
    firebase.firestore().collection('user').doc(id).update(data).then(() => {
      setState(0)
    }).catch(err => {
      console.log(err)
    })
    // api({
    //   method: "get",
    //   url: "/Customeruser",
    //   headers: {
    //     uid: id,
    //     firstName: 'name'
    //   },
    //   body: {
    //     firstName: 'name'
    //   }
    // }).then(res => {
    //   console.log(res.data)
    //   setState(0)
    // }).catch(err => {
    //   console.log(err)
    // });
  }


  return (
    <>
      <NavigationPrompt
        disableNative={true}
        when={(crntLocation, nextLocation) =>
          !nextLocation ||
          (!nextLocation.pathname.startsWith(crntLocation.pathname) &&
            state === 1)
        }
      >
        {({ isActive, onCancel, onConfirm }) => {
          if (isActive) {
            return (
              <Modal
                open={true}
                center={true}
                showCloseIcon={false}
                closeOnEsc={false}
                closeOnOverlayClick={false}
              >
                <div className="alert-container">
                  <h2>คุณยังไม่ได้ยืนยันข้อมูล</h2>
                  <p className="alertMessage">
                    คุณแน่ใจหรือไม่ว่าต้องการออกจากหน้านี้
                  </p>
                </div>

                <button onClick={onCancel} className="btn-no">
                  ไม่ ฉันต้องการอยู่ในหน้านี้
                </button>
                <button onClick={onConfirm} className="btn-yes">
                  ใช่ ฉันต้องการออกจากหน้านี้
                </button>
              </Modal>
            );
          }
        }}
      </NavigationPrompt>
      <div className="profile-box">
        <h1>ข้อมูลของฉัน</h1>
        <div className="profile-img">
          <img src={profilePicture} alt="profile-pic" />
        </div>
        {(() => {
          switch (state) {
            default:
              return (
                <div className="profile-detail">
                  <nobr>
                    <b>ชื่อผู้ใช้ : </b>
                    {userData.displayName}
                  </nobr>
                  <br />
                  <nobr>
                    <b>ชื่อ : </b>
                    {userData.firstName} <b>นามสกุล : </b>
                    {userData.lastName}
                  </nobr>
                  <br />
                  <nobr>
                    <b>เพศ : </b>
                    {(userData.gender) === "male" ? "ชาย"
                      : (userData.gender) === "female" ? "หญิง"
                        : (userData.gender) === "other" ? "ไม่ระบุ" : "ไม่มีข้อมูล"
                    }
                  </nobr>
                  <br />
                  <nobr>
                    <b>วันเกิด : </b>
                    {moment(userData.birthDay, "YYYY-MM-DD").format(
                      "DD MMMM YYYY"
                    )}
                  </nobr>
                  <br />
                  <nobr>
                    <b>เบอร์โทร : </b>
                    {userData.phone}
                  </nobr>
                  <br />
                  <nobr>
                    <b>อีเมล : </b>
                    {userData.email}
                  </nobr>
                  <br />
                  <div className="button">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setState(1)}>
                      แก้ไขข้อมูล
                    </button>
                  </div>
                </div>
              );
            case 1:
              return (
                <div className="profile-detail">
                  <label>
                    <nobr>
                      <b>ชื่อผู้ใช้ : </b>
                      {userData.displayName}
                    </nobr>
                  </label>
                  <br />
                  <form onSubmit={e => { updateProfile(e) }}>
                    <label>
                      <b>ชื่อ</b>
                      <input
                        type="text"
                        id="Name"
                        placeholder="กรอกชื่อ"
                        className="inpFirstname"
                        name="Firstname"
                        required
                        minLength="2"
                        title="กรอกเป็นภาษาไทยเท่านั้น"
                        pattern="^[กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุูเแโใไๅๆ็่้๊๋์]+$"
                        defaultValue={userData.firstName}
                      />
                      <b>นามสกุล</b>
                      <input
                        type="text"
                        id="SurName"
                        placeholder="กรอกนามสกุล"
                        className="inpSurname"
                        name="Surename"
                        required
                        minLength="2"
                        title="กรอกเป็นภาษาไทยเท่านั้น"
                        pattern="^[กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุูเแโใไๅๆ็่้๊๋์]+$"
                        defaultValue={userData.lastName}
                      />
                    </label>
                    <br />
                    <label>
                      <b>เพศ</b>
                      <label className="container">
                        ชาย
                        <input
                          type="radio"
                          onClick={e => checkGender(e.target.value)}
                          name="gender"
                          value="male"
                          required
                          defaultChecked={
                            userData.gender === "male" ? true : false
                          }
                        />
                        <span className="checkmark"></span>{" "}
                      </label>
                      <label className="container">
                        หญิง
                        <input
                          type="radio"
                          onClick={e => checkGender(e.target.value)}
                          name="gender"
                          value="female"
                          required
                          defaultChecked={
                            userData.gender === "female" ? true : false
                          }
                        />
                        <span className="checkmark"></span>{" "}
                      </label>
                      <label className="container">
                        ไม่ระบุ
                        <input
                          type="radio"
                          onClick={e => checkGender(e.target.value)}
                          name="gender"
                          value="other"
                          required
                          defaultChecked={
                            userData.gender === "other" ? true : false
                          }
                        />
                        <span className="checkmark"></span>{" "}
                      </label>
                    </label>
                    <br />
                    <label>
                      <b>วันเกิด</b>
                      <input
                        type="date"
                        className="inpBirthday"
                        name="Birthday"
                        id="birthday"
                        max={now}
                        defaultValue={userData.birthDay}
                      />
                    </label>
                    <br />
                    <label>
                      <b>เบอร์โทร</b>
                      <input
                        type="tel"
                        className="inpPhone"
                        placeholder="กรอกเบอร์โทร"
                        name="Phone"
                        id="phone"
                        title="โปรดกรอกหมายเลขโทรศัพท์ให้ถูกต้อง"
                        pattern="[0-9]{10}"
                        required
                        minLength="9"
                        defaultValue={userData.phone}
                      />
                    </label>
                    <br />
                    <label>
                      <nobr>
                        <b>อีเมล : </b>
                        {userData.email}
                      </nobr>
                    </label>
                    <br />
                    <div className="button">
                      <button
                        type="submit"
                        className="btn"
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
    </>
  );
};
