import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function Register() {
    // Frontend validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/user/",
        { firstName, lastName, email, password }
      );
  
      // Check for success status
      if (response.status === 201 || response.status === 200) {
        toast.success("Registration successful. Please login.");
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
  
    } catch (error) {
      console.error("Register failed:", error);
  
      // Handle backend validation messages (if any)
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please check your details and try again.");
      }
    }
  }
  
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[url('/bg.jpg')] object-cover bg-cover text-primary">
      
      {/* Left Section - Branding */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-12 md:py-0">
        <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 flex flex-col items-center space-y-5">
          
          {/* Logo */}
          <img src="/logo.png" alt="Logo" className="w-24 h-24 " />

          {/* Title */}
          <h2 className="text-3xl font-bold text-secondary text-center">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-300 mb-4 text-center">
            Join us and continue your beauty journey
          </p>

          {/* Input Fields */}
          <div className="w-full space-y-4">
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="w-full h-[48px] rounded-lg px-4 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm transition-all"
            />
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              className="w-full h-[48px] rounded-lg px-4 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm transition-all"
            />
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
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="w-full h-[48px] rounded-lg px-4 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm transition-all"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={Register}
            className="w-full h-[48px] bg-secondary text-primary font-semibold rounded-lg shadow-md hover:scale-105 transition-all duration-300"
          >
            Create Account
          </button>

          {/* Extra Links */}
          <div className="flex justify-center items-center gap-2 text-sm text-gray-300 mt-3">
            <span>Already have an account?</span>
            <Link to="/login" className="text-secondary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      

      {/* Right Section - Register Form */}
      <div className="hidden md:flex w-1/2 flex-col justify-center pl-16 text-primary bg-gradient-to-br from-[#09090b]/90 to-[#1a1a1d]/90 backdrop-blur-sm">
        <h1 className="text-5xl font-extrabold text-secondary drop-shadow-lg tracking-wide">
          Crystal Beauty
        </h1>
        <p className="mt-6 text-lg text-gray-200 max-w-lg leading-relaxed">
          Discover your true beauty with our premium cosmetics.  
          Enhance your natural glow with elegance and style.
        </p>
        <p className="mt-6 text-md italic text-gray-400">
          “Because beauty begins the moment you decide to be yourself.”
        </p>
      </div>
    </div>
  );
}
