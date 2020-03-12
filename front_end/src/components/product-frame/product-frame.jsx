import React from "react";
import { FaClock, FaUserCircle } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io"

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
          <FaClock style={{ fontSize: 14 }}/> {details.time}<br />
          <IoMdPricetags style={{ fontSize: 14 }}/> ประมูลแล้ว {details.nbid} ครั้ง<br />
          <FaUserCircle style={{ fontSize: 14 }}/> e_shop<br />
        </div>
        <div className="b-product-price">
            ฿{details.price}
      </div>
      </div>
    </div>
  )
}