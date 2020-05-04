import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Modal from 'react-responsive-modal';
import './product.scss';
import { FaSyncAlt, FaClock, FaUserCircle, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import Moment from 'react-moment';
import firebase from "firebase";
import moment from "moment";
import db from "../../db/product.json";

export const Product = ({ userInfo }) => {
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
  const [alert, setAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [btn, setBTN] = useState(true);
  const [love, setLove] = useState(false);
  const [status, setStatus] = useState(db.status);
  const [disable, setDisable] = useState(true);
  const [pic, setPic] = useState(["hovered", "", "", ""]);
  const [bigImg, setBigImg] = useState(db.img[0]);
  const [now, setNow] = useState(moment().format("x")); //eslint-disable-next-line
  const [due, setDue] = useState(moment(prodEndTime, "YYYY-MM-DD HH:mm Z").format("x"));
  const [badgeStyle, setBadgeStyle] = useState({
    width: "fit-content",
    padding: "1px 5px",
    margin: 0,
    borderRadius: "5px",
    backgroundColor: "rgb(100, 100, 100)",
    color: "white",
    fontFamily: "Noto Sans Thai UI",
  })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    // const { name, price } = fetch(db);
    setPrice(price);
    setTitle(title);
    checkStatus();  //eslint-disable-next-line
  }, [price, title, now])
  useEffect(() => {
    if (now <= due) setTimeout(() => { setNow(parseInt(now) + 1000) }, 1000);
  }, [now, due])
  function onOpenModal() {
    if (firebase.auth().currentUser) {
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
  function toggleLove() {
    if (firebase.auth().currentUser) {
      if (love) {
        setLove(false);
      }
      else {
        setLove(true);
      }
    }
    else {
      history.push("/login?from=product?id=" + id);
    }
  }
  function checkStatus() {
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
      setBigImg(db.img[0]);
      setPic(["hovered", "", "", ""]);
    }
    else if (sel === 2) {
      setBigImg(db.img[1]);
      setPic(["", "hovered", "", ""]);
    }
    else if (sel === 3) {
      setBigImg(db.img[2]);
      setPic(["", "", "hovered", ""]);
    }
    else if (sel === 4) {
      setBigImg(db.img[3]);
      setPic(["", "", "", "hovered"]);
    }
  }
  function validateForm() {
    var input = document.forms["bid-price"]["bid-input"].value;
    if (input > price && input < userInfo.amount) {
      setBTN(false);
      setAlert(false);
    }
    else if (input > price && input > userInfo.amount) {
      setBTN(true);
      setAlert(true);
    }
    else {
      setBTN(true);
    }
  }

  return (
    <div className="product-main">
      <Helmet><title>{title} | eBid - Online Bidding</title></Helmet>
      <div className="breadcrums">
        <a href="/">eBid</a> ▸&nbsp;
        {(db.category === 1) ? (<><a href="/category?id=1">การ์ตูน</a> ▸&nbsp;</>)
          : (db.category === 2) ? (<><a href="/category?id=2">ของสะสม</a> ▸&nbsp;</>)
            : (db.category === 3) ? (<><a href="/category?id=3">ของเล่น | เกมส์</a> ▸&nbsp;</>)
              : (db.category === 4) ? (<><a href="/category?id=4">คอมพิวเตอร์ | โทรศัพท์มือถือ</a> ▸&nbsp;</>)
                : (db.category === 5) ? (<><a href="/category?id=5">หนังสือ | สิ่งพิมพ์</a> ▸&nbsp;</>)
                  : (db.category === 6) ? (<><a href="/category?id=6">แฟชั่น</a> ▸&nbsp;</>)
                    : (db.category === 7) ? (<><a href="/category?id=7">ภาพยนตร์ | วิดีโอ | ดีวีดี</a> ▸&nbsp;</>)
                      : (db.category === 8) ? (<><a href="/category?id=8">อิเล็กทรอนิกส์</a> ▸&nbsp;</>)
                        : ""
        }
        {title}
      </div>
      <div className="base-container">
        <div className="img-container">
          <div className="img-big">
            <img src={bigImg} alt="product-pic" />
          </div>
          <div className="img-small-cont">
            <div className="img-small">
              {db.img[0] ? <img src={db.img[0]} id={pic[0]} alt="product-pic1" onMouseOver={() => picSelect(1)} /> : null}
              {db.img[1] ? <img src={db.img[1]} id={pic[1]} alt="product-pic2" onMouseOver={() => picSelect(2)} /> : null}
              {db.img[2] ? <img src={db.img[2]} id={pic[2]} alt="product-pic3" onMouseOver={() => picSelect(3)} /> : null}
              {db.img[3] ? <img src={db.img[3]} id={pic[3]} alt="product-pic4" onMouseOver={() => picSelect(4)} /> : null}
            </div>
          </div>
        </div>
        <div className="prod-details">
          <div className="header">
            <h1>{title}</h1>
            <p style={badgeStyle}>{(status === 0) ? "-" : (status === 1) ? "กำลังประมูล" : (status === 2) ? "จบการประมูล" : "N/A"}</p>
          </div>
          <div className="details">
            <div className="bid-info">
              <div className="time">
                <h3><FaClock />&nbsp;{(status === 1) ? "เวลาที่เหลือ" : "หมดเวลาเมื่อ"}</h3>
                <div className="time-wrap">
                  <h2><Moment interval={1000} fromNow >{prodEndTime}</Moment></h2>
                  <p><Moment format={"DD MMMM YYYY HH:mm [น.]"}>{prodEndTime}</Moment></p>
                </div>
              </div>
              <div className="number">
                <h3><IoMdPricetags />&nbsp;จำนวนการเคาะราคา</h3>
                <div className="number-wrap">
                  <h2>{db.nbid} ครั้ง</h2>
                </div>
              </div>
            </div>
            <div className="user-info">
              <div className="owner">
                <h3><FaUserCircle />&nbsp;ผู้ลงประมูล</h3>
                <div className="name-verify">
                  <div className="tooltip-wrap"><div className="tooltip"><MdVerifiedUser /><span id="verify">ได้รับการยืนยัน</span></div>&nbsp;<a id="owner" href={"/profile?id=" + db.owner[0]}>{db.owner[1]}</a></div>
                </div>
              </div>
              <div className="bidder">
                <h3><FaUserCircle />&nbsp;ผู้เสนอราคาสูงสุด</h3>
                <a id="bidder" href={"/profile?id=" + db.bidder[0]}>{db.bidder[1]}</a>
              </div>
            </div>
            <div className="live-price">
              <h3>ราคาปัจจุบัน</h3>
              <h1>{formatter.format(price)} eCoin<button className="refresh" type="button" alt="Refresh" onClick={() => checkStatus()}><FaSyncAlt /></button></h1>
            </div>
          </div>
          <div className="btn-container">
            <button type="button" className="love" onClick={() => toggleLove()}>{(love) ? (<FaHeart />) : (<FaRegHeart />)}&nbsp;เพิ่มในอยากได้</button>
            <button type="button" className="bid" onClick={() => onOpenModal()} disabled={disable}>{(status === 1) ? "ประมูล" : "หมดเวลาแล้ว"}</button>
          </div>
        </div>
        <Modal open={modal} center={true} onClose={() => onCloseModal()}>
          <h1 id="bidmodal-head">เสนอราคาประมูล</h1>
          <p id="prodName">▸{title}</p>
          <div className="bid-form">
            <form name="bid-price" onSubmit={e => onOpenConfirm(e)}>
              <input name="bid-input" id="bid-price" type="number" placeholder="กรอกราคาที่มากกว่าราคาปัจจุบัน" min={price + 1} onInput={() => validateForm()} required />
              <p id="ecoin-alert">{ (alert) ? "ยอดคงเหลือของท่านไม่พอ กรุณาเติมเงินก่อนเสนอราคา" : "เมื่อเสนอราคา eCoin ของท่านจะถูกกันไว้จนกว่าจะมีผู้เสนอราคาที่สูงกว่า"}</p>
              <div className="form-foot">
                <div className="price-container">
                  <p id="price-tag">ราคาปัจจุบัน</p>
                  <h3 id="curPrice">
                    {formatter.format(price)} eCoin
                  <button className="refresh" type="button" alt="Refresh" onClick={() => checkStatus()}><FaSyncAlt /></button>
                  </h3>
                </div>
                <button id="bid" type="submit" className="btn" alt="เสนอราคา" disabled={btn && !disable} >เสนอราคา</button>
              </div>
            </form>
            <Modal open={confirm} center={true} showCloseIcon={false} closeOnEsc={false} closeOnOverlayClick={false} onClose={() => onCloseConfirm()} little>
              <h1 style={{ margin: 0 }}>ยืนยันการเสนอราคา</h1>
              <p id="price-confirm" >{(document.getElementById("bid-price")) ? "▸ " + formatter.format(document.getElementById("bid-price").value) : null} eCoin</p>
              <button id="bid-confirm" type="button" className="btn_c" alt="เสนอราคา" onClick={() => { onCloseModal(); }}>ยืนยัน</button>
              <button id="bid-cancel" type="button" className="btn_s" alt="เสนอราคา" onClick={() => onCloseConfirm()}>ยกเลิก</button>
            </Modal>
          </div>
        </Modal>
      </div>
      <div className="description-container">
        <h1>รายละเอียดสินค้า</h1>
        <div className="content-desc">
          <p>{db.description}</p>
        </div>
      </div>
    </div>
  )
}