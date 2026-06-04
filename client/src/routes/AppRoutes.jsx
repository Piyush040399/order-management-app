import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import OrderTracking from "../pages/OrderTracking";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/success/:id" element={<OrderSuccess />} />

      <Route path="/track/:id" element={<OrderTracking />} />
    </Routes>
  );
};

export default AppRoutes;