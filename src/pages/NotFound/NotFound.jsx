import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <img
        src="https://i.ibb.co/xq22BtfT/Whats-App-Image-2025-05-23-at-23-30-27-fbb790a4.jpg"
        alt="Not Found Illustration"
        className="w-72 h-auto mb-6 rounded shadow-md"
      />
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4 text-gray-700">Oops! Page not found</p>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
