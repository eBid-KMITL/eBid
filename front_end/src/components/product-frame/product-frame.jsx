import React from "react";
import { FaHammer, FaClock, FaUserCircle } from "react-icons/fa";

export const ProductFrame = ({ image, details }) => {
  return (
    <div className="product-box">
      <div className="b-product-img">
        <img src={image} />
      </div>
      <div className="b-details">
        <div className="b-product-title">
          {details.name}
      </div>
        <div className="b-product-description">
          <FaClock /> {details.time}<br />
          <FaHammer /> ประมูลแล้ว {details.nbid} ครั้ง<br />
          <FaUserCircle /> e_shop<br />
        </div>
        <div className="b-product-price">
          {details.price}
      </div>
      </div>
    </div>
  )
}