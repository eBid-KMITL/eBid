import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from "moment";
import firebase from 'firebase'
export const ProductDetail = ({ details, userData }) => {
  const [due, setDue] = useState(moment(details.timeoutdate + "T" + details.timeoutclock + "+0700", "YYYY-MM-DD HH:mm Z").format("x"));
  const [sent, setSent] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  const [alluser, setAllUser] = useState([]);
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

  function confirmProduct(id, price) {
    let newMyBalance = userData.balance - price
    let newMyUsed = userData.used - price
    firebase.firestore().collection('user').doc(userData.uid).update({
      balance: newMyBalance,
      used: newMyUsed
    }).then(() => {
      const batch = firebase.firestore().batch()
      let thatUser = alluser.filter(e => {
        return e.uid === id
      })
      thatUser = thatUser[0] ? thatUser[0] : null
      if (thatUser) {
        batch.update(firebase.firestore().collection('user').doc(id), {
          balance: thatUser.balance + price,
          recieve: thatUser.recieve + price
        })
      }
      batch.commit().then(() => {
        console.log('Batch update success!')
      }).catch(err => {
        console.log('Batch update failed', err)
      })

      firebase.firestore().collection('Product').doc(details.pid).update({
        sent: true
      })

    }).catch(err => {
      console.log(err)
    })
  }


  return (
    <tr>
      <td>
        <div className="productdetail-box">
          <div className="productdetail-img">
            <img src={details?.img[0]} alt="statement-pic" className="prod-pic" />
          </div>
          <div className="productdetail">
            <div className="product-title"><Link to={"/product?id=" + details.pid}>{details?.name}</Link></div>
            <div className="product-owner">
              <p style={{ margin: 0}}>{"โดย "+details.owner}</p>
            </div>
            <div className="time">
              <Moment style={{ textDecoration: "underline" }} title={moment(due, "x").format("[หมดเวลาวันที่ ] DD MMMM YYYY [เวลา] HH:mm [น.]")} interval={1000} fromNow >{details.timeoutdate + "T" + details.timeoutclock + "+0700"}
              </Moment>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="status">{formatter.format(details.price)}</div>
      </td>
      <td>
        <div className={details.currentWinner.uid === userData.uid ? 'winstatus' : 'losestatus'}>{
          details.currentWinner.uid === userData.uid ? <p style={{ color: "rgb(51, 194, 51)" }}>ชนะ</p> : <p style={{ color: "red" }}>ไม่ชนะ</p>
        }</div>
      </td>
      <td>
        <div className="bid-status">
          {
            new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") > Date.now() ? "กำลังประมูล" : details.currentWinner.uid === userData.uid ?
              (<><p>ชนะการประมูล</p>
                <button className="btn" disabled={details.sent} onClick={() => confirmProduct(details.ownerid, details.price)}
                > {details.sent ? "ยืนยันเรียบร้อยแล้ว" : "ยืนยันการรับสินค้า"}</button></>)
              : ('ประมูลไม่สำเร็จ')
          }
        </div>
      </td>
    </tr>
  );
};
