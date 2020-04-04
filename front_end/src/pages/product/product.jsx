import React from "react";
import { useLocation } from 'react-router-dom';

export const Product = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const id = useQuery().get("id")

  return (
    <div className="product-main">
      <div className="base-container">
        PRODUCT_PAGE_ID : {id}
      </div>
    </div>
  )
}