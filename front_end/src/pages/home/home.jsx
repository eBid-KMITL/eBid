import React from "react";
import { NavBar, Slideshow, ProductFrame } from "../../components";
import p1 from "../../assets/products-pics/ip11.png"
import p2 from "../../assets/products-pics/macbook.png"
import p3 from "../../assets/products-pics/watch.jpg"
import p4 from "../../assets/products-pics/bag.jpg"

export const Home = () => {
  const details = [
    { name: "iPhone 11 64GB", price: "35,800", owner: "e_shop", time:"0d 17:12:33", nbid: 22, image: p1 },
    { name: "MacBook Pro 16\"", price: "47,100", owner: "e_shop", time:"3d 3:21:17", nbid: 15, image: p2 },
    { name: "นาฬิกา VIGOROSO", price: "7,360", owner: "e_shop", time:"0d 12:00:08", nbid: 9, image: p3 },
    { name: "กระเป๋าหนังแท้ญี่ปุ่น", price: "1,328", owner: "e_shop", time:"2d 12:12:33", nbid: 4, image: p4 },
    { name: "MacBook Pro 16\"", price: "47,100", owner: "e_shop", time:"2d 00:43:46", nbid: 21, image: p2 },
  ]
  
  return (
    <div className="main">
      
      <div className="home-banner">
        <Slideshow />
      </div>
      <div className="home-container">
        <div className="home-left-bar">
          <b style={{ fontSize: 22 }}>ประเภท</b>
          <ul>
          <li>การ์ตูน</li>
          <li>ของเล่น | เกมส์</li>
          <li>ของสะสม</li>
          <li>หนังสือ | สิ่งพิมพ์</li>
          <li>ภาพยนตร์ | วิดีโอ | ดีวีดี</li>
          <li>รถยนต์ | รถจักรยานยนต์</li>
          <li>สัตว์เลี้ยง</li>
          <li>อิเล็กทรอนิกส์</li>
          <li>ดูทั้งหมด</li></ul>
        </div>
        <div className="home-content">
          <div className="content-hot">
            <h2 style={{ margin: 0, fontSize: 22 }}><span role="img" alt="fire">🔥</span> กำลังมาแรง!</h2>
            {details.map(detail => <ProductFrame image={detail.image} details={detail} />)}
          </div>
          <div className="content-timeout">
            <h2 style={{ margin: 0, fontSize: 22 }}><span role="img" alt="clock">⏰</span> ใกล้หมดเวลาแล้ว!</h2>
            {details.map(detail => <ProductFrame image={detail.image} details={detail} />)}
          </div>
        </div>
      </div>
      <div className="home-footer">
        <p>©2020 eBid</p>
      </div>
    </div>
  )
}