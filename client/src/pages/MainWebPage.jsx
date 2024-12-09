import React from "react";
import Advertisement from "../components/Advertisement/Advertisement";
import ShopAd from "../components/ShopAd/ShopAd";
import ProductList from "../components/ProductList/ProductList";

const MainWebPage = () => {
  return (
    <div className="home-page">
      <div>
        <Advertisement/>
        <ProductList />
        <ShopAd/>
      </div>
    </div>
  );
};

export default MainWebPage;
