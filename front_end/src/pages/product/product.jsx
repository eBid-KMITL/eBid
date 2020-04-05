import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Modal from 'react-responsive-modal';
import './product.scss';
import { FaSyncAlt, FaClock, FaUserCircle } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import img1 from "../../assets/products-pics/pic-big/mac1.png";
import img2 from "../../assets/products-pics/pic-big/mac2.png";
import img3 from "../../assets/products-pics/pic-big/mac3.png";
import img4 from "../../assets/products-pics/pic-big/mac4.png";
import Moment from 'react-moment';
import firebase from "firebase"

export const Product = () => {
  var currentPrice = 47810;
  var prodName = "MacBook Pro 16\"";
  var prodEndTime = "2020-04-15T20:18+0700";
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  const id = useQuery().get("id")
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [btn, setBTN] = useState(true);
  function onOpenModal() {
    if (firebase.auth().currentUser) {
      setModal(true);
    }
    else {
      window.location = "/login?to=product?id=" + id;
    }
  }
  function onCloseModal() {
    setModal(false);
    setConfirm(false);
    setBTN(true);
  }
  function onOpenConfirm() {
    setConfirm(true);
  }
  function onCloseConfirm() {
    setConfirm(false);
  }
  function check() {
    currentPrice = currentPrice + 1;
    window.alert("modal= " + modal + " confirm= " + confirm + " price= " + currentPrice);
  }
  function validateForm() {
    var a = document.forms["bid-price"]["bid-input"].value;
    if (a >= currentPrice) {
      setBTN(false);
    }
    else {
      setBTN(true);
    }
  }

  return (
    <div className="product-main">
      <Helmet><title>{prodName} | eBid - Online Bidding</title></Helmet>
      <div className="breadcrums"><a href="/">eBid</a> > <a href="/category?id=4">คอมพิวเตอร์ | โทรศัพท์มือถือ</a> > {prodName}</div>
      <div className="base-container">
        <div className="img-container">
          <div className="img-big">
            <img src={img1} alt="product-pic1" />
          </div>
          <div className="img-small-cont">
            <div className="img-small">
              <img src={img1} alt="product-pic1" />
              <img src={img2} alt="product-pic2" />
              <img src={img3} alt="product-pic3" />
              <img src={img4} alt="product-pic4" />
            </div>
          </div>
        </div>
        <div className="prod-details">
          <div className="header">
            <h1>{prodName}</h1>
            <p id="status-badge">กำลังประมูล</p>
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
                <p>e_shop</p>
              </div>
              <div className="bidder">
                <h3><FaUserCircle />&nbsp;ผู้เสนอราคาสูงสุด</h3>
                <p>Book</p>
              </div>
            </div>
            <div className="live-price">
              <h3>ราคาปัจจุบัน</h3>
              <h1>{formatter.format(currentPrice)} eCoin</h1>
            </div>
          </div>
          <div className="btn-container">
            <button type="button" className="love" >อยากได้</button>
            <button type="button" className="bid" onClick={() => onOpenModal()}>ประมูล</button>
          </div>
        </div>
        <Modal open={modal} center={true} onClose={() => onCloseModal()}>
          <h1 id="bidmodal-head">เสนอราคาประมูล</h1>
          <p id="prodName">{prodName}</p>
          <div className="bid-form">
            <form name="bid-price">
              <input name="bid-input" id="bid-price" type="number" placeholder="กรอกราคาที่มากกว่าราคาปัจจุบัน" min={currentPrice + 1} onBlur={() => validateForm()} required />
              <p id="ecoin-alert">เมื่อเสนอราคา eCoin ของท่านจะถูกกันไว้จนกว่าจะมีผู้เสนอราคาที่สูงกว่า</p>
              <div className="form-foot">
                <h3 id="curPrice">
                  ราคาปัจจุบัน : {formatter.format(currentPrice)} eCoin
                  <button className="refresh" type="button" alt="Refresh" onClick={() => check()}><FaSyncAlt /></button>
                </h3>
                <button id="bid" type="submit" className="btn" alt="เสนอราคา" formTarget="hiddenFrame" onClick={() => onOpenConfirm()} disabled={btn} >เสนอราคา</button>
              </div>
            </form>
            <Modal open={confirm} center={true} showCloseIcon={false} closeOnEsc={false} closeOnOverlayClick={false} onClose={() => onCloseConfirm()} little>
              <h1>ยืนยันเสนอราคา ?</h1>
              <button id="bid-confirm" type="submit" className="btn_c" alt="เสนอราคา" formTarget="hiddenFrame" onClick={() => onCloseModal()}>ยืนยัน</button>
              <button id="bid-cancel" type="button" className="btn_s" alt="เสนอราคา" formTarget="hiddenFrame" onClick={() => onCloseConfirm()}>ยกเลิก</button>
            </Modal>
          </div>
        </Modal>
      </div>
      <iframe title="hiddenFrame" name="hiddenFrame" width="0" height="0" border="0" style={{ display: "none" }}></iframe>
    </div>
  )
}