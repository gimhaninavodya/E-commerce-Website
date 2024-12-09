import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const Layout = () => {

    //favourites()
    //cartItems()

    return (
        <>
          <div>
            <Header />
            <Outlet />
          </div>
           {/* <Footer /> */}
         </>
     );
};
    
export default Layout;