import { Link, Route, Routes } from "react-router-dom";
import { FaChartLine } from "react-icons/fa6";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import AdminProductPage from "./admin/adminProductPage.jsx";
import AddProductPage from "./admin/adminAddNewProduct.jsx";

export default function AdminPage(){
    return(
       <div className="w-full h-full bg-primary flex p-2">

        {/*slide bar*/}
        <div className="w-[300px] h-full bg-primary flex flex-col items-center gap-4">
            <div className="flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-lg gap-[2px] mb-[20px]">
                <img src="/logo.png" alt="CBD - Crystal Beauty Cosmetics" className="h-[80px]"/>
                <span className="text-white text-xl ml-[4px]">Admin Panel</span>
            </div>

            <Link to="/admin" className="w-[90%] flex items-center gap-2 px-4 hover:bg-accent rounded-lg">
              <FaChartLine/>
               Dashboasrd
            </Link>

            <Link to="/admin/orders" className="w-[90%] flex items-center gap-2 px-4 hover:bg-accent rounded-lg">
              <MdOutlineShoppingCartCheckout className="text-xl"/>
               Orders
            </Link>

            <Link to="/admin/products" className="w-[90%] flex items-center gap-2 px-4 hover:bg-accent rounded-lg">
              <BsBox2Heart className="text-xl"/>
               Products
            </Link>

            <Link to="/admin/users" className="w-[90%] flex items-center gap-2 px-4 hover:bg-accent rounded-lg">
              <HiOutlineUsers className="text-xl"/>
               Users
            </Link>
           
        </div>

        <div className="w-[calc(100%-300px)] h-full border-[2px] border-accent rounded-lg overflow-hidden">
            <div className="bg-secondary w-full max-w-full h-full max-h-full overflow-y-scroll">
             <Routes path="/">
               <Route path="/" element={<h1>Dashboard</h1>}/>
               <Route path="/orders" element={<h1>Orders</h1>}/>
               <Route path="/products" element={<AdminProductPage/>}/>
               <Route path="/users" element={<h1>Users</h1>}/>
               <Route path="/add-product" element={<AddProductPage/>}/>
             </Routes> 
            </div>
        </div>
       </div>
    )
}

