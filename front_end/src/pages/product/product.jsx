import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Modal from 'react-responsive-modal';
import './product.scss';
import { FaSyncAlt, FaClock, FaUserCircle, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md"
import Moment from 'react-moment';
import firebase from "firebase"
import moment from "moment";
import db from "../../db/product.json";
// import img[1] from "../../assets/products-pics/pic-big/mac1.png"

export const Product = ({ userData }) => {
  // var product_id;
  const prodEndTime = db.time;
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });

  const history = useHistory();
  const id = useQuery().get("id")
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState(db.price);
  const [title, setTitle] = useState(db.name);
  const [confirm, setConfirm] = useState(false);
  const [btn, setBTN] = useState(true);
  const [love, setLove] = useState(false);
  const [status, setStatus] = useState(db.status);
  const [isOwner, setIsOwner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [disable, setDisable] = useState(true);
  const [pic, setPic] = useState(["hovered", "", "", ""]);
  const [bigImg, setBigImg] = useState("https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif");
  const [now, setNow] = useState(moment().format("x")); //eslint-disable-next-line
  const [due, setDue] = useState(prodEndTime);
  const [badgeStyle, setBadgeStyle] = useState({
    width: "fit-content",
    padding: "1px 5px",
    margin: 0,
    borderRadius: "5px",
    backgroundColor: "rgb(100, 100, 100)",
    color: "white",
    fontFamily: "Noto Sans Thai UI",
  })
  const [alluser, setAllUser] = useState([]);
  let ud = []
  const [product, setProduct] = useState(null);
  useEffect(() => {
    firebase.firestore().collection('Product').doc(id).onSnapshot(snapshot => {
      // console.log('snap of Product in Product.jsx')
      setProduct(snapshot.data())
      setBigImg(snapshot.data().img[0])
      setDue(moment(snapshot.data().timeoutdate + "T" + snapshot.data().timeoutclock + "+0700", "YYYY-MM-DD HH:mm Z").format("x"))
    })

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
      // new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      //   console.log(alluser)
      // })
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    // const { name, price } = fetch(db);
    setPrice(price);
    setTitle(title);
    checkStatus();  //eslint-disable-next-line
  }, [now])
  useEffect(() => {
    if (now <= due) setTimeout(() => { setNow(parseInt(now) + 1000) }, 1000);
  }, [now, due])
  function onOpenModal() {
    if (userData) {
      setModal(true);
    }
    else {
      history.push("/login?from=product?id=" + id);
    }
  }

  function onCloseModal() {
    setModal(false);
    setConfirm(false);
    setBTN(true);
  }
  function onOpenConfirm(e) {
    e.preventDefault();
    setConfirm(true);
  }
  function onCloseConfirm() {
    setConfirm(false);
  }
  // function toggleLove() {
  //   if (userData) {
  //     if (love) {
  //       setLove(false);
  //     }
  //     else {
  //       setLove(true);
  //     }
  //   }
  //   else {
  //     history.push("/login?from=product?id=" + id);
  //   }
  // }
  function checkStatus() {
    if (product?.ownerid === userData?.uid) {
      setIsOwner(true)
    }
    else setIsOwner(false)
    if (now < due) {
      setStatus(1);
      setDisable(false);
      setBadgeStyle({
        width: "fit-content",
        padding: "1px 5px",
        margin: 0,
        borderRadius: "5px",
        backgroundColor: "rgb(6, 190, 0)",
        color: "white",
        fontFamily: "Noto Sans Thai UI",
      })
    }
    else {
      setStatus(2);
      setDisable(true);
      onCloseModal();
      onCloseConfirm();
      setBTN(true);
      setBadgeStyle({
        width: "fit-content",
        padding: "1px 5px",
        margin: 0,
        borderRadius: "5px",
        backgroundColor: "rgb(255, 0, 0)",
        color: "white",
        fontFamily: "Noto Sans Thai UI",
      })
    }
  }
  function picSelect(sel) {
    if (sel === 1) {
      setBigImg(product.img[0]);
      setPic(["hovered", "", "", ""]);
    }
    else if (sel === 2) {
      setBigImg(product.img[1]);
      setPic(["", "hovered", "", ""]);
    }
    else if (sel === 3) {
      setBigImg(product.img[2]);
      setPic(["", "", "hovered", ""]);
    }
    else if (sel === 4) {
      setBigImg(product.img[3]);
      setPic(["", "", "", "hovered"]);
    }
  }
  function validateForm() {
    var input = parseInt(document.forms["bid-price"]["bid-input"].value)
    if (input > product.price && (input + userData.used) <= userData.balance && userData.proveadd && userData.proveprofile) {
      setBTN(false);
      setAlert(false);
    }
    else if (input > product.price && input > userData.balance) {
      setBTN(true);
      setAlert(true);
    }
    else {
      setBTN(true);
    }
  }
  function payCoin() {
    // console.log('paying')
    const newBidPrice = parseInt(document.getElementById('bid-price').value)
    let newUsed = 0
    if ((userData.used + newBidPrice) < userData.balance) {
      if (product.bidder.some(ele => ele.uid === userData.uid)) {
        product.bidder.forEach(ele => {
          if (ele.uid === userData.uid) {
            newUsed = userData.used + (newBidPrice - ele.bidPrice)
            ele.bidPrice = newBidPrice
          }
        })
      } else {
        //ยังไม่เคยบิด
        newUsed = userData.used + newBidPrice
        product.bidder.push({
          uid: userData.uid,
          bidPrice: newBidPrice
        })
      }
      const backupBid = []
      product.bidder.forEach(ele=>{
        if(ele.uid !== userData.uid){
          backupBid.push({
            uid: ele.uid,
            bidPrice: ele.bidPrice
          })
          ele.bidPrice = 0
        }
      })
      let newNbid = product.nbid + 1
      const bidder = product.bidder
      firebase.firestore().collection('Product').doc(id).update({
        bidder: product.bidder,
        price: newBidPrice,
        currentWinner: { uid: userData.uid, name: userData.displayName },
        nbid: newNbid
      }).then(() => {
        const batch = firebase.firestore().batch()
        product.bidder.forEach((ele, i) => {
          if (ele.uid != userData.uid) {
            //ไม่ใช่มึง
            // console.log(alluser,ud, ele.uid)
            let thatUser = alluser.filter(e=>{
              return e.uid === ele.uid
            })
            // console.log('thatUser',thatUser)
            thatUser = thatUser[0]?thatUser[0]:null
            if (thatUser) {
              batch.update(firebase.firestore().collection('user').doc(ele.uid), {
                used: thatUser.used - backupBid.filter(f=>f.uid === ele.uid)[0].bidPrice
              })
            }
          } else {
            //มึงเอง
          }
        })
        batch.commit().then(()=>{
          console.log('Batch update success!')
        }).catch(err=>{
          console.log('Batch update failed',err)
        })

        firebase.firestore().collection('user').doc(userData.uid).update({
          used: newUsed
        }).then(() => {
          // console.log('Successfully bid!')
          onCloseConfirm();
        }).catch(err => {
          console.log('Failed to bid at UserUpdate', err)
        })
      }).catch(err => {
        console.log('Failed to bid at PriceUpdate', err)
      })
    } else {
      //ตังมึงไม่พอ
    }
  }

  return (
    <div className="product-main">
      {product ? <>
        <Helmet><title>{product.name} | eBid - Online Bidding</title></Helmet>
        <div className="breadcrums">
          <a href="/">eBid</a> ▸&nbsp;
        {(product.category === 1) ? (<><a href="/category?id=1">การ์ตูน</a> ▸&nbsp;</>)
            : (product.category === 2) ? (<><a href="/category?id=2">ของสะสม</a> ▸&nbsp;</>)
              : (product.category === 3) ? (<><a href="/category?id=3">ของเล่น | เกมส์</a> ▸&nbsp;</>)
                : (product.category === 4) ? (<><a href="/category?id=4">คอมพิวเตอร์ | โทรศัพท์มือถือ</a> ▸&nbsp;</>)
                  : (product.category === 5) ? (<><a href="/category?id=5">หนังสือ | สิ่งพิมพ์</a> ▸&nbsp;</>)
                    : (product.category === 6) ? (<><a href="/category?id=6">แฟชั่น</a> ▸&nbsp;</>)
                      : (product.category === 7) ? (<><a href="/category?id=7">ภาพยนตร์ | วิดีโอ | ดีวีดี</a> ▸&nbsp;</>)
                        : (product.category === 8) ? (<><a href="/category?id=8">อิเล็กทรอนิกส์</a> ▸&nbsp;</>)
                          : ""
          }
          {product.name}
        </div>
        <div className="base-container">
          <div className="img-container">
            <div className="img-big">
              <img src={bigImg} alt="product-pic" />
            </div>
            <div className="img-small-cont">
              <div className="img-small">
                {/* {product.img ? product.img.map((d, index) => <img src={d} id={pic[index]} alt={'product-pic' + index} onMouseOver={() => picSelect(index)} />) : 'No image'} */}
                {/* {console.log(product.img)} */}
                {product.img && product.img[0] ? <img src={product.img[0]} id={pic[0]} alt="product-pic1" onMouseOver={() => picSelect(1)} /> : null}
                {product.img && product.img[1] ? <img src={product.img[1]} id={pic[1]} alt="product-pic2" onMouseOver={() => picSelect(2)} /> : null}
                {product.img && product.img[2] ? <img src={product.img[2]} id={pic[2]} alt="product-pic3" onMouseOver={() => picSelect(3)} /> : null}
                {product.img && product.img[3] ? <img src={product.img[3]} id={pic[3]} alt="product-pic4" onMouseOver={() => picSelect(4)} /> : null}
              </div>
            </div>
          </div>
          <div className="prod-details">
            <div className="header">
              <h1>{product.name}</h1>
              <p style={badgeStyle}>{(status === 0) ? "-" : (status === 1) ? "กำลังประมูล" : (status === 2) ? "จบการประมูล" : "N/A"}</p>
            </div>
            <div className="details">
              <div className="bid-info">
                <div className="time">
                  <h3><FaClock />&nbsp;{(status === 1) ? "เวลาที่เหลือ" : "หมดเวลาเมื่อ"}</h3>
                  <div className="time-wrap">
                    <h2><Moment interval={1000} fromNow >{product.timeoutdate + "T" + product.timeoutclock + "+0700"}</Moment></h2>
                    <p><Moment format={"DD MMMM YYYY HH:mm [น.]"}>{product.timeoutdate + "T" + product.timeoutclock + "+0700"}</Moment></p>
                  </div>
                </div>
                <div className="number">
                  <h3><IoMdPricetags />&nbsp;จำนวนการเคาะราคา</h3>
                  <div className="number-wrap">
                    <h2>{product.nbid} ครั้ง</h2>
                  </div>
                </div>
              </div>
              <div className="user-info">
                <div className="owner">
                  <h3><FaUserCircle />&nbsp;ผู้ลงประมูล</h3>
                  <div className="name-verify">
                    <div className="tooltip-wrap"><div className="tooltip"><MdVerifiedUser /><span id="verify">ได้รับการยืนยัน</span></div>&nbsp;<a id="owner" href="#">{product.owner}</a></div>
                  </div>
                </div>
                <div className="bidder">
                  <h3><FaUserCircle />&nbsp;ผู้เสนอราคาสูงสุด</h3>
                  <a id="bidder" href="#">{product.currentWinner?.name}</a>
                </div>
              </div>
              <div className="live-price">
                <h3>ราคาปัจจุบัน</h3>
                <h1>{formatter.format(product.price)} eCoin<button className="refresh" type="button" alt="Refresh" onClick={() => checkStatus()}><FaSyncAlt /></button></h1>
              </div>
            </div>
            <div className="btn-container">
              {/* <button type="button" className="love" onClick={() => toggleLove()}>{(love) ? (<FaHeart />) : (<FaRegHeart />)}&nbsp;เพิ่มในอยากได้</button> */}
              <button type="button" className="bid" onClick={() => onOpenModal()} disabled={disable || isOwner}>{isOwner ? "คุณเป็นเจ้าของสินค้านี้" : ((status === 1) ? "ประมูล" : "หมดเวลาแล้ว")}</button>
            </div>
          </div>
          <Modal open={modal} center={true} onClose={() => onCloseModal()}>
            <h1 id="bidmodal-head">เสนอราคาประมูล</h1>
            <p id="prodName">▸{product.name}</p>
            <div className="bid-form">
              <form name="bid-price" onSubmit={e => onOpenConfirm(e)}>
                <input name="bid-input" id="bid-price" type="number" placeholder="กรอกราคาที่มากกว่าราคาปัจจุบัน" min={product.price + 1} onInput={() => validateForm()} required />
                <p id="ecoin-alert">{(alert) ? "ยอดคงเหลือของท่านไม่พอ กรุณาเติมเงินก่อนเสนอราคา" : "เมื่อเสนอราคา eCoin ของท่านจะถูกกันไว้จนกว่าจะมีผู้เสนอราคาที่สูงกว่า"}</p>
                <div className="form-foot">
                  <div className="price-container">
                    <p id="price-tag">ราคาปัจจุบัน</p>
                    <h3 id="curPrice">
                      {formatter.format(product.price)} eCoin
                  <button className="refresh" type="button" alt="Refresh" onClick={() => checkStatus()}><FaSyncAlt /></button>
                    </h3>
                  </div>
                  <button id="bid" type="submit" className="btn" alt="เสนอราคา" disabled={btn && !disable} >เสนอราคา</button>
                </div>
              </form>
              <Modal open={confirm} center={true} showCloseIcon={false} closeOnEsc={false} closeOnOverlayClick={false} onClose={() => onCloseConfirm()} little>
                <h1 style={{ margin: 0 }}>ยืนยันการเสนอราคา</h1>
                <p id="price-confirm" >{(document.getElementById("bid-price")) ? "▸ " + formatter.format(document.getElementById("bid-price").value) : null} eCoin</p>
                <button id="bid-confirm" type="button" className="btn_c" alt="เสนอราคา" onClick={() => { onCloseModal(); payCoin() }}>ยืนยัน</button>
                <button id="bid-cancel" type="button" className="btn_s" alt="เสนอราคา" onClick={() => onCloseConfirm()}>ยกเลิก</button>
              </Modal>
            </div>
          </Modal>
        </div>
        <div className="description-container">
          <h1>รายละเอียดสินค้า</h1>
          <div className="content-desc">
            <p>{product.description}</p>
          </div>
        </div>
      </> : null}
    </div>
  )
}