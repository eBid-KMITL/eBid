import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

export const ProductDetail = ({ details }) => {
  return (
    <tr>
      <td>
        <div className="productdetail-box">
          <div className="productdetail-img">
            <img src={details.image} />
          </div>
          <div className="productdetail">
            <div className="product-title">{details.name}</div>
            <div className="product-owner">
              <Link to="#">{details.owner}</Link>
            </div>
            <div>{details.time}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="status">{details.lastPrice}</div>
      </td>
      <td>
        <div className="status">{details.myPrice}</div>
      </td>
      <td>
        <div className="status">{details.status}</div>
      </td>
    </tr>
  );
};
