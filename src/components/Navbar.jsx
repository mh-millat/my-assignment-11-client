import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

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
    ...(user
      ? [
          { path: "/add-food", label: "Add Food" },
          { path: "/my-items", label: "My Items" },
        ]
      : [
          { path: "/login", label: "Login" },
          { path: "/register", label: "Register" },
        ]),
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 dark:text-green-400"
          aria-label="FoodTracker Home"
        >
          FoodTracker
        </Link>

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
              aria-hidden="true"
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
              aria-hidden="true"
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

        <div
          className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 absolute md:static w-full md:w-auto left-0 top-full bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            menuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {links.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 text-green-600 dark:text-green-400 font-semibold"
                  : "block px-4 py-2 hover:text-green-600 dark:hover:text-green-300"
              }
              onClick={() => setMenuOpen(false)}
              end={path === "/"}
            >
              {label}
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 dark:text-white text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "🌙 Dark" : "☀ Light"}
          </button>

          {user && (
            <div className="flex items-center gap-3 px-4 py-2">
              <img
                src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                alt={user.displayName || "User Avatar"}
                title={user.displayName || "User"}
                className="w-8 h-8 rounded-full border"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
