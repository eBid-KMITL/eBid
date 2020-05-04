import React, { useState, useEffect } from "react";
import NavigationPrompt from "react-router-navigation-prompt";
import Modal from "react-responsive-modal";
import psswPicture from "../../assets/password.png";

export const UserPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [submitState, setSubmitState] = useState(true);                     //For check ther there are input
  const [matchOldPassword, setMatchOldPassword] = useState(null);           //For check that old password is matched
  const [matchNewPassword, setMatchNewPassword] = useState(null);           //For check that new password is matched

  function checkOldPassword() {
    if (document.getElementById("oldPassword").value !== "") {
      if (document.getElementById("oldPassword").value !== "cv]xNeBid") {         // Use my password to debug instead
        setMatchOldPassword(false);
      } else {
        setMatchOldPassword(true);
      }
    } else {
      setMatchOldPassword(null);
    }
  }

  function checkSubmitPassword() {
    if (document.getElementById("submPassword").value !== "" && document.getElementById("newPassword").value !== "") {
      if (document.getElementById("submPassword").value !== document.getElementById("newPassword").value) {
        setMatchNewPassword(false);
      } else {
        setMatchNewPassword(true);
      }
    } else {
      setMatchNewPassword(null);
    }
  }

  function checkThreeInputSubmit() {
    if (document.getElementById("oldPassword").value !== "" || document.getElementById("submPassword").value !== "" || document.getElementById("newPassword").value !== "") {
      setSubmitState(false);
    } else {
      setSubmitState(true);
    }
    checkOldPassword();
    checkSubmitPassword();
  }

  function resetAll() {
    setSubmitState(true);
    setMatchOldPassword(null);
    setMatchNewPassword(null);
  }

  return (
    <>
      <NavigationPrompt
        afterConfirm={() => resetAll()}
        disableNative={true}
        when={(crntLocation, nextLocation) =>
          !nextLocation ||
          (!nextLocation.pathname.startsWith(crntLocation.pathname) &&
            submitState === false)
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
      <div className="password-box">
        <h>ตั้งค่ารหัสผ่าน</h>
        <div className="password-img">
          <img src={psswPicture} alt="password-pic" />
        </div>
        <div className="password-detail">
          <form>
            <div className="form-group">
              รหัสผ่านเก่า
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="กรอกรหัสผ่านเก่า"
                className={` ${matchOldPassword === true ? "passMatch" : ""} ${matchOldPassword === false ? "passMissMatch" : ""}`}
                required
                minLength="8"
                onInput={() => checkThreeInputSubmit()}
              />
            </div>
            <div className="form-group">
              รหัสผ่านใหม่
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="กรอกรหัสผ่านใหม่"
                className={` ${matchNewPassword === true ? "passMatch" : ""} ${matchNewPassword === false ? "passMissMatch" : ""}`}
                required
                minLength="8"
                onInput={() => checkThreeInputSubmit()}
              />
            </div>
            <div className="form-group">
              ยืนยันรหัสผ่านใหม่
              <input
                type="password"
                id="submPassword"
                name="submPassword"
                placeholder="ยืนยันรหัสผ่านใหม่"
                className={` ${matchNewPassword === true ? "passMatch" : ""} ${matchNewPassword === false ? "passMissMatch" : ""}`}
                required
                minLength="8"
                onInput={() => checkThreeInputSubmit()}
              />
            </div>
            <div className="button">
              <button type="submit" className="btn" disabled={!matchNewPassword  || !matchOldPassword}>
                เปลี่ยนรหัสผ่าน
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
