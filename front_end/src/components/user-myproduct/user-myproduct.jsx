import React from "react";
import { MyProductDetail } from "../../components";
import MacBook from "../../assets/products-pics/macbook.png";
import iPhone from "../../assets/products-pics/ip11.png";
import Watch from "../../assets/products-pics/watch.jpg";
import Bag from "../../assets/products-pics/bag.jpg";
import { useState } from "react";

var maxPage = 3;

export const UserMyProduct = () => {

  const details = [
    {
      name: "MacBook Pro 16",
      highest: "user101",
      time: "6 วัน 10:30:15",
      lastPrice: "37,650",
      status: "กำลังประมูล",
      image: MacBook
    },
    {
      name: "iPhone 11 64GB",
      highest: "admin_shop",
      time: "จบแล้ว",
      lastPrice: "23,400",
      status: "เสร็จสิ้น",
      image: iPhone
    },
    {
      name: "กระเป๋าหนังแท้ญี่ปุ่น",
      highest: "guest",
      time: "0 วัน 12:00:08",
      lastPrice: "1,328",
      status: "กำลังประมูล",
      image: Bag
    },
    {
      name: "นาฬิกา VIGOROSO",
      highest: "admin_shop",
      time: "จบแล้ว",
      lastPrice: "7,360",
      status: "เสร็จสิ้น",
      image: Watch
    }
  ];

  const [state,setState] = useState({page : 1});

  const addPage = () => {
    setState({
      page : state.page + 1
    });
  }

  const minPage = () => {
    setState({
      page : state.page - 1
    });
  }

  return (
    <div className="myproduct-box">
      <h>สินค้าของฉัน</h>
      <div className="mystatement-table">
        <table>
          <tr>
            <th>รายการ</th>
            <th>ราคาปัจจุบัน</th>
            <th>สถานะการประมูล</th>
            <th>ผู้เสนอราคาสูงสุด</th>
          </tr>
          {details.map(detail => (
            <MyProductDetail details={detail} />
          ))}
        </table>
      </div>
      <div className="page">
        <button type="button" className={state.page === 1 ? "btnClose" : "btn"} onClick={minPage}>&lt;</button>หน้า {state.page} จาก {maxPage}
        <button type="button" className={state.page === maxPage ? "btnClose" : "btn"} onClick={addPage}>&gt;</button>
      </div>
    </div>
  );
};
