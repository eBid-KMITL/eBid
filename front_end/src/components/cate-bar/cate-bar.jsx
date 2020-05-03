import React from "react";
import { Link } from "react-router-dom"

export const CateBar = ({ sel }) => {
  return (
    <div className="cate-main">
      <div className="head">
        <b style={{ fontSize: 24 }}>หมวดหมู่</b>
      </div>
      <ul>
        <Link to="/category?id=1"><li id={sel === "1" ? "selected" : ""}>&nbsp;&nbsp;การ์ตูน</li></Link>
        <Link to="/category?id=2"><li id={sel === "2" ? "selected" : ""}>&nbsp;&nbsp;ของสะสม</li></Link>
        <Link to="/category?id=3"><li id={sel === "3" ? "selected" : ""}>&nbsp;&nbsp;ของเล่น | เกมส์</li></Link>
        <Link to="/category?id=4"><li id={sel === "4" ? "selected" : ""}>&nbsp;&nbsp;คอมพิวเตอร์ | โทรศัพท์มือถือ</li></Link>
        <Link to="/category?id=5"><li id={sel === "5" ? "selected" : ""}>&nbsp;&nbsp;หนังสือ | สิ่งพิมพ์</li></Link>
        <Link to="/category?id=6"><li id={sel === "6" ? "selected" : ""}>&nbsp;&nbsp;แฟชั่น</li></Link>
        <Link to="/category?id=7"><li id={sel === "7" ? "selected" : ""}>&nbsp;&nbsp;ภาพยนตร์ | วิดีโอ | ดีวีดี</li></Link>
        <Link to="/category?id=8"><li id={sel === "8" ? "selected" : ""}>&nbsp;&nbsp;อิเล็กทรอนิกส์</li></Link>
        <Link to="/category?id=9"><li id={sel === "9" ? "selected" : ""}>&nbsp;&nbsp;ดูทั้งหมด</li></Link>
      </ul>
    </div>
  )
}