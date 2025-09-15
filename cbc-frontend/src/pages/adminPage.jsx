import { Link, Route, Routes } from "react-router-dom";
import { FaChartLine } from "react-icons/fa6";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import AdminProductPage from "./admin/adminProductPage.jsx";
import AddProductPage from "./admin/adminAddNewProduct.jsx";
import UpdateProductPage from "./admin/adminUpdateProduct.jsx";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-primary flex p-2">
      {/* Sidebar */}
      <div className="w-[280px] h-full bg-primary border-accent shadow-lg flex flex-col items-center py-6 gap-6">
        {/* Logo */}
        <div className="flex flex-row items-center gap-3 w-[90%] px-4">
          <img
            src="/logo.png"
            alt="CBD - Crystal Beauty Cosmetics"
            className="h-14"
          />
          <span className="text-accent font-bold text-2xl tracking-wide">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="w-full flex flex-col gap-2 mt-6">
          <Link
            to="/admin"
            className="w-[90%] mx-auto flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-accent hover:text-white transition-all duration-300 font-medium"
          >
            <FaChartLine className="text-lg" />
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className="w-[90%] mx-auto flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-accent hover:text-white transition-all duration-300 font-medium"
          >
            <MdOutlineShoppingCartCheckout className="text-xl" />
            Orders
          </Link>

          <Link
            to="/admin/products"
            className="w-[90%] mx-auto flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-accent hover:text-white transition-all duration-300 font-medium"
          >
            <BsBox2Heart className="text-xl" />
            Products
          </Link>

          <Link
            to="/admin/users"
            className="w-[90%] mx-auto flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-accent hover:text-white transition-all duration-300 font-medium"
          >
            <HiOutlineUsers className="text-xl" />
            Users
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-[calc(100%-300px)] h-full shadow-lg rounded-lg overflow-hidden bg-secondary">
        <div className="bg-secondary w-full max-w-full h-full max-h-full overflow-y-scroll">
          <Routes path="/">
            <Route path="/" element={<h1 className="p-6 text-xl font-bold">Dashboard</h1>} />
            <Route path="/orders" element={<h1 className="p-6 text-xl font-bold">Orders</h1>} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/users" element={<h1 className="p-6 text-xl font-bold">Users</h1>} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/update-product" element={<UpdateProductPage/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
