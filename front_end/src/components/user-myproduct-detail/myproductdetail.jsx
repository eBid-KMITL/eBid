import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from "moment";
import firebase from 'firebase';
import Modal from 'react-responsive-modal';

export const MyProductDetail = ({ details }) => {
  //eslint-disable-next-line
  const [due, setDue] = useState(moment(details.timeoutdate + "T" + details.timeoutclock + "+0700", "YYYY-MM-DD HH:mm Z").format("x"));
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  const [alluser, setAllUser] = useState([]);
  const [addr, setAddr] = useState(false);
  const [data, setData] = useState({});
  function onOpenAddr() {
    setAddr(true);
  }
  function onCloseAddr() {
    setAddr(false);
  }
  let ud = []
  useEffect(() => {
    firebase.firestore().collection('user').onSnapshot(snapshot => {
      // console.log('snap of user')
      ud = []
      snapshot.forEach(doc => {
        var uData = doc.data()
        uData.uid = doc.id
        ud.push(uData)
      })
      // console.log(ud)
      setAllUser(ud)
    })
  }, [])

  let theirAddress = {}
  function showUserAddress(id) {
    let thatUser = alluser.filter(e => {
      return e.uid === id
    })
    thatUser = thatUser[0] ? thatUser[0] : null
    if (thatUser) {
      theirAddress = {
        recipient: thatUser.recipient,
        tell: thatUser.tell,
        address: thatUser.address,
        subDistrict: thatUser.subDistrict,
        district: thatUser.district,
        province: thatUser.province,
        postalCode: thatUser.postalCode
      }
    }
    setData(theirAddress);
    // console.log(theirAddress)
  }

  return (
    <tr>
      <td>
        <div className="productdetail-box">
          <div className="productdetail-img">
            <Link title="ไปที่หน้าสินค้านี้" to={"/product?id=" + details.pid}>
              <img src={details?.img[0]} alt="product-pic" className="prod-pic" />
            </Link>
          </div>
          <div className="productdetail">
            <Link title="ไปที่หน้าสินค้านี้" to={"/product?id=" + details.pid}>
              <div className="product-title">{details?.name}</div>
            </Link>
            <div className="timeout" style={{ textDecoration: "underline" }}><Moment title={moment(due, "x").format("[หมดเวลาวันที่ ] DD MMMM YYYY [เวลา] HH:mm [น.]")} interval={1000} fromNow >{details.timeoutdate + "T" + details.timeoutclock + "+0700"}</Moment></div>
          </div>
        </div>
      </td>
      <td>
        <div className="status">{formatter.format(details.price)}</div>
      </td>
      <td>
        <div className={new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") < Date.now() ? "endstatus" : "status"}>{
          new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") < Date.now() ? <p style={{ color: "red" }}>{
            !details.currentWinner?.name ? "หมดเวลา" : (details.sent ? "ส่งถึงแล้ว" : "รอผู้รับยืนยัน")
          }</p> : <p style={{ color: "rgb(51, 194, 51)" }}>กำลังประมูล</p>
        }</div>
      </td>
      <td>
        <div className="product-owner">
          {
            (new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") < Date.now()) ?
              (!details.currentWinner?.name) ?
                "ไม่มีผู้ร่วมประมูล" :
                <a title="ดูข้อมูลที่อยู่ของผู้ใช้นี้" href="#" onClick={() => { onOpenAddr(); showUserAddress(details.currentWinner?.uid) }}>{details.currentWinner?.name}</a> :
              (!details.currentWinner?.name) ?
                'ไม่มีผู้ร่วมประมูล' :
                <p style={{ textDecoration: "none !important" }}>{details.currentWinner?.name}</p>
          }

        </div>
        <Modal open={addr} center={true} onClose={() => onCloseAddr()} little>
          <h1>ข้อมูลที่อยู่</h1>
          <nobr>
            <b>ชื่อผู้รับ : </b>
            {data.recipient}
          </nobr>
          <br />
          <nobr>
            <b>เบอร์โทรศัพท์ : </b>
            {data.tell}
          </nobr>
          <br />
          <nobr>
            <b>ที่อยู่ : </b>
            {data.address}
          </nobr>
          <br />
          <nobr>
            <b>ตำบล/แขวง : </b>
            {data.subDistrict} <b>อำเภอ/เขต : </b>
            {data.district}
          </nobr>
          <br />
          <nobr>
            <b>จังหวัด : </b>
            {data.province}
          </nobr>
          <br />
          <nobr>
            <b>รหัสไปรษณีย์ : </b>
            {data.postalCode}
          </nobr>
          <br />
          <button className="btn-close" id="close-terms" type="button" onClick={() => { onCloseAddr() }}>ปิด</button>
        </Modal>
      </td>
    </tr>
  );
};
