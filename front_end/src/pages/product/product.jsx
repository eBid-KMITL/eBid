import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import './product.scss';
import { FaSyncAlt } from 'react-icons/fa';

export const Product = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const id = useQuery().get("id")
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  function onOpenModal() {
    setModal(true);
  }
  function onCloseModal() {
    setModal(false);
    setConfirm(false);
  }
  function onOpenConfirm() {
    setConfirm(true);
  }
  function onCloseConfirm() {
    setConfirm(false);
  }
  function check() {
    window.alert("modal= " + modal + " confirm= " + confirm);
  }
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  var currentPrice = 9999;
  var placeholder = "กรอกราคาที่มากกว่า " + formatter.format(currentPrice);

  return (
    <div className="product-main">
      <div className="base-container">
        PRODUCT_PAGE_ID : {id}
        <button type="button" className="bid" onClick={() => onOpenModal()}>ประมูล</button>
        <Modal open={modal} center={true} onClose={() => onCloseModal()}>
          <h1>เสนอราคาประมูล</h1>
          <div className="bid-form">
            <form id="bid-price">
              <input id="bid-price" type="number" placeholder={placeholder} step="10" min={currentPrice + 1} required />
              <p id="ecoin-alert">เมื่อเสนอราคา eCoin ของท่านจะถูกกันไว้จนกว่าจะมีผู้เสนอราคาที่สูงกว่า</p>
              <div className="form-foot">
                <h3 id="curPrice">
                  ราคาปัจจุบัน : {formatter.format(currentPrice)} eCoin
                  <button className="refresh" type="button" alt="Refresh" onClick={() => check()}><FaSyncAlt /></button>
                </h3>
                <button id="bid" type="submit" className="btn" alt="เสนอราคา" formTarget="hiddenFrame" onClick={() => onOpenConfirm()} >เสนอราคา</button>
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