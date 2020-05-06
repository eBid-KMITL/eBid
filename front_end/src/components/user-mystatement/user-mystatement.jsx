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
