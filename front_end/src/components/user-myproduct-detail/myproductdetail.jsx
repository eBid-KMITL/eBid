import React from "react";
import { Link } from "react-router-dom";

export const MyProductDetail = ({ details }) => {
  return (
    <tr>
      <td>
        <div className="productdetail-box">
          <div className="productdetail-img">
            <img src={details.image} alt="product-pic" className="prod-pic"/>
          </div>
          <div className="productdetail">
            <div className="product-title">{details.name}</div>
            <div className={details.time==="จบแล้ว" ? "end" : "notend"}>{details.time}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="status">{details.lastPrice}</div>
      </td>
      <td>
        <div className={details.status==="เสร็จสิ้น" ? "endstatus" : "status"}>{details.status}</div>
      </td>
      <td>
        <div className="product-owner">
          <Link to="#">{details.highest}</Link>
        </div>
      </td>
    </tr>
  );
};
