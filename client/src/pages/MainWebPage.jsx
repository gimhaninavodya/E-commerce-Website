import React from "react";
import Advertisement from "../components/Advertisement/Advertisement";
import ShopAd from "../components/ShopAd/ShopAd";
import ProductList from "../components/ProductList/ProductList";
import NewProducts from "../components/ProductList/NewProducts";

const MainWebPage = () => {
  return (
    <div className="home-page">
      <div>
        <Advertisement/>
        <ProductList />
        <ShopAd/>
        <NewProducts/>
      </div>
    </div>
  );
};

export default MainWebPage;
