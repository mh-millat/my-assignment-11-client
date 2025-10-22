import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/fridge", label: "Fridge" },
    { path: "/faq", label: "Faq" },
    { path: "/about", label: "About" },
    ...(user
      ? [
          { path: "/add-food", label: "Add Food" },
          { path: "/my-items", label: "My Items" },
        ]
      : []),
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 transition-colors">
      <div className="container mx-auto max-w-8xl px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 dark:text-green-400"
          aria-label="FoodTracker Home"
        >
          FoodTracker
        </Link>

        {/* Menu - center */}
        <div className="hidden md:flex space-x-6">
          {links.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 dark:text-green-400 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-300"
              }
              end={path === "/"}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* User/Login - right */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <img
                src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                alt={user.displayName || "User Avatar"}
                title={user.displayName || "User"}
                className="w-8 h-8 rounded-full border"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            // ✅ Login/Register এক জায়গায়
            <div className="flex gap-2">
              <NavLink
                to="/login"
                className="px-3 py-1 rounded border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Register
              </NavLink>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-green-600 dark:text-green-300"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          {links.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 text-green-600 dark:text-green-400 font-semibold"
                  : "block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-300"
              }
              onClick={() => setMenuOpen(false)}
              end={path === "/"}
            >
              {label}
            </NavLink>
          ))}

          {!user && (
            <div className="flex flex-col px-4 py-2 gap-2">
              <NavLink
                to="/login"
                className="px-3 py-1 rounded border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
