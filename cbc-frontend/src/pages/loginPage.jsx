import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios.post(import.meta.env.VITE_API_URL + "/api/user/google-login", {
        token: response.access_token
      }).then((res) => {
        localStorage.setItem("token", res.data.token);
        const user = res.data.user;
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }).catch((error) => {
        console.error("Google login failed: ", error);
        toast.error("Google login failed. Please try again.");
      });
    }
  });

  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/user/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");

      const user = response.data.user;
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[url('/bg.jpg')] object-cover bg-cover text-primary">
      
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 flex-col justify-center pl-16 text-primary bg-gradient-to-br from-[#09090b]/90 to-[#1a1a1d]/90 backdrop-blur-sm">
        <h1 className="text-5xl font-extrabold text-secondary drop-shadow-lg tracking-wide">
          Casual Club
        </h1>
        <p className="mt-6 text-lg text-gray-200 max-w-lg leading-relaxed">
          Discover your true beauty with our premium cosmetics.  
          Enhance your natural glow with elegance and style.
        </p>
        <p className="mt-6 text-md italic text-gray-400">
          “Because beauty begins the moment you decide to be yourself.”
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-12 md:py-0">
        <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 flex flex-col items-center space-y-5">
          
          {/* Logo */}
          <img src="/logo.png" alt="Logo" className="w-24 h-24" />

          {/* Title */}
          <h2 className="text-3xl font-bold text-secondary">Welcome Back</h2>
          <p className="text-sm text-gray-300 mb-4 text-center">
            Login to continue your beauty journey
          </p>

          {/* Inputs */}
          <div className="w-full space-y-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full h-[48px] rounded-lg px-4 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm transition-all"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full h-[48px] rounded-lg px-4 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm transition-all"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            className="w-full h-[48px] bg-secondary text-primary font-semibold rounded-lg shadow-md hover:scale-105 transition-all duration-300"
          >
            Login
          </button>

          {/* Google Login Button */}
          <button
            onClick={googleLogin}
            className="w-full h-[48px] border border-secondary text-secondary font-semibold rounded-lg shadow-sm hover:bg-secondary hover:text-primary transition-all duration-300"
          >
            Continue with Google
          </button>

          {/* Extra Links */}
          <div className="flex justify-between w-full text-xs text-gray-300 mt-3">
            <Link to="/forget-password" className="hover:text-secondary transition-colors">
              Forgot Password?
            </Link>
            <Link to="/register" className="hover:text-secondary transition-colors">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
