import React, { useState, useEffect } from "react";
import { ProductFrame, CateBar } from "../../components";
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
// import p1 from "../../assets/products-pics/ip11.png"
// import p2 from "../../assets/products-pics/macbook.png"
import c1 from "../../db/db_c1.json";
// import c2 from "../../db/db_c2.json";
// import c3 from "../../db/db_c3.json";
// import c4 from "../../db/db_c4.json";
// import c5 from "../../db/db_c5.json";
// import c6 from "../../db/db_c6.json";
// import c7 from "../../db/db_c7.json";
// import c8 from "../../db/db_c8.json";
import firebase from 'firebase'


export const Category = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const id = useQuery().get("id");
  // const details = [
  //   { name: "iPhone 11 64GB", price: 35800, owner: "e_shop", time: "2020-04-12T18:59+0700", nbid: 22, img: p1, id: 1 },
  //   { name: "MacBook Pro 16\"", price: 47100, owner: "e_shop", time: "2020-04-15T09:59+0700", nbid: 15, img: p2, id: 2 },
  //   { name: "MacBook Pro 15\"", price: 47100, owner: "e_shop", time: "2020-04-22T22:59+0700", nbid: 21, img: p2, id: 5 },
  // ]
  // const category = db.filter(d => d.category == id);
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

  return (
    <div className="category-main">
      <Helmet><title>eBid - Online Bidding | Software Development Processes KMITL</title></Helmet>
      <div className="category-container">
        <div className="category-left-bar">
          <CateBar sel={id} />
        </div>
        <div className="category-content">
          <div className="content-hot">
            {
              (id === "1") ? (
                <><h2><span role="img" aria-label="cartoon">&nbsp;🎭</span> การ์ตูน</h2>
                  {product.filter(ele => ele.category === 1 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />)}
                  {/* {c1.map((d, index) => <ProductFrame details={d} key={index} />)} */}
                </>
              )
                : (id === "2") ? (
                  <><h2><span role="img" aria-label="crown">&nbsp;👑</span> ของสะสม</h2>
                    {product.filter(ele => ele.category === 2 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />)}</>
                )
                  : (id === "3") ? (
                    <><h2><span role="img" aria-label="joystick">&nbsp;🎮</span> ของเล่น | เกมส์</h2>
                      {product.filter(ele => ele.category === 3 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />)}</>
                  )
                    : (id === "4") ? (
                      <><h2><span role="img" aria-label="laptop">&nbsp;💻</span> คอมพิวเตอร์ | โทรศัพท์มือถือ</h2>
                        {product.filter(ele => ele.category === 4 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />)}</>
                    )
                      : (id === "5") ? (
                        <><h2><span role="img" aria-label="books">&nbsp;📚</span> หนังสือ | สิ่งพิมพ์</h2>
                          {product.filter(ele => ele.category === 5 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />)}</>
                      )
                        : (id === "6") ? (
                          <><h2><span role="img" aria-label="fashion">&nbsp;👜</span> แฟชั่น</h2>
                            {product.filter(ele => ele.category === 6 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />)}</>
                        )
                          : (id === "7") ? (
                            <><h2><span role="img" aria-label="dog">&nbsp;🎬</span> ภาพยนตร์ | วิดีโอ | ดีวีดี</h2>
                              {product.filter(ele => ele.category === 7 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />)}</>
                          )
                            : (id === "8") ? (
                              <><h2><span role="img" aria-label="tv">&nbsp;📺</span> อิเล็กทรอนิกส์</h2>
                                {product.filter(ele => ele.category === 8 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />)}</>
                            )
                              : (id === "9") ? (
                                <><h2>&nbsp;สินค้าทั้งหมด</h2>
                                  {product.filter(ele => new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />)}
                                </>
                              )
                                : history.push("/error")
            }
          </div>
        </div>
      </div>
    </div>
  )
}