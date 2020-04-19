import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Modal from 'react-responsive-modal';
import './product.scss';
import { FaSyncAlt, FaClock, FaUserCircle, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md"
import img1 from "../../assets/products-pics/pic-big/mac1.png";
import img2 from "../../assets/products-pics/pic-big/mac2.png";
import img3 from "../../assets/products-pics/pic-big/mac3.png";
import img4 from "../../assets/products-pics/pic-big/mac4.png";
import Moment from 'react-moment';
import firebase from "firebase"

export const Product = () => {
  // var product_id;
  var prodEndTime = "2020-04-15T20:18+0700";
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  const history = useHistory();
  const id = useQuery().get("id")
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState(9999);
  const [title, setTitle] = useState("ProductName");
  const [confirm, setConfirm] = useState(false);
  const [btn, setBTN] = useState(true);
  const [love, setLove] = useState(false);
  const [status, setStatus] = useState(2);
  const [pic, setPic] = useState(["hovered", "", "", ""]);
  const [bigImg, setBigImg] = useState(img1)
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
    // const { title, price } = fetch(product_id);
    setPrice(price);
    setTitle(title);
    setStatus(status);
    check();
  }, [price, title, status])
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
  function check() {
    if (status === 0) {
      setBadgeStyle({
        width: "fit-content",
        padding: "1px 5px",
        margin: 0,
        borderRadius: "5px",
        backgroundColor: "rgb(100, 100, 100)",
        color: "white",
        fontFamily: "Noto Sans Thai UI",
      })
    }
    else if (status === 1) {
      setBadgeStyle({
        width: "fit-content",
        padding: "1px 5px",
        margin: 0,
        borderRadius: "5px",
        backgroundColor: "rgb(45, 223, 0)",
        color: "white",
        fontFamily: "Noto Sans Thai UI",
      })
    }
    else if (status === 2) {
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
    // window.alert("status= " + status + " a= " + a + " price= " + price);
  }
  function picSelect(sel) {
    if (sel === 1) {
      setBigImg(img1);
      setPic(["hovered", "", "", ""]);
    }
    else if (sel === 2) {
      setBigImg(img2);
      setPic(["", "hovered", "", ""]);
    }
    else if (sel === 3) {
      setBigImg(img3);
      setPic(["", "", "hovered", ""]);
    }
    else if (sel === 4) {
      setBigImg(img4);
      setPic(["", "", "", "hovered"]);
    }
  }
  function validateForm() {
    var a = document.forms["bid-price"]["bid-input"].value;
    if (a > price) {
      setBTN(false);
    }
    else {
      setBTN(true);
    }
  }

  return (
    <div className="product-main">
      <Helmet><title>{title} | eBid - Online Bidding</title></Helmet>
      <div className="breadcrums"><a href="/">eBid</a> > <a href="/category?id=4">คอมพิวเตอร์ | โทรศัพท์มือถือ</a> > {title}</div>
      <div className="base-container">
        <div className="img-container">
          <div className="img-big">
            <img src={bigImg} alt="product-pic1" />
          </div>
          <div className="img-small-cont">
            <div className="img-small">
              <img src={img1} id={pic[0]} alt="product-pic1" onMouseOver={() => picSelect(1)} />
              <img src={img2} id={pic[1]} alt="product-pic2" onMouseOver={() => picSelect(2)} />
              <img src={img3} id={pic[2]} alt="product-pic3" onMouseOver={() => picSelect(3)} />
              <img src={img4} id={pic[3]} alt="product-pic4" onMouseOver={() => picSelect(4)} />
            </div>
          </div>
        </div>
        <div className="prod-details">
          <div className="header">
            <h1>{title}</h1>
            <p style={badgeStyle}>{(status === 0) ? "ยังไม่เปิดประมูล" : (status === 1) ? "กำลังประมูล" : (status === 2) ? "จบการประมูล" : "N/A"}</p>
          </div>
          <div className="details">
            <div className="bid-info">
              <div className="time">
                <h3><FaClock />&nbsp;หมดเวลา</h3>
                <div className="time-wrap">
                  <h2><Moment interval={1000} fromNow >{prodEndTime}</Moment></h2>
                </div>
              </div>
              <div className="number">
                <h3><IoMdPricetags />&nbsp;จำนวนการเคาะราคา</h3>
                <div className="number-wrap">
                  <h2>5 ครั้ง</h2>
                </div>
              </div>
            </div>
            <div className="user-info">
              <div className="owner">
                <h3><FaUserCircle />&nbsp;ผู้ลงประมูล</h3>
                <div className="name-verify">
                  <p><div className="tooltip"><MdVerifiedUser /><span id="verify">ได้รับการยืนยัน</span></div>&nbsp;<a id="owner" href="/">e_shop</a></p>
                </div>
              </div>
              <div className="bidder">
                <h3><FaUserCircle />&nbsp;ผู้เสนอราคาสูงสุด</h3>
                <a id="bidder" href="/">Book</a>
              </div>
            </div>
            <div className="live-price">
              <h3>ราคาปัจจุบัน</h3>
              <h1>{formatter.format(price)} eCoin<button className="refresh" type="button" alt="Refresh" onClick={() => check()}><FaSyncAlt /></button></h1>
            </div>
          </div>
          <div className="btn-container">
            <button type="button" className="love" onClick={() => toggleLove()}>{(love) ? (<FaHeart />) : (<FaRegHeart />)}&nbsp;เพิ่มในอยากได้</button>
            <button type="button" className="bid" onClick={() => onOpenModal()}>ประมูล</button>
          </div>
        </div>
        <Modal open={modal} center={true} onClose={() => onCloseModal()}>
          <h1 id="bidmodal-head">เสนอราคาประมูล</h1>
          <p id="prodName">▸{title}</p>
          <div className="bid-form">
            <form name="bid-price" onSubmit={e => onOpenConfirm(e)}>
              <input name="bid-input" id="bid-price" type="number" placeholder="กรอกราคาที่มากกว่าราคาปัจจุบัน" min={price + 1} onBlur={() => validateForm()} required />
              <p id="ecoin-alert">เมื่อเสนอราคา eCoin ของท่านจะถูกกันไว้จนกว่าจะมีผู้เสนอราคาที่สูงกว่า</p>
              <div className="form-foot">
                <div className="price-container">
                  <p id="price-tag">ราคาปัจจุบัน</p>
                  <h3 id="curPrice">
                    {formatter.format(price)} eCoin
                  <button className="refresh" type="button" alt="Refresh" onClick={() => check()}><FaSyncAlt /></button>
                  </h3>
                </div>
                <button id="bid" type="submit" className="btn" alt="เสนอราคา" disabled={btn} >เสนอราคา</button>
              </div>
            </form>
            <Modal open={confirm} center={true} showCloseIcon={false} closeOnEsc={false} closeOnOverlayClick={false} onClose={() => onCloseConfirm()} little>
              <h1>ยืนยันการเสนอราคา</h1>
              <button id="bid-confirm" type="submit" className="btn_c" alt="เสนอราคา" formTarget="hiddenFrame" onClick={() => onCloseModal()}>ยืนยัน</button>
              <button id="bid-cancel" type="button" className="btn_s" alt="เสนอราคา" formTarget="hiddenFrame" onClick={() => onCloseConfirm()}>ยกเลิก</button>
            </Modal>
          </div>
        </Modal>
      </div>
      <div className="description-container">
        <h1>รายละเอียดสินค้า</h1>
        <div className="content-desc">
          <p>
            1. แชเชือนสตูดิโอฟีเวอร์เนอะกุนซือ เนิร์สเซอรีเซ็กซ์ดีกรี เป็นไง แอลมอนด์ไวกิ้ง เอสเปรสโซเทวาไทม์ ซิตีแพ็คไฮเปอร์รัมไวกิ้ง ซีอีโอยากูซ่าสต็อกถูกต้องบ๊อกซ์ เธคเวิร์กวอล์กรามาธิบดี คูลเลอร์แดรี่พาสตาเอาต์ ซิงสวีทผลักดันจตุคามดีพาร์ทเมนท์ เยนคาสิโนพรีเมียมแตงโมซูเอี๋ย อพาร์ทเมนท์เอ็นเตอร์เทน เวอร์ซีเนียร์ รองรับหมั่นโถวดีพาร์ตเมนต์รันเวย์ไพลิน รามเทพทีวีแอดมิสชันออร์แกนิค ทับซ้อนฟลุต
            </p>
          <p>
            2. แจ๊กพ็อต วอฟเฟิลอุปสงค์แดรี่อพาร์ตเมนท์อิมพีเรียล แซ็กโซโฟนคอนแทค ฮาลาลเกสต์เฮาส์แฮนด์ รามเทพสกรัมมาร์จิน กลาสไอติม ดีลเลอร์ ปิกอัพ อัลตราคำตอบยากูซ่า เปียโน สุริยยาตรมะกัน ไวกิ้งโมเดลสติ๊กเกอร์คอนเซปต์ภควัทคีตา รีโมทนู้ดออร์แกนิกออเดอร์ฮากกา ปฏิสัมพันธ์บาบูนไอเดีย สันทนาการอพาร์ตเมนต์เนิร์สเซอรี่ เวิลด์จูนมินต์เคลื่อนย้าย
            </p>
          <p>
            3. เดี้ยงไคลแมกซ์คอนเซ็ปต์เอ็กซ์โป สเตอริโอไหร่เมจิควิน สุริยยาตร์ แอดมิชชั่น เลดี้ วอลนัทพรีเมียร์ เท็กซ์ บรรพชน รันเวย์คอรัปชั่นศิลปากร โบว์ลิ่ง ภควัมปติคำสาปบราคอนแท็ค เทป ออร์เดอร์ไมค์แฟ้บ แซ็กโซโฟนเพาเวอร์โดนัท เวอร์ สลัมออกแบบ
            </p>
          <p>
            4. สะบึมส์ดีพาร์ตเมนต์ซูชิผิดพลาด ออโต้วอล์กอาร์พีจี โปรอัลบั้มราชบัณฑิตยสถานบึ้ม โบว์ลิ่งดีพาร์ทเมนท์มลภาวะ โบกี้แหม็บ สตาร์นอร์ทรามาธิบดีแคมปัส วืดฮิปฮอป แคร์แครกเกอร์โรลออน ภารตะเอ็นทรานซ์แคป แรงใจฮิปฮอปไอเดียแซนด์วิชซิตี้ อีแต๋นตังค์ แฟ้บเพนกวินไบโอ นิวส์เทควันโดวินปอดแหกไรเฟิล โพสต์ เฟรม ควีนเอ๊าะสแควร์
            </p>
          <p>
            5. เรซินเวณิกาเอ๋อตะหงิดเย้ว ปาสกาลซิงอันตรกิริยา สเปก รีทัชรองรับว้อดก้าเวิร์คสารขัณฑ์ โค้กออร์แกนิคมอลล์เบิร์นเครป แฟล็ต โปรราเม็ง﻿กรรมาชน กิฟท์ไกด์ เอ็กซ์โปแฟล็ตแดนเซอร์เวิลด์ ครัวซองต์กระดี๊กระด๊าระโงกไฟลต์ มอคค่าทัวริสต์แคร็กเกอร์เคลียร์รีโมต ซิตี้เซ็นทรัลดยุคกระดี๊กระด๊าซีดาน การันตีปาสเตอร์มาม่าอริยสงฆ์ สตูดิโอโปรเจ็กต์โรลออนโบ้ย สติ๊กเกอร์เชอร์รี่สแตนดาร์ดแฟลชคอนแทค เกสต์เฮาส์แบนเนอร์พันธกิจ
            </p>
        </div>
      </div>
      <iframe title="hiddenFrame" name="hiddenFrame" width="0" height="0" border="0" style={{ display: "none" }}></iframe>
    </div>
  )
}