import { motion } from "framer-motion";
import { FaTshirt, FaShippingFast, FaUserTie, FaGlobeAmericas } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-gray-100 py-16 px-6">
      {/* --- Hero Section --- */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-yellow-400 mb-4">
          About <span className="text-white">Casual Club</span>
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Where timeless style meets modern confidence.  
          At <span className="font-semibold text-yellow-400">Casual Club</span>, we design fashion that helps men
          express their individuality — effortlessly.
        </p>
      </section>

      {/* --- Story Section --- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto mb-20 grid md:grid-cols-2 gap-10 items-center"
      >
        <img
          src="/bg.jpg"
          alt="Casual Club Fashion"
          className="rounded-2xl shadow-lg object-cover w-full h-80 border border-yellow-400/30"
        />
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Our Story</h2>
          <p className="text-gray-300 leading-relaxed">
            Founded with a passion for effortless sophistication, Casual Club was created for the modern man —
            someone who values comfort, quality, and confidence.  
            From casual essentials to statement pieces, our collections are curated to fit every lifestyle and mood.
          </p>
          <p className="text-gray-400 mt-4 italic">
            “Because real style doesn’t need to shout — it simply speaks for itself.”
          </p>
        </div>
      </motion.section>

      {/* --- Features / Values --- */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-20">
        {[
          {
            icon: <FaTshirt className="text-4xl text-yellow-400 mx-auto mb-3" />,
            title: "Premium Quality",
            desc: "We believe in craftsmanship — every stitch, fabric, and fit is made to last.",
          },
          {
            icon: <FaShippingFast className="text-4xl text-yellow-400 mx-auto mb-3" />,
            title: "Fast Delivery",
            desc: "Get your favorite styles delivered right to your doorstep — quickly and safely.",
          },
          {
            icon: <FaUserTie className="text-4xl text-yellow-400 mx-auto mb-3" />,
            title: "Customer First",
            desc: "Our customers are our community. We’re here to make your style journey effortless.",
          },
          {
            icon: <FaGlobeAmericas className="text-4xl text-yellow-400 mx-auto mb-3" />,
            title: "Sustainable Fashion",
            desc: "We’re committed to making fashion that looks good and does good for the planet.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-md hover:bg-white/20 transition"
          >
            {item.icon}
            <h3 className="text-xl font-bold text-yellow-400 mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* --- Mission Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          To redefine men’s fashion through creativity, confidence, and comfort.  
          We aim to inspire every man to embrace his true style and wear it with pride.
        </p>
        <p className="mt-4 text-yellow-400 font-medium">
          Casual Club — Be effortless. Be confident. Be you.
        </p>
      </motion.section>
    </div>
  );
}
