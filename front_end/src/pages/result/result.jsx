import React, { useEffect, useState } from "react";
import { ProductFrame } from "../../components";
import { Helmet } from "react-helmet";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import firebase from 'firebase'
import { Ellipsis } from 'react-spinners-css';

export const Result = ({ userData }) => {
  const [resultCount, setresultCount] = useState(0)
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const searchInput = useQuery().get("search");
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
      setProduct(pd);
      setLoading(false);
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
        } else {
          if (check) {
            rc += 1
            return check
          }
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
              {
                loading &&
                <>
                  <h2 style={{ margin: 0, fontSize: 32 }}>ผลการค้นหา</h2>
                  <div className="btn-wrap">
                    <Ellipsis color="orange" size={150} style={{ width: "1100px", marginTop: "5em", display: "flex", alignItems: "center", justifyContent: "center" }} />
                  </div>
                  <p id="no-match" style={{ marginTop: "1em", marginBottom: "5em", alignItems: "center" }}>โปรดรอสักครู่...</p>
                </>
              }

              {!loading && (details.length !== 0 ? (
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
                      if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1
                      } else {
                        return -1
                      }
                    }
                  }).map(detail => <ProductFrame details={detail} />)
                  }
                </>
              )
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
                  </>
                )
              )
              }
            </div>
          </div>
        </div>) : history.push("/")
      }
    </>
  )
}