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
              <Route path="/shopinfo" element={<ShopInfo />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
};

export default App;
