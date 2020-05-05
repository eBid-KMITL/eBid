import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from "moment";
import firebase from 'firebase'
export const ProductDetail = ({ details, userData }) => {
  const [due, setDue] = useState(moment(details.timeoutdate + "T" + details.timeoutclock + "+0700", "YYYY-MM-DD HH:mm Z").format("x"));
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
      console.log('snap of user')
      ud = []
      snapshot.forEach(doc => {
        var uData = doc.data()
        uData.uid = doc.id
        ud.push(uData)
      })
      console.log(ud)
      setAllUser(ud)
    })
  }, [])
  
  function confirmProduct(id,price){
    let newMyBalance = userData.balance - price
    let newMyUsed = userData.used - price
    firebase.firestore().collection('user').doc(userData.uid).update({
      balance : newMyBalance,
      used : newMyUsed
    }).then(()=>{
      const batch = firebase.firestore().batch()
      
    })

    // firebase.firestore().collection('user').doc(id).update({
    //   balance : newTheirBalance
    // })
    }


  return (
    <tr>
      <td>
        <div className="productdetail-box">
          <div className="productdetail-img">
            <img src={details?.img[0]} alt="statement-pic" className="prod-pic" />
          </div>
          <div className="productdetail">
            <div className="product-title">{details?.name}</div>
            <div className="product-owner">
              <Link to="#">{details.owner}</Link>
            </div>
            <div className={new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") < Date.now() ? "end" : "notend"}>
              <Moment title={moment(due, "x").format("[หมดเวลาวันที่ ] DD MMMM YYYY [เวลา] HH:mm [น.]")} interval={1000} fromNow >{details.timeoutdate + "T" + details.timeoutclock + "+0700"}</Moment></div>
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
            new Date(details.timeoutdate + "T" + details.timeoutclock + "+0700") > Date.now() ? 'notend' : details.currentWinner.uid === userData.uid ?
              (<><p>ชนะการประมูล</p>
                <button className="btn" 
                // onClick={() => confirmProduct(details.ownerid,details.price)}
                >ยืนยันการรับสินค้า</button></>)
              : ('ประมูลไม่สำเร็จ')
          }
        </div>
      </td>
    </tr>
  );
};
