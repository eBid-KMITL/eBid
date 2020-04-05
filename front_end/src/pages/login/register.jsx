import React, { useState } from "react";
import logoID from "../../assets/eID.png";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Helmet } from "react-helmet";
import Modal from 'react-responsive-modal';

export const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  function onRegister() {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      firebase.auth().currentUser.updateProfile({
        displayName: name
      })
      alert('Register Completed')
      history.replace('/login')
    })
      .catch(err => {
        alert(err);
      });
  }
  function onOpenTerms() {
    setTerms(true);
  }
  function onCloseTerms() {
    setTerms(false);
  }

  return (
    <div className="login-page">
      <Helmet><title>Register | eBid</title></Helmet>
      <div className="base-container">
        <div className="header">
          <Link to="/">
            ﹤ กลับหน้าหลัก
          </Link>
          <div className="image">
            <img src={logoID} alt="eID" />
          </div>
          <div align="right"><h1>สมัครสมาชิก</h1></div>
        </div>
        <div className="content">
          <div className="form-container">
            <form action="">
              <div className="form-group">
                <label htmlFor="username">ชื่อผู้ใช้</label>
                <input type="text" name="Username" placeholder="กรอกชื่อผู้ใช้" required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">อีเมล</label>
                <input type="email" name="Email" placeholder="กรอกอีเมล" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input type="password" name="Password" placeholder="กรอกรหัสผ่าน" required minLength="8" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="extra">
                <p><input type="checkbox" required />ฉันยอมรับ <a href="/register#" onClick={() => onOpenTerms()}>ข้อตกลงและเงื่อนไข</a></p>
              </div>
              <div className="button-wrapper">
                <Link to="/login">
                  <button type="button" className="btn_s">
                    <u>ลงชื่อเข้าใช้</u>
                  </button>
                </Link>
                <button type="submit" className="btn" formTarget="hiddenFrame"
                  onClick={onRegister}
                >
                  สมัครสมาชิก
          </button>
              </div>
            </form>
          </div>
          <Modal open={terms} center={true} onClose={() => onCloseTerms()} little>
            <h1>ข้อตกลงและเงื่อนไข</h1>
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
            <button className="btn" id="close-terms" type="button" onClick={() => onCloseTerms()}>ปิด</button>
          </Modal>
          <iframe title="hiddenFrame" name="hiddenFrame" width="0" height="0" border="0" style={{ display: "none" }}></iframe>
        </div>
      </div>
    </div>
  )
}