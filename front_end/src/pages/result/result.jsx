import React, { useEffect, useState } from "react";
import { ProductFrame } from "../../components";
import { Helmet } from "react-helmet";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import firebase from 'firebase'
import p1 from "../../assets/products-pics/ip11.png";
import p2 from "../../assets/products-pics/macbook.png";
import p3 from "../../assets/products-pics/watch.jpg";
import p4 from "../../assets/products-pics/bag.jpg";
import c1 from "../../db/db_c1.json";
import c2 from "../../db/db_c2.json";
import c3 from "../../db/db_c3.json";
import c4 from "../../db/db_c4.json";
import c5 from "../../db/db_c5.json";
import c6 from "../../db/db_c6.json";
import c7 from "../../db/db_c7.json";
import c8 from "../../db/db_c8.json";

export const Result = ({ userData }) => {
  const [resultCount, setresultCount] = useState(0)
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const searchInput = useQuery().get("search");
  // const details = [
  //   { name: "MacBook Pro 16\"", price: 31590, owner: "eShop", time: "2020-05-05T09:59+0700", nbid: 15, img: [p2], id: 401 },
  //   { name: "MacBook Pro 15\"", price: 26800, owner: "eShop", time: "2020-05-12T22:59+0700", nbid: 12, img: ["https://www.bnn.in.th/pub/media/amasty/amoptmobile/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/A/p/Apple-MacBook-Pro-15-4-inch-with-Touch-Bar-i72-6GHZ16GBRP555X-256GBSpace-Grey-THA-2019-04-1588003534.jpg"], id: 403 },
  // ]

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



  let rc = 0
  const details = product.filter(ele => {
    const name = ele.name.toLowerCase()
    const searchInputt = searchInput.toLowerCase()
    let count = 0
    let loopCount = 0
    //หาว่ามีตัวอักษรที่เหมือนกับตัวแรกในคำค้นหาใน name กี่ตัว
    for (let index = 0; index < name.length; index++) {
      if (name[index] === searchInputt[0]) {
        count += 1
      }
    }

    for (let index = 0; index < name.length; index++) {
      const searchLength = searchInputt.length
      if (name[index] === searchInputt[0]) {
        loopCount += 1
        let check = true
        console.log(name, ' c ', searchInputt)
        for (let index2 = 1; index2 < searchLength; index2++) {
          console.log(searchInputt[index2], ' b ', name[index + index2])
          if (searchInputt[index2] === name[index + index2]) {
            //ไม่มีไร ไปต่อ
          } else {
            check = false
            break
          }
        }
        if (loopCount >= count) {
          if (check) {
            rc += 1
          }
          return check
        }
      }
    }
    //ถ้า name มีตัวแรกของคำค้นหา แค่ 1 ตัว จะจบเลย ส่วน ถ้า มีมากกว่านั้น ต้องปล่อยให้วนต่อจนเจอครบจำนวนตัว ถึงจะออกได้
    //ถ้าเจอตัวแรกของคำค้นหาใน name ครบทุกตัวแล้ว จะออกได้
  });
  
  return (
    <>
      {(searchInput !== "") ? (
        <div className="result-main">
          <Helmet><title>eBid - Online Bidding | Software Development Processes KMITL</title></Helmet>
          <div className="search-content">
            <div className="content">
              {details.length !== 0 ? (
                <>
                  <h2 style={{ margin: 0, fontSize: 32 }}>ผลการค้นหา</h2>
                  <p style={{ marginTop: 0, marginBottom: "1em" }}>พบ {rc} รายการ</p>
                  {details.sort((a, b) => {
                    if (searchInput.length === 1) {
                      if (a.name[0].toLowerCase() == searchInput[0].toLowerCase() && b.name[0].toLowerCase() != searchInput[0].toLowerCase()) {
                        return -1
                      } else if (a.name[0].toLowerCase() != searchInput[0].toLowerCase() && b.name[0].toLowerCase() == searchInput[0].toLowerCase()) {
                        return 1
                      } else if (a.name[0].toLowerCase() == searchInput[0].toLowerCase() && b.name[0].toLowerCase() == searchInput[0].toLowerCase()) {
                        if (a.name.toLowerCase().slice(1) > b.name.toLowerCase().slice(1)) {
                          return 1
                        } else {
                          return -1
                        }
                      }
                      else {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                          return 1
                        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                          return -1
                        } else {
                          return -1
                        }
                      }
                    } else {
                      return 0
                    }
                  }).map(detail => <ProductFrame details={detail} />)
                  }
                </>)
                : (
                  <>
                    <h2 style={{ margin: 0, fontSize: 32 }}>ไม่พบผลการค้นหา</h2>
                    <AiOutlineExclamationCircle style={{ color: "grey", fontSize: "150px", width: "1100px", marginTop: "0.5em" }} />
                    <p id="no-match" style={{ marginTop: "1em", marginBottom: "1em" }}>ไม่พบสินค้าที่ท่านต้องการ โปรดตรวจสอบแก้ไขคำค้นหาอีกครั้ง</p>
                    <div className="btn-wrap">
                      <Link to="/">
                        <button type="button" className="btn">
                          กลับหน้าหลัก
                      </button>
                      </Link>
                    </div>
                  </>)
              }
            </div>
          </div>
        </div>) : history.push("/")
      }
    </>
  )
}