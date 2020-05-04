import React, { useState } from "react";
import logoID from "../../assets/eID.png";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { Helmet } from "react-helmet";
import Modal from 'react-responsive-modal';
import { FaExclamationCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Ellipsis } from 'react-spinners-css';

export const Register = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  function onRegister(e) {
    e.preventDefault();
    setLoading(true);
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      firebase.auth().currentUser.updateProfile({
        displayName: name
      })
      history.push('/login');
    })
      .catch(err => {
        setError(true);
        setLoading(false);
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
          <Link to="#" onClick={() => history.goBack()} style={{ display: "flex", alignItems: "center" }}>
            <IoIosArrowBack /> ย้อนกลับ
          </Link>
          <div className="image">
            <img src={logoID} alt="eID" />
          </div>
          <h1>สมัครสมาชิก</h1>
          {error ? (
            <p id="input-error"><FaExclamationCircle /> &nbsp;มีข้อผิดพลาด กุรณาตรวจสอบและลองอีกครั้ง</p>
          ) : (
              null
            )
          }
        </div>
        <div className="content">
          <div className="form-container">
            <form onSubmit={e => { onRegister(e) }}>
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
                <input type="password" name="Password" placeholder="กรอกรหัสผ่าน" required title="รหัสผ่านต้องประกอบไปด้วยตัวอักษรภาษาอังกฤษและตัวเลขรวมกัน 8 ตัวขึ้นไป โดยมีตัวพิมพ์ใหญ่และตัวเลขอย่างน้อยอย่างละ 1 ตัว"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" value={password} onChange={e => setPassword(e.target.value)} />
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
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? <Ellipsis color="white" size={40} /> : "สมัครสมาชิก"}
                </button>
              </div>
            </form>
          </div>
          <Modal open={terms} center={true} onClose={() => onCloseTerms()} little>
            <h1>ข้อตกลงและเงื่อนไข</h1>
            <p>
              1. เว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาเท่านั้น ไม่ได้มีการนำไปใช้จริงในเชิงพาณิชย์
            </p>
            <p>
              2. เว็บไซต์นี้จะเก็บข้อมูลในการลงทะเบียนของคุณไว้ในระบบลงทะเบียนเพื่อยืนยันตัวตนเข้าใช้งานเท่านั้น
            </p>
            <p>
              3. การประมูลในเว็บไซต์นี้เป็นการจำลองการทำงานของระบบเท่านั้น ไม่สามารถประมูลซื้อขายได้จริง
            </p>
            <p>
              4. ไม่สามารถนำเงินจริงเข้าระบบได้ เงินในระบบเป็นเงินใช้เพื่อการจำลองการทำงานเท่านั้น
            </p>
            <p>
              5. ผู้จัดทำจะไม่รับผิดชอบความเสียหายใดๆ กรณีเกิดข้อผิดพลาดจากระบบจำลองนี้
            </p>
            <button className="btn" id="close-terms" type="button" onClick={() => onCloseTerms()}>ปิด</button>
          </Modal>
        </div>
      </div>
    </div>
  )
}