import React, { useState, useEffect } from "react";
import addrPicture from "../../assets/address.png";
import NavigationPrompt from "react-router-navigation-prompt";
import Modal from "react-responsive-modal";
import userinfo from "../../db/userinfo.json";

export const UserAddress = () => {
  const [state, setState] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div className="address-box">
        <h>ที่อยู่ของฉัน</h>
        <div className="address-img">
          <img src={addrPicture} alt="address-pic" />
        </div>
        {(() => {
          switch (state) {
            default:
              return (
                <div className="address-detail">
                  <nobr>
                    <b>ชื่อผู้รับ : </b>
                    {userinfo.recipient}
                  </nobr>
                  <br />
                  <nobr>
                    <b>เบอร์โทรศัพท์ : </b>
                    {userinfo.tell}
                  </nobr>
                  <br />
                  <nobr>
                    <b>ที่อยู่ : </b>
                    {userinfo.address}
                  </nobr>
                  <br />
                  <nobr>
                    <b>ตำบล/แขวง : </b>
                    {userinfo.subDistrict} <b>อำเภอ/เขต : </b>
                    {userinfo.district}
                  </nobr>
                  <br />
                  <nobr>
                    <b>จังหวัด : </b>
                    {userinfo.province}
                  </nobr>
                  <br />
                  <nobr>
                    <b>รหัสไปรษณีย์ : </b>
                    {userinfo.postalCode}
                  </nobr>
                  <div className="button">
                    <button
                      type="submit"
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
                <div className="address-detail">
                  <br />
                  <label>
                    <b>ชื่อผู้รับ</b>
                    <input
                      type="text"
                      placeholder="กรอกชื่อ-สกุล"
                      className="inpName"
                      name="Name"
                      required
                      minLength="20"
                      defaultValue={userinfo.recipient}
                    />
                  </label>
                  <br />
                  <label>
                    <b>ที่อยู่</b>
                    <input
                      type="text"
                      className="inpAddressOther"
                      placeholder="กรอกที่อยู่"
                      name="OtherAddress"
                      required
                      minLength="5"
                      defaultValue={userinfo.address}
                    />
                  </label>
                  <br />
                  <label>
                    <b>ตำบล/แขวง</b>
                    <input
                      type="text"
                      className="inpAddressSubDis"
                      placeholder="กรอกตำบล/แขวง"
                      name="Subdistrict"
                      required
                      minLength="5"
                      defaultValue={userinfo.subDistrict}
                    />
                  </label>
                  <br />
                  <label>
                    <b>อำเภอ/เขต</b>
                    <input
                      type="text"
                      className="inpAddressDis"
                      placeholder="กรอกอำเภอ/เขต"
                      name="District"
                      required
                      minLength="5"
                      defaultValue={userinfo.district}
                    />
                  </label>
                  <br />
                  <label>
                    <b>จังหวัด</b>
                    <input
                      type="text"
                      className="inpAddressProv"
                      placeholder="กรอกจังหวัด"
                      name="Province"
                      required
                      minLength="5"
                      defaultValue={userinfo.province}
                    />
                  </label>
                  <br />
                  <label>
                    <b>รหัสไปรษณีย์</b>
                    <input
                      type="number"
                      className="inpPostalCode"
                      placeholder="กรอกรหัสไปรษณีย์"
                      name="PostalCode"
                      required
                      minLength="5"
                      defaultValue={userinfo.postalCode}
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
                      required
                      minLength="9"
                      defaultValue={userinfo.tell}
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
                </div>
              );
          }
        })()}
      </div>
    </>
  );
};
