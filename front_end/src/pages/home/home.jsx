import React from "react";
import { Slideshow, ProductFrame, CateBar } from "../../components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import p1 from "../../assets/products-pics/ip11.png"
import p2 from "../../assets/products-pics/macbook.png"
import p3 from "../../assets/products-pics/watch.jpg"
import p4 from "../../assets/products-pics/bag.jpg"

export const Home = () => {
  const details = [
    { name: "iPhone 11 64GB", price: 35800, owner: "e_shop", time:"2020-04-12T18:59+0700", nbid: 22, image: p1, id: 1 },
    { name: "MacBook Pro 16\"", price: 47100, owner: "e_shop", time:"2020-04-15T09:59+0700", nbid: 15, image: p2, id: 2 },
    { name: "VIGOROSO Watch", price: 7360, owner: "e_shop", time:"2020-04-16T11:59+0700", nbid: 9, image: p3, id: 3 },
    { name: "กระเป๋าหนังแท้ญี่ปุ่น", price: 1328, owner: "e_shop", time:"2020-04-09T14:59+0700", nbid: 4, image: p4, id: 4 },
    { name: "MacBook Pro 15\"", price: 47100, owner: "e_shop", time:"2020-04-22T22:59+0700", nbid: 21, image: p2, id: 5 },
  ]
  
  return (
    <div className="main">
      <Helmet><title>eBid - Online Bidding | Software Development Processes KMITL</title></Helmet>
      <div className="home-banner">
        <Slideshow />
      </div>
      <div className="home-container">
        <div className="home-left-bar" id>
          <CateBar />
        </div>
        <div className="home-content">
          <div className="content-hot">
            <h2 style={{ margin: 0, fontSize: 22 }}><span role="img" alt="fire">&nbsp;🔥</span> กำลังมาแรง!</h2>
            {details.map(detail => <ProductFrame details={detail} />)}
          </div>
          <div className="content-timeout">
            <h2 style={{ margin: 0, fontSize: 22 }}><span role="img" alt="clock">&nbsp;⏰</span> ใกล้หมดเวลาแล้ว!</h2>
            {details.map(detail => <ProductFrame details={detail} />)}
          </div>
        </div>
      </div>
    </div>
  )
}