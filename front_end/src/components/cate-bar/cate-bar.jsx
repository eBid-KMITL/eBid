import React from "react";
import { Link } from "react-router-dom"

export const CateBar = () => {
  return (
    <div className="cate-main">
      <div className="head">
        <b style={{ fontSize: 24 }}>หมวดหมู่</b>
      </div>
      <ul>
        <Link to="/category?id=1"><li>การ์ตูน</li></Link>
        <Link to="/category?id=2"><li>ของสะสม</li></Link>
        <Link to="/category?id=3"><li>ของเล่น | เกมส์</li></Link>
        <Link to="/category?id=4"><li>คอมพิวเตอร์ | โทรศัพท์มือถือ</li></Link>
        <Link to="/category?id=5"><li>หนังสือ | สิ่งพิมพ์</li></Link>
        <Link to="/category?id=6"><li>ภาพยนตร์ | วิดีโอ | ดีวีดี</li></Link>
        <Link to="/category?id=7"><li>สัตว์เลี้ยง</li></Link>
        <Link to="/category?id=8"><li>อิเล็กทรอนิกส์</li></Link>
        <Link to="/category?id=9"><li>ดูทั้งหมด</li></Link>
      </ul>
      </div>
  )
}