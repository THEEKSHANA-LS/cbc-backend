import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader.jsx";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/user/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleNavigate = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  return (
    <div className="relative flex justify-center items-center py-2">
      {loading && <Loader />}

      {/* 🔸 Logout Confirmation */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-[320px] rounded-xl shadow-lg p-5 text-center animate-fadeIn">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-center gap-3 mt-3">
              <button
                className="bg-accent text-white px-4 sm:px-5 py-2 rounded-md hover:bg-orange-500 transition text-sm sm:text-base"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-4 sm:px-5 py-2 rounded-md hover:bg-gray-300 transition text-sm sm:text-base"
                onClick={() => setIsLogoutConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔸 User Info */}
      {!loading && user && (
        <div className="relative flex items-center gap-2 sm:gap-3">
          <img
            src={user.image || "/default-avatar.png"}
            alt="User"
            className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full border-2 border-accent cursor-pointer object-cover"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <span
            className="text-secondary text-sm sm:text-base font-medium cursor-pointer truncate max-w-[100px] sm:max-w-[150px]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {user.firstName}
          </span>

          {/* 🔹 Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Mobile view - show above */}
              <div className="absolute bottom-[48px] left-10 w-[180px] sm:hidden bg-white border border-gray-200 rounded-lg shadow-md z-40 overflow-hidden animate-fadeIn">
                <button
                  onClick={() => handleNavigate("/account-settings")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <IoSettingsOutline className="mr-2 text-gray-500 text-lg" />
                  Account Settings
                </button>
                <button
                  onClick={() => handleNavigate("/orders")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <MdOutlineAccountCircle className="mr-2 text-gray-500 text-lg" />
                  Orders
                </button>
                <button
                  onClick={() => setIsLogoutConfirmOpen(true)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <IoLogOutOutline className="mr-2 text-gray-500 text-lg" />
                  Logout
                </button>
              </div>

              {/* Desktop view - show below */}
              <div className="hidden sm:block absolute top-[48px] right-0 w-[180px] bg-white border border-gray-200 rounded-lg shadow-md z-40 overflow-hidden animate-fadeIn">
                <button
                  onClick={() => handleNavigate("/account-settings")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <IoSettingsOutline className="mr-2 text-gray-500 text-lg" />
                  Account Settings
                </button>
                <button
                  onClick={() => handleNavigate("/orders")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <MdOutlineAccountCircle className="mr-2 text-gray-500 text-lg" />
                  Orders
                </button>
                <button
                  onClick={() => setIsLogoutConfirmOpen(true)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <IoLogOutOutline className="mr-2 text-gray-500 text-lg" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* 🔸 If no user */}
      {!loading && !user && (
        <a
          href="/login"
          className="bg-accent text-white px-4 sm:px-5 py-2 text-sm sm:text-base rounded-md hover:bg-orange-500 transition"
        >
          Login
        </a>
      )}
    </div>
  );
}
