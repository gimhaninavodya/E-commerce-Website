import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Register } from "./Auth/Register";
import { Login } from "./Auth/Login";
import { Profile } from "./components/Profile/Profile";
import { useAuth } from "./contexts/AuthContext";
import MainWebPage from "./pages/MainWebPage";
import Layout from "./layout/Layout";
import MySells from "./pages/Sells/MySells";
import AddProduct from "./components/AddProduct/AddProduct";
import ShopInfo from "./components/ShopInfo/ShopInfo";
import Fashion from "./pages/Categories/Fashion";
import HomeKitchen from "./pages/Categories/Home&Kitchen";
import Beauty from "./pages/Categories/Beauty";
import Electronics from "./pages/Categories/Electronics";
import Sports from "./pages/Categories/Sports";
import Favorites from "./pages/favorites/favorites";
import Cart from "./pages/Cart/Cart";
import ProductView from "./components/ProductView/ProductView";
import Checkout from "./components/Checkout/Checkout";

export const App = () => {
  const { isAuthenticated } = useAuth();
  return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/register"
              element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
            />
            <Route element={<Layout />}>
              <Route
                path="/"
                element={!isAuthenticated ? <MainWebPage /> : <MainWebPage />}
              />
              <Route
                path="/profile"
                element={isAuthenticated ? <Profile /> : <MainWebPage />}
              />
              <Route
                path="/mysells"
                element={isAuthenticated ? <MySells /> : <Login />}
              />
              <Route
                path="/addProduct"
                element={isAuthenticated ? <AddProduct /> : <Login />}
              />
              <Route 
                path="/shopinfo" 
                element={isAuthenticated ?<ShopInfo /> : <Login />} 
              />
              <Route
                path="/fashion"
                element={<Fashion/>}
              />
              <Route
                path="/home"
                element={<HomeKitchen/>}
              />
              <Route
                path="/beauty"
                element={<Beauty/>}
              />
              <Route
                path="/electronics"
                element={<Electronics/>}
              />
              <Route
                path="/sports"
                element={<Sports/>}
              />
              <Route
                path="/favorites"
                element={isAuthenticated ? <Favorites /> : <Login />}
              />
              <Route
                path="/cart"
                element={isAuthenticated ? <Cart /> : <Login />}
              />
              <Route
                path="/product/:id"
                element={<ProductView />}
              />
              <Route
                path="/checkout"
                element={<Checkout/>}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
};

export default App;
