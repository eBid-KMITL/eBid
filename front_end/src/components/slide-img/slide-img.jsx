import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import bn1 from "../../assets/banner/welcome.gif";
import bn2 from "../../assets/banner/bn2.jpg";
import bn3 from "../../assets/banner/bn3.jpg";
import bn4 from "../../assets/banner/bn4.jpg";
import bn5 from "../../assets/banner/bn5.jpg";
import { Link } from "react-router-dom";
import { FaUserPlus, FaUsers, FaUserCheck, FaClock, FaBed } from "react-icons/fa";

const slideImages = [
  bn1, bn5, bn3, bn4, bn2
];

const properties = {
  duration: 15000,
  transitionDuration: 400,
  infinite: true,
  indicators: true,
  arrows: true
}

export const Slideshow = () => {
  const [covid, setCovid] = useState({});
  // const [error, setError] = useState(false);
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });
  async function fetchData() {
    const res = await fetch("https://covid19.th-stat.com/api/open/today");
    res
      .json()
      .then(res => setCovid(res))
    // .catch(err => setError(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="slide-container">
      <Slide {...properties}>
        <div className="each-slide">
          <Link to="/">
            <div className="videoWrap" style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
              {/* <iframe width="1100" height="230" src="https://www.youtube.com/embed/0S6pHex-KCo?version=3&loop=1&playlist=0S6pHex-KCo" frameborder="0" allow="accelerometer; loop; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            </div>
          </Link>
        </div>
        <div className="each-slide">
          <a href="https://covid19.th-stat.com/">
            {/* <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
            </div> */}
            <div className="covid-banner" style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
              <h1 style={{ color: "white" }}>จำนวนผู้ป่วย COVID-19 ในไทย</h1>
              <div className="item1">
                <div className="today">
                  <p><FaUsers />&nbsp;ยอดผู้ติดเชื่อรวม</p>
                  <h1 style={{ color: "white", fontSize: "32px" }}>{formatter.format(covid.Confirmed)}</h1>
                  <p><FaUserPlus />&nbsp;เพิ่ม {formatter.format(covid.NewConfirmed)} คน</p>
                  <p><FaClock />&nbsp;อัพเดทล่าสุด {covid.UpdateDate} น.</p>
                </div>
              </div>
              <div className="item2">
                <div className="treat">
                  <p><FaUserCheck />&nbsp;รักษาหายแล้ว</p>
                  <h1 style={{ color: "white", fontSize: "32px" }}>{formatter.format(covid.Recovered)}</h1>
                  <p>กำลังรักษา {covid.Hospitalized} คน</p>
                </div>
              </div>
              <div className="item3">
                <div className="death">
                  <p><FaBed />&nbsp;เสียชีวิตรวม</p>
                  <h1 style={{ color: "white", fontSize: "32px" }}>{formatter.format(covid.Deaths)}</h1>
                  {(covid.NewDeaths !== 0) ? (<p><FaUserPlus />&nbsp;เพิ่ม {formatter.format(covid.NewDeaths)} คน</p>) : (<p>ไม่มีผู้เสียชีวิตเพิ่ม</p>)}
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="each-slide">
          <Link to="/">
            <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
            </div>
          </Link>
        </div>
        <div className="each-slide">
          <Link to="/">
            <div style={{ 'backgroundImage': `url(${slideImages[3]})` }}>
            </div>
          </Link>
        </div>
        <div className="each-slide">
          <Link to="/">
            <div style={{ 'backgroundImage': `url(${slideImages[4]})` }}>
            </div>
          </Link>
        </div>
      </Slide>
    </div >
  )
}