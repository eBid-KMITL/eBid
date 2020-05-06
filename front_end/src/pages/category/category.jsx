import React, { useState, useEffect } from "react";
import { ProductFrame, CateBar } from "../../components";
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import c1 from "../../db/db_c1.json";
import firebase from 'firebase'
import { Ellipsis } from 'react-spinners-css';

export const Category = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const id = useQuery().get("id");
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
                loading &&
                <>
                  <div className="loading" style={{
                    position: "absolute", top: "45%", left: "60%", transform: "translate(-50%, -50%)",
                  }}>
                    <Ellipsis color="orange" size={150} />
                  </div>
                </>
          }

            {
              (id === "1") ? (
                <><h2><span role="img" aria-label="cartoon">&nbsp;🎭</span> การ์ตูน</h2>
                  {product?.length != 0 ? product.filter(ele => ele.category === 1 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />) : !loading ? "ยังไม่มีสินค้าในหมวดหมู่นี้" : null}
                </>
              )
                : (id === "2") ? (
                  <><h2><span role="img" aria-label="crown">&nbsp;👑</span> ของสะสม</h2>
                    {product?.length != 0 ? product.filter(ele => ele.category === 2 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />) :!loading ? "ยังไม่มีสินค้าในหมวดหมู่นี้" : null}</>
                )
                  : (id === "3") ? (
                    <><h2><span role="img" aria-label="joystick">&nbsp;🎮</span> ของเล่น | เกมส์</h2>
                      {product?.length != 0 ? product.filter(ele => ele.category === 3 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />) : !loading ? "ยังไม่มีสินค้าในหมวดหมู่นี้" : null}</>
                  )
                    : (id === "4") ? (
                      <><h2><span role="img" aria-label="laptop">&nbsp;💻</span> คอมพิวเตอร์ | โทรศัพท์มือถือ</h2>
                        {product?.length != 0 ? product.filter(ele => ele.category === 4 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />) : !loading ? "ยังไม่มีสินค้าในหมวดหมู่นี้" : null}</>
                    )
                      : (id === "5") ? (
                        <><h2><span role="img" aria-label="books">&nbsp;📚</span> หนังสือ | สิ่งพิมพ์</h2>
                          {product?.length != 0 ? product.filter(ele => ele.category === 5 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />) : !loading ? "ยังไม่มีสินค้าในหมวดหมู่นี้" : null}</>
                      )
                        : (id === "6") ? (
                          <><h2><span role="img" aria-label="fashion">&nbsp;👜</span> แฟชั่น</h2>
                            {product?.length != 0 ? product.filter(ele => ele.category === 6 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />) : !loading ? "ยังไม่มีสินค้าในหมวดหมู่นี้" : null}</>
                        )
                          : (id === "7") ? (
                            <><h2><span role="img" aria-label="dog">&nbsp;🎬</span> ภาพยนตร์ | วิดีโอ | ดีวีดี</h2>
                              {product?.length != 0 ? product.filter(ele => ele.category === 7 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />) : !loading ? "ยังไม่มีสินค้าในหมวดหมู่นี้" : null}</>
                          )
                            : (id === "8") ? (
                              <><h2><span role="img" aria-label="tv">&nbsp;📺</span> อิเล็กทรอนิกส์</h2>
                                {product?.filter(ele => ele.category === 8).length != 0 ? product.filter(ele => ele.category === 8 && new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />) : !loading ? "ยังไม่มีสินค้าในหมวดหมู่นี้" : null}</>
                            )
                              : (id === "9") ? (
                                <><h2>&nbsp;สินค้าทั้งหมด</h2>
                                  {product?.length != 0 ? product.filter(ele => new Date(ele.timeoutdate + "T" + ele.timeoutclock + "+0700") > Date.now()).map((d, index) => <ProductFrame details={d} key={index} />) : !loading ? "ยังไม่มีสินค้าในหมวดหมู่นี้" : null}
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