import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Applayout from "./pages/Applayout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductPage from "./pages/ProductPage"
import SearchResults from "./pages/SearchResults"
import FlashDeals from "./pages/FlashDeals"
import Checkout from "./pages/Checkout"
import MyOrders from "./pages/MyOrders"
import OrderTracking from "./pages/OrderTracking"
import Adressess from "./pages/Adressess"
import ProtectedRoute from "./components/ProtectedRoute"


const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1B3022",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "14px"
          }
        }}
      />

      <Routes>
        {/* Auth Pages - No navbar / footer */}
        <Route path="/login" element={<Login />} />

        {/* Main pages - With navbar / footer */}
        <Route path="/" element={<Applayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="deals" element={<FlashDeals />} />
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="order" element={<MyOrders />} />
            <Route path="order/:id" element={<OrderTracking />} />
            <Route path="addresses" element={<Adressess />} />
          </Route>

        </Route>
      </Routes>
    </>
  )
}

export default App