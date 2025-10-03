import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ProductPage from "./productPage.jsx";
import ProductOverview from "./productOverview.jsx";
import CartPage from "./cartPage.jsx";
import CheckoutPage from "./checkoutPage.jsx";

export default function HomePage(){
    return(
        <div className="w-full h-[100vh] bg-primary">
            <Header/>
            <Routes path="/">
              <Route path="/" element={<h1>Welcom to Home Page</h1>}/>
              <Route path="/products" element={<ProductPage/>}/>
              <Route path="/contact" element={<h1>Contact Us</h1>}/>
              <Route path="/about" element={<h1>About Us</h1>}/>
              <Route path="/overview/:Id" element={<ProductOverview/>}/>
              <Route path="/cart" element={<CartPage/>}/>
              <Route path="/checkout" element={<CheckoutPage/>}/>
              <Route path="/*" element={<h1>404 Not Found</h1>}/>
            </Routes>
        </div>
    )
}

