import React from "react";
import { FaClock, FaUserCircle } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment/locale/th';

export const ProductFrame = ({ details }) => {
  const link = "/product?id=" + details.id
  var formatter = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
  });

  return (
    <Link to={link}>
    <div className="product-box">
      <div className="b-product-img">
        <img src={details.image} alt="product-img" />
      </div>
      <div className="b-details">
        <div className="b-product-title">
          {details.name}
      </div>
        <div className="b-product-description">
          <p id="time"><FaClock style={{ fontSize: 14 }}/>&nbsp;<Moment fromNow interval={1000} >{details.time}</Moment></p>
          <p id="num"><IoMdPricetags style={{ fontSize: 16 }}/>&nbsp;ประมูลแล้ว {details.nbid} ครั้ง</p>
          <p id="user"><FaUserCircle style={{ fontSize: 14 }}/>&nbsp;e_shop</p>
        </div>
        <div className="b-product-price">
            ฿{formatter.format(details.price)}
      </div>
      </div>
    </div>
    </Link>
  )
}