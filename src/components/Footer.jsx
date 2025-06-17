
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <h2 className="text-2xl font-bold text-green-700">🍱 Food Tracker</h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Food Tracker helps you reduce food waste and manage your food storage efficiently.
            Built with love by developers who care about sustainability and smart living.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Useful Links</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><Link to="/" className="hover:text-green-600"> Home</Link></li>
            <li><Link to="/fridge" className="hover:text-green-600"> Fridge Items</Link></li>
            <li><Link to="/add-food" className="hover:text-green-600"> Add Food</Link></li>
            <li><Link to="/my-items" className="hover:text-green-600"> My Items</Link></li>
            <li><Link to="/expired" className="hover:text-green-600"> Expired Items</Link></li>
          </ul>
        </div>

        <div className="text-sm text-gray-500 md:text-right text-left">
          <p className="mb-2">&copy; {new Date().getFullYear()} Food Expiry Tracker</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
