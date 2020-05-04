import React from "react";
import { ProductFrame, CateBar } from "../../components";
import { useLocation, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import c1 from "../../db/db_c1.json";
import c2 from "../../db/db_c2.json";
import c3 from "../../db/db_c3.json";
import c4 from "../../db/db_c4.json";
import c5 from "../../db/db_c5.json";
import c6 from "../../db/db_c6.json";
import c7 from "../../db/db_c7.json";
import c8 from "../../db/db_c8.json";

export const Category = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const id = useQuery().get("id");

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
                  {c1.map(d => <ProductFrame details={d} />)}</>
              )
                : (id === "2") ? (
                  <><h2><span role="img" aria-label="crown">&nbsp;👑</span> ของสะสม</h2>
                    {c2.map(d => <ProductFrame details={d} />)}</>
                )
                  : (id === "3") ? (
                    <><h2><span role="img" aria-label="joystick">&nbsp;🎮</span> ของเล่น | เกมส์</h2>
                      {c3.map(d => <ProductFrame details={d} />)}</>
                  )
                    : (id === "4") ? (
                      <><h2><span role="img" aria-label="laptop">&nbsp;💻</span> คอมพิวเตอร์ | โทรศัพท์มือถือ</h2>
                        {c4.map(d => <ProductFrame details={d} />)}</>
                    )
                      : (id === "5") ? (
                        <><h2><span role="img" aria-label="books">&nbsp;📚</span> หนังสือ | สิ่งพิมพ์</h2>
                          {c5.map(d => <ProductFrame details={d} />)}</>
                      )
                        : (id === "6") ? (
                          <><h2><span role="img" aria-label="fashion">&nbsp;👜</span> แฟชั่น</h2>
                            {c6.map(d => <ProductFrame details={d} />)}</>
                        )
                          : (id === "7") ? (
                            <><h2><span role="img" aria-label="dog">&nbsp;🎬</span> ภาพยนตร์ | วิดีโอ | ดีวีดี</h2>
                              {c7.map(d => <ProductFrame details={d} />)}</>
                          )
                            : (id === "8") ? (
                              <><h2><span role="img" aria-label="tv">&nbsp;📺</span> อิเล็กทรอนิกส์</h2>
                                {c8.map(d => <ProductFrame details={d} />)}</>
                            )
                              : (id === "9") ? (
                                <><h2>&nbsp;สินค้าทั้งหมด</h2>
                                  {c1.map(d => <ProductFrame details={d} />)}
                                  {c2.map(d => <ProductFrame details={d} />)}
                                  {c3.map(d => <ProductFrame details={d} />)}
                                  {c4.map(d => <ProductFrame details={d} />)}
                                  {c5.map(d => <ProductFrame details={d} />)}
                                  {c6.map(d => <ProductFrame details={d} />)}
                                  {c7.map(d => <ProductFrame details={d} />)}
                                  {c8.map(d => <ProductFrame details={d} />)}</>
                              )
                                : history.push("/error")
            }
            {/* {category.map(detail => <ProductFrame details={detail.lists} />)} */}
            {/* {details.map(detail => <ProductFrame details={detail}/>)} */}
            {/* {console.log(a)} */}
          </div>
        </div>
      </div>
    </div>
  )
}