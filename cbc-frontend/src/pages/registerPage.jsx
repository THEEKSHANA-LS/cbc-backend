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
    // REVISED: Using custom colors (bg-accent/text-primary) and ensuring full height
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[url('/bg.jpg')] object-cover bg-cover text-primary">
      
      {/* Right Section (Form) - MOVED TO RIGHT ON DESKTOP for consistency with Login */}
      <div className="hidden md:flex w-1/2 order-2 flex-col justify-center px-16 bg-accent/90 backdrop-blur-sm">
        <h1 className="text-6xl font-black text-secondary drop-shadow-lg tracking-tight">
          Casual Club
        </h1>
        <p className="mt-8 text-xl text-primary/90 max-w-xl leading-relaxed">
        Step into a world of effortless style and confidence.
        Elevate your everyday look with timeless fashion made for modern men.
        </p>
        <p className="mt-8 text-lg italic text-primary/60">
        “Because real style starts with confidence.”
        </p>
      </div>
      
      {/* Left Section (Branding) - MOVED TO LEFT ON DESKTOP for consistency with Login */}
      {/* REVISED: Used same deep gradient background and large text sizing */}
      {/* REVISED: Swapped order with branding section for consistency. Added dark background for mobile */}
      <div className="w-full md:w-1/2 order-1 flex justify-center items-center px-6 py-12 md:py-0 bg-accent/30 md:bg-transparent">
        <div className="w-full max-w-sm bg-accent/80 border border-primary/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 sm:p-10 flex flex-col items-center space-y-6">
          
          {/* Logo */}
          <img src="/logo.png" alt="Logo" className="w-20 h-20" />

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-primary">Create Your Account</h2>
            <p className="text-md text-primary/60 text-center">
              Join us and continue your stylish journey
            </p>
          </div>

          {/* Input Fields */}
          <div className="w-full space-y-4 pt-2">
            
            {/* IMPROVEMENT: Grouped First and Last Name in a two-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
                // Applied consistent dark input styling
                className="h-12 rounded-lg px-5 text-base bg-accent/95 text-primary placeholder-primary/40 border border-primary/20 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none shadow-lg transition-all"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
                // Applied consistent dark input styling
                className="h-12 rounded-lg px-5 text-base bg-accent/95 text-primary placeholder-primary/40 border border-primary/20 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none shadow-lg transition-all"
              />
            </div>

            {/* Other Inputs */}
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              // Applied consistent dark input styling
              className="w-full h-12 rounded-lg px-5 text-base bg-accent/95 text-primary placeholder-primary/40 border border-primary/20 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none shadow-lg transition-all"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              // Applied consistent dark input styling
              className="w-full h-12 rounded-lg px-5 text-base bg-accent/95 text-primary placeholder-primary/40 border border-primary/20 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none shadow-lg transition-all"
            />
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              // Applied consistent dark input styling
              className="w-full h-12 rounded-lg px-5 text-base bg-accent/95 text-primary placeholder-primary/40 border border-primary/20 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none shadow-lg transition-all"
            />
          </div>

          {/* Signup Button */}
          {/* REVISED: Using secondary color and strong shadow for primary action, consistent with Login page */}
          <button
            onClick={Register}
            className="w-full h-12 bg-secondary cursor-pointer text-accent font-bold text-lg rounded-lg shadow-lg shadow-secondary/50 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            Create Account
          </button>

          {/* Extra Links */}
          {/* REVISED: Better color contrast and spacing */}
          <div className="flex justify-center items-center gap-2 text-sm text-primary/70 pt-2">
            <span>Already have an account?</span>
            <Link to="/login" className="text-secondary font-semibold hover:underline transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}