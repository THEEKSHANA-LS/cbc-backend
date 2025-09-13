import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";

export default function HomePage(){
    return(
        <div className="w-full h-[100vh] bg-primary">
            <Header/>
            <Routes path="/">
              <Route path="/" element={<h1>Welcom to Home Page</h1>}/>
              <Route path="/products" element={<h1>Products List</h1>}/>
              <Route path="/contact" element={<h1>Contact Us</h1>}/>
              <Route path="/about" element={<h1>About Us</h1>}/>
              <Route path="/*" element={<h1>404 Not Found</h1>}/>
            </Routes>
        </div>
    )
}

