import React from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export const Product = () => {
  const location = useLocation()
  const { id } = queryString.parse(location.search)

  return (
    <div className="product-main">
      <div className="base-container">
        PRODUCT_PAGE : {id}
      </div>
    </div>
  )
}