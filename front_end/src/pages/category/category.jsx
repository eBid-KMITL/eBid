import React from "react";
import { ProductFrame } from "../../components";
import p1 from "../../assets/products-pics/ip11.png"
import p2 from "../../assets/products-pics/macbook.png"

export const Category = () => {
  const details = [
    { name: "iPhone 11 64GB", price: 35800, owner: "e_shop", time:"0d 17:12:33", nbid: 22, image: p1, id: 1 },
    { name: "MacBook Pro 16\"", price: 47100, owner: "e_shop", time:"3d 3:21:17", nbid: 15, image: p2, id: 2 },
    { name: "MacBook Pro 15\"", price: 47100, owner: "e_shop", time:"2d 00:43:46", nbid: 21, image: p2, id: 5 },
  ]

  return (
    <div className="category-main">
      <div className="category-container">
        <div className="category-left-bar">
          <b style={{ fontSize: 22 }}>ประเภท</b>
          <ul>
          <li>การ์ตูน</li>
          <li>ของสะสม</li>
          <li>ของเล่น | เกมส์</li>
          <li>คอมพิวเตอร์ | โทรศัพท์มือถือ</li>
          <li>หนังสือ | สิ่งพิมพ์</li>
          <li>ภาพยนตร์ | วิดีโอ | ดีวีดี</li>
          <li>สัตว์เลี้ยง</li>
          <li>อิเล็กทรอนิกส์</li>
          <li>ดูทั้งหมด</li></ul>
        </div>
        <div className="category-content">
          <div className="content-hot">
            <h2 style={{ margin: 0, fontSize: 22 }}><span role="img" alt="laptop">💻</span> คอมพิวเตอร์ | โทรศัพท์มือถือ</h2>
            {details.map(detail => <ProductFrame image={detail.image} details={detail} />)}
          </div>
        </div>
      </div>
    </div>
  )
}