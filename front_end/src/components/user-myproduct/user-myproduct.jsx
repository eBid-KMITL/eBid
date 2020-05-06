import React, { useState, useEffect } from "react";
import { MyProductDetail } from "../../components";
import MacBook from "../../assets/products-pics/macbook.png";
import iPhone from "../../assets/products-pics/ip11.png";
import Watch from "../../assets/products-pics/watch.jpg";
import Bag from "../../assets/products-pics/bag.jpg";
import firebase from 'firebase'
var maxPage = 3;

export const UserMyProduct = ({ userData }) => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

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
  const [product, setProduct] = useState([]);
  let pd = []
  useEffect(() => {
    firebase.firestore().collection('Product').onSnapshot(snapshot => {
      // console.log('snap of Product')
      pd = []
      snapshot.forEach(doc => {
        var pData = doc.data()
        pData.pid = doc.id
        pd.push(pData)
      })
      setProduct(pd)
    })
  }, [])
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
            <th>สถานะปัจจุบัน</th>
            <th>ผู้เสนอราคาสูงสุด</th>
          </tr>
          {product.filter(ele => ele.ownerid === userData.uid).map(detail => (
            <MyProductDetail details={detail} />
          ))}
        </table>
      </div>
    </div>
  );
};
