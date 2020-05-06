import React, { useState, useEffect } from "react";
import addrPicture from "../../assets/address.png";
import NavigationPrompt from "react-router-navigation-prompt";
import Modal from "react-responsive-modal";
import userinfo from "../../db/userinfo.json";
import firebase from "firebase";
// const details = {
//   name: "นายภูวดล   ลิ่มวณิชสินธุ์",
//   phone: "0878941296",
//   otherAddress: "บ้าน admin_alps 42/2 หมู่ 2",
//   subDistrict: "บางเป้า",
//   district: "กันตัง",
//   province: "ตรัง",
//   postalCode: "92110",
//   image: addrPicture,
// };

export const UserAddress = ({ userData }) => {
  const [state, setState] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const id = firebase.auth().currentUser.uid
  const id = userData?.uid

  function updateAdress(e) {
    e.preventDefault();
    const data = {
      recipient: document.getElementById("recipient").value,
      tell: document.getElementById("tell").value,
      address: document.getElementById("address").value,
      subDistrict: document.getElementById("subDistrict").value,
      district: document.getElementById("district").value,
      province: document.getElementById("province").value,
      postalCode: document.getElementById("postalCode").value,
      proveadd: true,
    }
    // console.log('sending')
    // console.log(data)
    firebase.firestore().collection('user').doc(id).update(data).then(() => {
      setState(0)
    }).catch(err => {
      console.log(err)
    })
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
                    {userData.recipient}
                  </nobr>
                  <br />
                  <nobr>
                    <b>เบอร์โทรศัพท์ : </b>
                    {userData.tell}
                  </nobr>
                  <br />
                  <nobr>
                    <b>ที่อยู่ : </b>
                    {userData.address}
                  </nobr>
                  <br />
                  <nobr>
                    <b>ตำบล/แขวง : </b>
                    {userData.subDistrict} <b>อำเภอ/เขต : </b>
                    {userData.district}
                  </nobr>
                  <br />
                  <nobr>
                    <b>จังหวัด : </b>
                    {userData.province}
                  </nobr>
                  <br />
                  <nobr>
                    <b>รหัสไปรษณีย์ : </b>
                    {userData.postalCode}
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
                  <form onSubmit={e => updateAdress(e)}>
                    <label>
                      <b>ชื่อผู้รับ</b>
                      <input
                        type="text"
                        placeholder="กรอกชื่อ-สกุล"
                        className="inpName"
                        id="recipient"
                        name="Name"
                        required
                        minLength="5"
                        title="กรอกชื่อผู้รับเป็นภาษาไทยเท่านั้น"
                        pattern="^[กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุูเแโใไๅๆ็่้๊๋์\s]+$"
                        defaultValue={userData.recipient}
                      />
                    </label>
                    <br />
                    <label>
                      <b>ที่อยู่</b>
                      <input
                        type="text"
                        className="inpAddressOther"
                        placeholder="กรอกที่อยู่"
                        id="address"
                        name="OtherAddress"
                        required
                        minLength="4"
                        title="กรอกที่อยู่เป็นภาษาไทยเท่านั้น"
                        pattern="^[กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุูเแโใไๅๆ็่้๊๋์.\/\d\s]+$"
                        defaultValue={userData.address}
                      />
                    </label>
                    <br />
                    <label>
                      <b>ตำบล/แขวง</b>
                      <input
                        type="text"
                        className="inpAddressSubDis"
                        placeholder="กรอกตำบล/แขวง"
                        id="subDistrict"
                        name="Subdistrict"
                        required
                        minLength="3"
                        title="กรอกเป็นภาษาไทยเท่านั้น"
                        pattern="^[กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุูเแโใไๅๆ็่้๊๋์]+$"
                        defaultValue={userData.subDistrict}
                      />
                    </label>
                    <br />
                    <label>
                      <b>อำเภอ/เขต</b>
                      <input
                        type="text"
                        className="inpAddressDis"
                        placeholder="กรอกอำเภอ/เขต"
                        id="district"
                        name="District"
                        required
                        minLength="3"
                        title="กรอกเป็นภาษาไทยเท่านั้น"
                        pattern="^[กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุูเแโใไๅๆ็่้๊๋์]+$"
                        defaultValue={userData.district}
                      />
                    </label>
                    <br />
                    <label>
                      <b>จังหวัด</b>
                      <input
                        type="text"
                        className="inpAddressProv"
                        placeholder="กรอกจังหวัด"
                        id="province"
                        name="Province"
                        required
                        minLength="3"
                        title="กรอกเป็นภาษาไทยเท่านั้น"
                        pattern="^[กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุูเแโใไๅๆ็่้๊๋์]+$"
                        defaultValue={userData.province}
                      />
                    </label>
                    <br />
                    <label>
                      <b>รหัสไปรษณีย์</b>
                      <input
                        type="text"
                        className="inpPostalCode"
                        placeholder="กรอกรหัสไปรษณีย์"
                        id="postalCode"
                        name="PostalCode"
                        title="ใส่รหัสไปรษณีย์ 5 หลัก"
                        required
                        pattern="^[1-9]{1}[\d]{4}$"
                        defaultValue={userData.postalCode}
                      />
                    </label>
                    <br />
                    <label>
                      <b>เบอร์โทร</b>
                      <input
                        type="tel"
                        className="inpPhone"
                        placeholder="กรอกเบอร์โทร"
                        id="tell"
                        name="Phone"
                        required
                        minLength="9"
                        title="โปรดกรอกหมายเลขโทรศัพท์มือถือ 10 หลักให้ถูกต้อง"
                        pattern="^[0]{1}[689]{1}[\d]{8}$"
                        defaultValue={userData.tell}
                      />
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
