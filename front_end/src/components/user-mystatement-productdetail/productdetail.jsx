import React from "react";
import { Link } from "react-router-dom";

export const ProductDetail = ({ details }) => {
  return (
    <tr>
      <td>
        <div className="productdetail-box">
          <div className="productdetail-img">
            <img src={details.image } alt="statement-pic" className="prod-pic"/>
          </div>
          <div className="productdetail">
            <div className="product-title">{details.name}</div>
            <div className="product-owner">
              <Link to="#">{details.owner}</Link>
            </div>
            <div className={details.time==="จบแล้ว" ? "end" : "notend"}>{details.time}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="status">{details.lastPrice}</div>
      </td>
      <td>
        <div className={ details.lastPrice === details.myPrice ? 'winstatus' : 'losestatus' }>{details.myPrice}</div>
      </td>
      <td>
        <div className={`status ${details.status === "ชนะ" ? "winstatus" : ""} ${details.status === "แพ้" ? "losestatus" : ""}`}>{details.status}</div>
      </td>
    </tr>
  );
};
