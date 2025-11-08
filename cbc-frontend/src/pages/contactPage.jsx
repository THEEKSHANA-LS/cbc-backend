import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 px-6 py-16">
      {/* --- Page Header --- */}
      <section className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-yellow-400 mb-4">
          Contact <span className="text-white">Casual Club</span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Have a question, need help with your order, or just want to say hi?  
          We’re here to assist you every step of the way.
        </p>
      </section>

      {/* --- Contact Info Section --- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
      >
        {[
          {
            icon: <FaPhoneAlt className="text-3xl text-yellow-400 mb-3" />,
            title: "Call Us",
            desc: "+94 71 234 5678",
          },
          {
            icon: <FaEnvelope className="text-3xl text-yellow-400 mb-3" />,
            title: "Email Us",
            desc: "support@casualclub.com",
          },
          {
            icon: <FaMapMarkerAlt className="text-3xl text-yellow-400 mb-3" />,
            title: "Visit Us",
            desc: "Casual Club HQ, Colombo, Sri Lanka",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
          >
            {item.icon}
            <h3 className="text-xl font-semibold text-yellow-400">{item.title}</h3>
            <p className="text-gray-300 mt-2">{item.desc}</p>
          </div>
        ))}
      </motion.section>

      {/* --- Contact Form Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto backdrop-blur-2xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Send Us a Message
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              placeholder="Write your message..."
              rows="5"
              className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:border-yellow-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-md"
          >
            Send Message
          </button>
        </form>
      </motion.section>

      {/* --- Footer Message --- */}
      <div className="text-center mt-16 text-gray-400 text-sm">
        <p>We’ll get back to you within 24 hours. Thank you for connecting with Casual Club!</p>
      </div>
    </div>
  );
}
