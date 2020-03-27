import React from "react";
import { ProductDetail } from "../../components";
import MacBook from "../../assets/products-pics/macbook.png";
import iPhone from "../../assets/products-pics/ip11.png";
import Watch from "../../assets/products-pics/watch.jpg";
import "./style.scss";

export const UserMyStatement = () => {
  const details = [
    {
      name: "MacBook Pro 16",
      owner: "admin_shop",
      time: "6 วัน 10:30:15",
      lastPrice: "37,650",
      myPrice: "36,750",
      status: "กำลังประมูล",
      image: MacBook
    },
    {
      name: "iPhone 11 64GB",
      owner: "admin_shop",
      time: "จบแล้ว",
      lastPrice: "23,400",
      myPrice: "23,400",
      status: "ชนะ",
      image: iPhone
    },
    {
      name: "MacBook Pro 16",
      owner: "admin_shop",
      time: "0 วัน 12:00:08",
      lastPrice: "47,100",
      myPrice: "45,750",
      status: "กำลังประมูล",
      image: MacBook
    },
    {
      name: "นาฬิกา VIGOROSO",
      owner: "admin_shop",
      time: "จบแล้ว",
      lastPrice: "7,360",
      myPrice: "7,240",
      status: "แพ้",
      image: Watch
    }
  ];

  return (
    <div className="mystatement-box">
      <h>การซื้อของฉัน</h>
      <div className="mystatement-table">
        <table>
          <tr>
            <th>รายการ</th>
            <th>ราคาปัจจุบัน</th>
            <th>ราคาที่เสนอไว้</th>
            <th>สถานะการประมูล</th>
          </tr>
          {details.map(detail => (
            <ProductDetail details={detail} />
          ))}
        </table>
      </div>
    </div>
  );
};
