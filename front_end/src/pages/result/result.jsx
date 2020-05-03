import React from "react";
import { ProductFrame } from "../../components";
import { Helmet } from "react-helmet";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
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

export const Result = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const searchInput = useQuery().get("search");
  // const details = [
  //   { name: "MacBook Pro 16\"", price: 31590, owner: "eShop", time: "2020-05-05T09:59+0700", nbid: 15, img: [p2], id: 401 },
  //   { name: "MacBook Pro 15\"", price: 26800, owner: "eShop", time: "2020-05-12T22:59+0700", nbid: 12, img: ["https://www.bnn.in.th/pub/media/amasty/amoptmobile/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/A/p/Apple-MacBook-Pro-15-4-inch-with-Touch-Bar-i72-6GHZ16GBRP555X-256GBSpace-Grey-THA-2019-04-1588003534.jpg"], id: 403 },
  // ]
  const details = c4.filter(d => (d.name === searchInput) );

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
                  <p style={{ marginTop: 0, marginBottom: "1em" }}>พบ {details.length} รายการ</p>
                  {details.map(detail => <ProductFrame details={detail} />)}
                </>)
                : (
                  <>
                    <h2 style={{ margin: 0, fontSize: 32 }}>ไม่พบผลการค้นหา</h2>
                    <AiOutlineExclamationCircle style={{color: "grey", fontSize: "150px", width: "1100px", marginTop: "0.5em"}}/>
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