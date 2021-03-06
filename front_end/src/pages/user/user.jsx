import React from "react";
import {
  UserProfile,
  UserAccount,
  UserAddress,
  UserPassword,
  UserMyStatement,
  UserMyProduct,
} from "../../components";
import firebase from "firebase";
import profilePicture from "../../assets/Profile.png";
import moneyPicture from "../../assets/eGold.png";
import addrPicture from "../../assets/address.png";
import psswPicture from "../../assets/password.png";
import hamPicture from "../../assets/hammer2.png";
import cartPicture from "../../assets/cart.png";
import { useState } from "react";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";

export const Profile = ({ api, userData }) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const history = useHistory();
  const m = useQuery().get("m")
  const [mode, setMode] = useState((m) ? (parseInt(m)) : 0);

  return (
    <>
      {userData ?
        (<div>
          <div className="user-main">
            <Helmet><title>eBid - Online Bidding | Software Development Processes KMITL</title></Helmet>
            <ul>
              <li>
                {(() => {
                  switch (mode) {
                    case 0:
                      return (
                        <img
                          src={profilePicture}
                          className="image-head"
                          alt="profile-logo"
                        />
                      );
                    case 1:
                      return (
                        <img
                          src={moneyPicture}
                          className="image-head"
                          alt="account-logo"
                        />
                      );
                    case 2:
                      return (
                        <img
                          src={addrPicture}
                          className="image-head"
                          alt="address-logo"
                        />
                      );
                    case 3:
                      return (
                        <img
                          src={psswPicture}
                          className="image-head"
                          alt="password-logo"
                        />
                      );
                    case 4:
                      return (
                        <img
                          src={hamPicture}
                          className="image-head"
                          alt="statement-logo"
                        />
                      );
                    case 5:
                      return (
                        <img
                          src={cartPicture}
                          className="image-head"
                          alt="product-logo"
                        />
                      );
                    default:
                      return (
                        <img
                          src={profilePicture}
                          className="image-head"
                          alt="profile-logo"
                        />
                      );
                  }
                })()}
              </li>
              <li
                onClick={() => setMode(0)}
                className={mode === 0 ? "selected" : ""}
              >
                &nbsp;บัญชีของฉัน
          </li>
              <li
                onClick={() => setMode(1)}
                className={mode === 1 ? "selected" : ""}
              >
                &nbsp;เงินในบัญชี
          </li>
              <li
                onClick={() => setMode(2)}
                className={mode === 2 ? "selected" : ""}
              >
                &nbsp;ที่อยู่
          </li>
              <li
                onClick={() => setMode(3)}
                className={mode === 3 ? "selected" : ""}
              >
                &nbsp;ตั้งค่ารหัสผ่าน
          </li>
              <li
                onClick={() => setMode(4)}
                className={mode === 4 ? "selected" : ""}
              >
                &nbsp;การประมูลของฉัน
          </li>
              <li
                onClick={() => setMode(5)}
                className={mode === 5 ? "selected" : ""}
              >
                &nbsp;สินค้าของฉัน
          </li>
              <li>
                <Link to="/addproduct">
                  <button type="button" className="btn">
                    ลงสินค้า
              </button>
                </Link>
              </li>
            </ul>
            <div className="user-component">
              {(() => {
                switch (mode) {
                  case 0:
                    return <UserProfile api={api} userData={userData}/>;
                  case 1:
                    return <UserAccount api={api} userData={userData}/>;
                  case 2:
                    return <UserAddress api={api} userData={userData}/>;
                  case 3:
                    return <UserPassword api={api} userData={userData}/>;
                  case 4:
                    return <UserMyStatement api={api} userData={userData}/>;
                  case 5:
                    return <UserMyProduct api={api} userData={userData}/>;
                  default:
                    return <UserProfile api={api} userData={userData}/>;
                }
              })()}
            </div>
          </div>
        </div>) : history.push("/login?from=profile")
      }
    </>
  )
};
