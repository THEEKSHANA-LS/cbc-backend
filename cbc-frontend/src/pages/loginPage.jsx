import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // send a request to the backend for login and authorization part...
  async function login() {
    try{
      const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/user/login",
      {
        email : email,
        password : password
      }
      );

      localStorage.setItem("token", response.data.token); //save user token in local storage...(user side)
      toast.success("Login successful!");

      const user = response.data.user;
      if(user.role == "admin"){
         navigate("/admin"); 
      }else{
         navigate("/");
      }
    } catch(error){
      console.error("Login failed:", error);
      //alert("Login failed. Please check your credentials and try again.");
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex">
      
      {/* Left Section - Branding */}
      <div className="w-1/2 flex flex-col justify-center pl-20 text-primary backdrop-blur-sm bg-black/30">
        <h1 className="text-5xl font-bold text-accent drop-shadow-lg">
          Crystal Beauty
        </h1>
        <p className="mt-6 text-xl text-secondary max-w-lg">
          Discover your true beauty with our premium cosmetics.  
          Enhance your natural glow with elegance and style.
        </p>
        <p className="mt-4 text-md text-primary/90 italic">
          "Because beauty begins the moment you decide to be yourself."
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-[400px] bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-10 flex flex-col items-center gap-6 border border-white/30">
          {/* Logo */}
          <img src="/logo.png" alt="Logo" className="w-20 h-20 mb-2" />

          {/* Title */}
          <h2 className="text-2xl font-semibold text-accent">Welcome Back</h2>
          <p className="text-sm text-white">
            Login to continue your beauty journey
          </p>

          {/* Email Input */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-[45px] rounded-lg px-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
          />

          {/* Password Input */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full h-[45px] rounded-lg px-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
          />

          {/* Login Button */}
          <button
            onClick={login}
            className="w-full h-[45px] bg-accent text-primary font-semibold rounded-lg shadow-md hover:scale-105 hover:bg-[#58177f] transition-all duration-300"
          >
            Login
          </button>

          {/* Extra Links */}
          <div className="flex justify-between w-full text-xs text-primary mt-2">
            <a href="#" className="hover:text-accent">Forgot Password?</a>
            <a href="#" className="hover:text-accent">Create Account</a>
          </div>
        </div>
      </div>
    </div>
  );
}
