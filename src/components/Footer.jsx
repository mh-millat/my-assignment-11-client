import { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been submitted.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-black text-gray-300 mt-20">
      <div className="max-w-8xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Food Tracker Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-3">🍱 Food Tracker</h2>
          <p className="text-gray-300 ">
            Manage your food efficiently and reduce waste. Track expiry dates and stay organized with ease.
          </p>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            <strong>Name:</strong> Millat Sarker Himel <br />
            <strong>Location:</strong> Rangpur, Bangladesh <br />
            <strong>Phone:</strong> 01405688224
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-3">Useful Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-green-400 cursor-pointer">Home</li>
            <li className="hover:text-green-400 cursor-pointer">Fridge Items</li>
            <li className="hover:text-green-400 cursor-pointer">Add Food</li>
            <li className="hover:text-green-400 cursor-pointer">My Items</li>
            <li className="hover:text-green-400 cursor-pointer">Expired Items</li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-3">Contact Us</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-black font-semibold py-2 rounded-md hover:bg-green-500 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-8 py-6 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Food Expiry Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
