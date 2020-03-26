import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

export const Error = () => {
  return (
    <div className="main">
      <Helmet><title>Page Not Found | eBid</title></Helmet>
      <div className="error">
        <Link to="/">
          <button type="button" className="btn-b">
            กลับหน้าหลัก
          </button>
        </Link>
      </div>
    </div>
  )
}