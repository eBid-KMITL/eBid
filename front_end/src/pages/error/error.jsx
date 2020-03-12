import React from "react";
import { NavBar } from "../../components"
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="main">
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