import React from "react";
import { ProductFrame } from "../../components";
import { Helmet } from "react-helmet";
import { useLocation, useHistory } from "react-router-dom";
import p1 from "../../assets/products-pics/ip11.png"
import p2 from "../../assets/products-pics/macbook.png"
import p3 from "../../assets/products-pics/watch.jpg"
import p4 from "../../assets/products-pics/bag.jpg"

export const Result = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const searchInput = useQuery().get("search");
  const details = [
    { name: "iPhone 11 64GB", price: 35800, owner: "e_shop", time: "2020-04-12T18:59+0700", nbid: 22, image: p1, id: 1 },
    { name: "MacBook Pro 16\"", price: 47100, owner: "e_shop", time: "2020-04-15T09:59+0700", nbid: 15, image: p2, id: 2 },
    { name: "VIGOROSO Watch", price: 7360, owner: "e_shop", time: "2020-04-16T11:59+0700", nbid: 9, image: p3, id: 3 },
    { name: "กระเป๋าหนังแท้ญี่ปุ่น", price: 1328, owner: "e_shop", time: "2020-04-09T14:59+0700", nbid: 4, image: p4, id: 4 },
    { name: "MacBook Pro 15\"", price: 47100, owner: "e_shop", time: "2020-04-22T22:59+0700", nbid: 21, image: p2, id: 5 },
  ]

  return (
    <>
      { (searchInput !== "") ? (
        <div className="result-main">
          <Helmet><title>eBid - Online Bidding | Software Development Processes KMITL</title></Helmet>
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
        </div>) : history.push("/")
      }
    </>
  )
}