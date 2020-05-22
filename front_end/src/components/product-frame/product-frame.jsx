import React from "react";
import { FaClock, FaUserCircle } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment/locale/th';
import moment from "moment";

export const ProductFrame = ({ details }) => {
  const link = "/product?id=" + details.id
  var formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });

  return (
    <Link to={link}>
      <div className="product-box">
        <div className="b-product-img" title={details.name} style={{ 'backgroundImage': `url(${details.img})` }}>
          {/* <img src={details.img[0]} alt="product-img" /> */}
        </div>
        <div className="b-details">
          <div className="b-product-title" title={details.name}>
            {details.name}
          </div>
          <div className="b-product-description">
            <p id="time" title={moment(details.time, "YYYY-MM-DD HH:mm Z").format("D MMMM YYYY HH:mm [น.]")}>
              <FaClock title="เวลาที่เหลือ" style={{ fontSize: 14 }} />&nbsp;<Moment fromNow interval={1000} >{details.time}</Moment>
            </p>
            <p id="num"><IoMdPricetags title="จำนวนการเคาะ" style={{ fontSize: 16 }} />&nbsp;ประมูลแล้ว {details.nbid} ครั้ง</p>
            <p id="user"><FaUserCircle title="ผู้ลงประมูล" style={{ fontSize: 14 }} />&nbsp;{details.owner}</p>
          </div>
          <div className="b-product-price">
            ฿{formatter.format(details.price)}
          </div>
        </div>
      </div>
    </Link>
  )
}