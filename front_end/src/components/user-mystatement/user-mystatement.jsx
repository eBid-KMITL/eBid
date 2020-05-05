import React, { useState, useEffect } from "react";
import { ProductDetail } from "../../components";
import MacBook from "../../assets/products-pics/macbook.png";
import iPhone from "../../assets/products-pics/ip11.png";
import Watch from "../../assets/products-pics/watch.jpg";
import firebase from 'firebase'
var maxPage = 1;

export const UserMyStatement = ({ userData }) => {
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

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

  const [product, setProduct] = useState([]);
  let pd = []
  useEffect(() => {
    firebase.firestore().collection('Product').onSnapshot(snapshot => {
      console.log('snap of Product')
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
    <div className="mystatement-box">
      <h>การประมูลของฉัน</h>
      <div className="mystatement-table">
        <table>
          <tr>
            <th>รายการ</th>
            <th>ราคาปัจจุบัน</th>
            <th>สถานะปัจจุบัน</th>
            <th>สถานะการประมูล</th>
          </tr>
          {product.filter(ele => ele.bidder.some(ele2=>ele2.uid === userData.uid)).map(detail => (
            <ProductDetail details={detail} userData={userData}/>
          ))}
        </table>
      </div>
    </div>
  );
};
