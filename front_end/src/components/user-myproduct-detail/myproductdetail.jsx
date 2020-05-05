import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from "moment";
import firebase from 'firebase'
export const MyProductDetail = ({ details }) => {
  //eslint-disable-next-line
  const [due, setDue] = useState(moment(details.timeoutdate + "T" + details.timeoutclock + "+0700", "YYYY-MM-DD HH:mm Z").format("x"));
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  let adress = []
  let theirAddress = {}
  function showUserAddress(id) {
    firebase.firestore().collection('user').doc(id).onSnapshot(snapshot => {
      console.log('snap of user in myproduct')
      theirAddress = {
        recipient: snapshot.data().recipient,
        tell: snapshot.data().tell,
        address: snapshot.data().address,
        subDistrict: snapshot.data().subDistrict,
        district: snapshot.data().district,
        province: snapshot.data().province,
        postalCode: snapshot.data().postalCode
      }
    })
  }

  return (
    <tr>
      <td>
        <div className="productdetail-box">
          <div className="productdetail-img">
            <img src={details?.img[0]} alt="product-pic" className="prod-pic" />
          </div>
          <div className="productdetail">
            <Link to={"/product?id=" + details.pid}>
              <div className="product-title">{details?.name}</div>
            </Link>
            <div className={new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") < Date.now() ? "end" : "notend"}><Moment title={moment(due, "x").format("[หมดเวลาวันที่ ] DD MMMM YYYY [เวลา] HH:mm [น.]")} interval={1000} fromNow >{details.timeoutdate + "T" + details.timeoutclock + "+0700"}</Moment></div>
          </div>
        </div>
      </td>
      <td>
        <div className="status">{formatter.format(details.price)}</div>
      </td>
      <td>
        <div className={new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") < Date.now() ? "endstatus" : "status"}>{
          new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") < Date.now() ? <p style={{ color: "red" }}>หมดเวลา</p> : <p style={{ color: "rgb(51, 194, 51)" }}>กำลังประมูล</p>
        }</div>
      </td>
      <td>
        <div className="product-owner">{
          (new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") < Date.now()) && (!details.currentWinner?.name) ? "ไม่มีผู้ร่วมประมูล" : <Link to="#" 
          // onClick={() => showUserAddress(details.currentWinner?.uid)}
          >{details.currentWinner?.name}</Link>
        }
        </div>
      </td>
    </tr>
  );
};
