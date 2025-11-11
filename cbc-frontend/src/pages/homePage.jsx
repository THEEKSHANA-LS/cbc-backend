import { Route, Routes } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Header from "../components/header.jsx";
import ProductPage from "./productPage.jsx";
import ProductOverview from "./productOverview.jsx";
import CartPage from "./cartPage.jsx";
import CheckoutPage from "./checkoutPage.jsx";
import AboutPage from "./aboutPage.jsx";
import ContactPage from "./contactPage.jsx";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function HomePage() {
  return (
    <div className="w-full min-h-[100vh] bg-primary text-gray-100 flex flex-col">
      <Header />

      {/* --- Main Content --- */}
      <div className="flex-grow">
        <Routes path="/">
          <Route
            path="/"
            element={
              <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 md:px-16 py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="flex-1 space-y-6">
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Discover the Best Deals <br />
                    <span className="text-yellow-400">On Your Favorite Products</span>
                  </h1>
                  <p className="text-lg text-gray-200 max-w-md">
                    Explore our exclusive collection of trending products. Enjoy fast delivery,
                    secure checkout, and the best prices, all in one place.
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <a
                      href="/products"
                      className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-200"
                    >
                      Shop Now
                    </a>
                    <a
                      href="/about"
                      className="px-6 py-3 border border-yellow-400 rounded-full font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200"
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                <div className="flex-1 mt-10 md:mt-0 flex justify-center items-center">
                 <Swiper
                   spaceBetween={30}
                   centeredSlides={true}
                   autoplay={{
                   delay: 5000,
                   disableOnInteraction: false,
                  }}
                  navigation={false}
                  modules={[Autoplay, Navigation]}
                  className="w-[300px] md:w-[450px] rounded-2xl shadow-lg border border-transparent"
                  style={{
                    borderRadius: "10% 60% 10% 50% / 50% 10% 60% 10%",
                  }}
                >
                <SwiperSlide>
                 <img
                  src="/home.jpg"
                  alt="Trending Product 1"
                  className="w-full h-auto rounded-2xl "
                 />
                </SwiperSlide>
                <SwiperSlide>
                 <img
                  src="/home2.jpg"
                  alt="Trending Product 2"
                  className="w-full h-auto rounded-2xl"
                 />
                </SwiperSlide>
                <SwiperSlide>
                 <img
                  src="/home3.jpg"
                  alt="Trending Product 3"
                  className="w-full h-auto rounded-2xl"
                 />
                </SwiperSlide>
              </Swiper>
            </div>

              </section>
            }
          />

          <Route path="/products" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/overview/:Id" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>

      {/* --- Modern Footer --- */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Casual Club</h2>
            <p className="text-gray-400 text-sm">
              Your one-stop online store for quality products at unbeatable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-yellow-400 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/products" className="hover:text-yellow-400 transition">Products</a></li>
              <li><a href="/about" className="hover:text-yellow-400 transition">About</a></li>
              <li><a href="/contact" className="hover:text-yellow-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-yellow-400 mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-yellow-400 mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-lg">
              <a href="#" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-yellow-400 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-yellow-400 transition"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Casual Club. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
