import React from "react";
import { ProductFrame } from "../../components";
import p1 from "../../assets/products-pics/ip11.png"
import p2 from "../../assets/products-pics/macbook.png"
import p3 from "../../assets/products-pics/watch.jpg"
import p4 from "../../assets/products-pics/bag.jpg"

export const Result = () => {
  const details = [
    { name: "iPhone 11 64GB", price: "35,800", owner: "e_shop", time: "0d 17:12:33", nbid: 22, image: p1, link: "/iPhone-11-64GB" },
    { name: "MacBook Pro 16\"", price: "47,100", owner: "e_shop", time: "3d 3:21:17", nbid: 15, image: p2, link: "/MacBook-Pro-16" },
    { name: "นาฬิกา VIGOROSO", price: "7,360", owner: "e_shop", time: "0d 12:00:08", nbid: 9, image: p3, link: "/นาฬิกา-VIGOROSO" },
    { name: "กระเป๋าหนังแท้ญี่ปุ่น", price: "1,328", owner: "e_shop", time: "2d 12:12:33", nbid: 4, image: p4, link: "/กระเป๋าหนังแท้ญี่ปุ่น" },
    { name: "MacBook Pro 15\"", price: "47,100", owner: "e_shop", time: "2d 00:43:46", nbid: 21, image: p2, link: "/MacBook-Pro-15" },
    { name: "iPhone 11 64GB", price: "35,800", owner: "e_shop", time: "0d 17:12:33", nbid: 22, image: p1, link: "/iPhone-11-64GB" },
    { name: "MacBook Pro 16\"", price: "47,100", owner: "e_shop", time: "3d 3:21:17", nbid: 15, image: p2, link: "/MacBook-Pro-16" },
    { name: "นาฬิกา VIGOROSO", price: "7,360", owner: "e_shop", time: "0d 12:00:08", nbid: 9, image: p3, link: "/นาฬิกา-VIGOROSO" },
    { name: "กระเป๋าหนังแท้ญี่ปุ่น", price: "1,328", owner: "e_shop", time: "2d 12:12:33", nbid: 4, image: p4, link: "/กระเป๋าหนังแท้ญี่ปุ่น" },
    { name: "MacBook Pro 15\"", price: "47,100", owner: "e_shop", time: "2d 00:43:46", nbid: 21, image: p2, link: "/MacBook-Pro-15" },
  ]

  return (
    <div className="result-main">
      <div className="search-content">
        <div className="content">
          {details ? (
            <>
              <h2 style={{ margin: 0, fontSize: 22 }}>ผลการค้นหา</h2>
              {details.map(detail => <ProductFrame image={detail.image} details={detail} />)}
            </>)
            : (<h2 style={{ margin: 0, fontSize: 22 }}>ไม่พบการค้นหา</h2>)
          }
        </div>
      </div>
    </div>
  )
}