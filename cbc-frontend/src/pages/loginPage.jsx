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
    // REVISED: Using custom colors (bg-accent/text-primary) and improved overall sizing
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[url('/bg.jpg')] object-cover bg-cover text-primary">
      
      {/* Left Section - Aesthetic & Brand Info */}
      {/* REVISED: Stronger gradient and deeper background for better contrast with text */}
      <div className="hidden md:flex w-1/2 flex-col justify-center px-16 bg-accent/90 backdrop-blur-sm">
        <h1 className="text-6xl font-black text-secondary drop-shadow-lg tracking-tight">
          Casual Club
        </h1>
        <p className="mt-8 text-xl text-primary/90 max-w-xl leading-relaxed">
          Discover your true beauty with our premium cosmetics. 
          Enhance your natural glow with elegance and style.
        </p>
        <p className="mt-8 text-lg italic text-primary/60">
          “Because beauty begins the moment you decide to be yourself.”
        </p>
      </div>

      {/* Right Section - Login Form */}
      {/* REVISED: Center card, slightly larger padding on desktop */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-12 md:py-0 bg-accent/30 md:bg-transparent">
        <div className="w-full max-w-sm bg-accent/80 border border-primary/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 sm:p-10 flex flex-col items-center space-y-6">
          
          {/* Logo */}
          <img src="/logo.png" alt="Logo" className="w-20 h-20" />

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
            <p className="text-md text-primary/60 text-center">
              Login to continue your beauty journey
            </p>
          </div>

          {/* Inputs */}
          <div className="w-full space-y-4 pt-2">
            {/* REVISED: Uniform input style, darker text, and secondary focus ring */}
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full h-12 rounded-lg px-5 text-base bg-accent/95 text-primary placeholder-primary/40 border border-primary/20 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none shadow-lg transition-all"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full h-12 rounded-lg px-5 text-base bg-accent/95 text-primary placeholder-primary/40 border border-primary/20 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none shadow-lg transition-all"
            />
          </div>

          {/* Login Button */}
          {/* REVISED: Using secondary color as background for primary action */}
          <button
            onClick={login}
            className="w-full h-12 bg-secondary text-accent font-bold text-lg rounded-lg shadow-lg shadow-secondary/50 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            Login
          </button>

          {/* Google Login Button */}
          {/* REVISED: More accessible design with a slight background on hover */}
          <button
            onClick={googleLogin}
            className="w-full h-12 flex items-center justify-center space-x-3 border border-primary/20 text-primary font-semibold rounded-lg shadow-sm hover:bg-primary/5 transition-all duration-300"
          >
            {/* Added Google Icon for better recognition (Assuming you have access to an SVG or icon library) */}
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.5 20H24v8.5h11.8C35.5 31.8 33 35.5 24 35.5c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.4 0 6.3 1.4 8.5 3.5l6-6C35.9 8.2 30.3 6 24 6c-10.5 0-19 8.5-19 19s8.5 19 19 19c10.3 0 17.5-7.4 17.5-17.5 0-1.2-.2-2.3-.4-3.4H24v-7.5h20.5z" fill="#0084d1"/></svg>
            <span>Continue with Google</span>
          </button>

          {/* Extra Links */}
          {/* REVISED: Better color contrast for links */}
          <div className="flex justify-between w-full text-sm text-primary/70 pt-2">
            <Link to="/forget-password" className="hover:text-secondary transition-colors">
              Forgot Password?
            </Link>
            <Link to="/register" className="hover:text-secondary transition-colors font-semibold">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}