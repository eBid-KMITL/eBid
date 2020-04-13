import React from "react";
import { ProductFrame, CateBar } from "../../components";
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import p1 from "../../assets/products-pics/ip11.png"
import p2 from "../../assets/products-pics/macbook.png"

export const Category = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const id = useQuery().get("id");
  const details = [
    { name: "iPhone 11 64GB", price: 35800, owner: "e_shop", time: "2020-04-12T18:59+0700", nbid: 22, image: p1, id: 1 },
    { name: "MacBook Pro 16\"", price: 47100, owner: "e_shop", time: "2020-04-15T09:59+0700", nbid: 15, image: p2, id: 2 },
    { name: "MacBook Pro 15\"", price: 47100, owner: "e_shop", time: "2020-04-22T22:59+0700", nbid: 21, image: p2, id: 5 },
  ]

  return (
    <div className="category-main">
      <Helmet><title>eBid - Online Bidding | Software Development Processes KMITL</title></Helmet>
      <div className="category-container">
        <div className="category-left-bar">
          <CateBar />
        </div>
        <div className="category-content">
          <div className="content-hot">
            {
              (id === "1") ? (
                <h2><span role="img" aria-label="cartoon">&nbsp;🎭</span> การ์ตูน</h2>
              )
                : (id === "2") ? (
                  <h2><span role="img" aria-label="crown">&nbsp;👑</span> ของสะสม</h2>
                )
                  : (id === "3") ? (
                    <h2><span role="img" aria-label="joystick">&nbsp;🎮</span> ของเล่น | เกมส์</h2>
                  )
                    : (id === "4") ? (
                      <h2><span role="img" aria-label="laptop">&nbsp;💻</span> คอมพิวเตอร์ | โทรศัพท์มือถือ</h2>
                    )
                      : (id === "5") ? (
                        <h2><span role="img" aria-label="books">&nbsp;📚</span> หนังสือ | สิ่งพิมพ์</h2>
                      )
                        : (id === "6") ? (
                          <h2><span role="img" aria-label="movie">&nbsp;🎬</span> ภาพยนตร์ | วิดีโอ | ดีวีดี</h2>
                        )
                          : (id === "7") ? (
                            <h2><span role="img" aria-label="dog">&nbsp;🐶</span> สัตว์เลี้ยง</h2>
                          )
                            : (id === "8") ? (
                              <h2><span role="img" aria-label="tv">&nbsp;📺</span> อิเล็กทรอนิกส์</h2>
                            )
                              : (id === "9") ? (
                                <h2>&nbsp;สินค้าทั้งหมด</h2>
                              )
                                : history.push("/error")
            }
            {details.map(detail => <ProductFrame details={detail} />)}
          </div>
        </div>
      </div>
    </div>
  )
}