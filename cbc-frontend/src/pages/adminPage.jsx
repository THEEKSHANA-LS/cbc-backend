import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa6";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import AdminProductPage from "./admin/adminProductPage.jsx";
import AddProductPage from "./admin/adminAddNewProduct.jsx";
import UpdateProductPage from "./admin/adminUpdateProduct.jsx";
import AdminOrderPage from "./admin/adminOrdersPage.jsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader.jsx";
import axios from "axios";
import AdminUsersPage from "./admin/adminUsersPage.jsx";
import { LuMenu, LuX } from "react-icons/lu";

export default function AdminPage() {
  const [userLoaded, setUserLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to access admin panel");
      navigate("/login");
      return;
    }
    axios
      .get(import.meta.env.VITE_API_URL + "/api/user/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.role != "admin") {
          toast.error("You are not authorized to access admin panel");
          navigate("/");
          return;
        }
        setUserLoaded(true);
      })
      .catch(() => {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  return (
    <div className="w-full h-screen bg-primary flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-primary border-b border-accent shadow-md">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-accent font-bold text-xl">Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-accent text-2xl"
        >
          {sidebarOpen ? <LuX /> : <LuMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 w-[250px] h-full bg-primary border-r border-accent shadow-lg flex flex-col items-center py-6 gap-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="hidden md:flex flex-row items-center gap-3 w-[90%] px-4">
          <img src="/logo.png" alt="Logo" className="h-12" />
          <span className="text-accent font-bold text-2xl tracking-wide">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="w-full flex flex-col gap-2 mt-6">
          <Link
            to="/admin"
            onClick={() => setSidebarOpen(false)}
            className="w-[90%] mx-auto flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-accent hover:text-white transition-all duration-300 font-medium"
          >
            <FaChartLine className="text-lg" />
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            onClick={() => setSidebarOpen(false)}
            className="w-[90%] mx-auto flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-accent hover:text-white transition-all duration-300 font-medium"
          >
            <MdOutlineShoppingCartCheckout className="text-xl" />
            Orders
          </Link>

          <Link
            to="/admin/products"
            onClick={() => setSidebarOpen(false)}
            className="w-[90%] mx-auto flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-accent hover:text-white transition-all duration-300 font-medium"
          >
            <BsBox2Heart className="text-xl" />
            Products
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className="w-[90%] mx-auto flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-accent hover:text-white transition-all duration-300 font-medium"
          >
            <HiOutlineUsers className="text-xl" />
            Users
          </Link>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 w-full h-full bg-secondary overflow-y-auto">
        <div className="bg-primary w-full h-full">
          {userLoaded ? (
            <Routes>
              <Route
                path="/"
                element={<h1 className="p-6 text-xl font-bold">Dashboard</h1>}
              />
              <Route path="/orders" element={<AdminOrderPage />} />
              <Route path="/products" element={<AdminProductPage />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/update-product" element={<UpdateProductPage />} />
            </Routes>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
