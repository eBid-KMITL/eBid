import React from "react";
import { ProductDetail } from "../../components";
import MacBook from "../../assets/products-pics/macbook.png";
import iPhone from "../../assets/products-pics/ip11.png";
import Watch from "../../assets/products-pics/watch.jpg";
import { useState } from "react";

var maxPage = 1;

export const UserMyStatement = () => {
  const details = [
    {
      name: "MacBook Pro 16",
      owner: "admin_shop",
      time: "6 วัน 10:30:15",
      lastPrice: "37,650",
      myPrice: "36,750",
      status: "กำลังประมูล",
      image: MacBook,
    },
    {
      name: "iPhone 11 64GB",
      owner: "admin_shop",
      time: "จบแล้ว",
      lastPrice: "23,400",
      myPrice: "23,400",
      status: "ชนะ",
      image: iPhone,
    },
    {
      name: "นาฬิกา VIGOROSO",
      owner: "admin_shop",
      time: "จบแล้ว",
      lastPrice: "7,360",
      myPrice: "7,240",
      status: "แพ้",
      image: Watch,
    },
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
          {details.map((detail) => (
            <ProductDetail details={detail} />
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
