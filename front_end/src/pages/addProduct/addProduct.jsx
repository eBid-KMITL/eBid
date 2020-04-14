import React from "react";
import ReactDOM from "react-dom";

export const AddProduct = () => {
  return (
    <div className="addProduct-main">
      <div className="addPicture-frame">
        <form>
          <input
            type="file"
            id="ProductPicture"
            name="ProductPicture"
            hidden="hidden"
          />
          <button type="button" id="select-button">
            +
          </button>
          <span id="custom-text">ยังไม่ได้เลือกรูป</span>
        </form>
      </div>
      <div className="addProduct-detail-box">
        <div className="addProduct-detail">
          <label>
            ชื่อสินค้า :{" "}
            <input
              type="text"
              placeholder="กรอกชื่อสินค้า"
              id="productName"
              name="productName"
              required
              minLength="5"
            />
          </label>
          <br />
          <label>
            ราคาเริ่มต้น :{" "}
            <input
              type="number"
              placeholder="กรอกราคาสินค้า"
              id="productStartPrice"
              name="productStartPrice"
            />
            eCoin
          </label>
          <br />
          <label>
            หมดเวลา :{" "}
            <input
              type="date"
              placeholder="กรอกราคาสินค้า"
              id="productTimeOut"
              name="productTimeOut"
            />
            <input type="time" id="productTimeOut2" name="productTimeOut2"/>
          </label>
          <br />
          <label>
            รายละเอียดสินค้า :
            <br />
            <textarea
              placeholder="กรอกชื่อสินค้า"
              id="productDetail"
              name="productDetail"
              required
              minLength="5"
            />
          </label>
          <button type="submit" className="btn">ยืนยันการลงประมูลสินค้า</button>
        </div>
      </div>
    </div>
  );
};
