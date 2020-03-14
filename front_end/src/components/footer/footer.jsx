import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();

  return (
    <>
      {
        location.pathname !== '/login'
        && location.pathname !== '/register'
        && location.pathname !== '/forgot'
        &&
        <div className="footer-container">
          <p>©2020 eBid-KMITL : For Education Purpose Only<br />Software Development Processes</p>
        </div>
      }
    </>
  )
}