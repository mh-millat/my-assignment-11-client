import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;

    const { name, email, password, confirmPassword, photo } = form;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const uppercaseCheck = /[A-Z]/.test(password);
    const lowercaseCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCharCheck = /[!@#$%^&*]/.test(password);
    const minLengthCheck = password.length >= 6;

    if (
      !uppercaseCheck ||
      !lowercaseCheck ||
      !numberCheck ||
      !specialCharCheck ||
      !minLengthCheck
    ) {
      toast.error(
        "Password must include uppercase, lowercase, number, special character, and be at least 6 characters long"
      );
      return;
    }

    try {
      setLoading(true);
      await createUser(email, password);
      await updateUserProfile(name, photo);
      toast.success("Registration Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded shadow-md border-gray-100
                    transition-transform duration-300 ease-in-out
                    hover:scale-[1.02]">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          disabled={loading}
          className="w-full border px-3 py-2 rounded
                     transition-shadow duration-300
                     focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="photo"
          value={form.photo}
          onChange={handleChange}
          placeholder="Photo URL"
          required
          disabled={loading}
          className="w-full border px-3 py-2 rounded
                     transition-shadow duration-300
                     focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          disabled={loading}
          className="w-full border px-3 py-2 rounded
                     transition-shadow duration-300
                     focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            disabled={loading}
            className="w-full border px-3 py-2 rounded
                       transition-shadow duration-300
                       focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            tabIndex={-1}
            className="absolute right-3 top-5 -translate-y-1/2 text-gray-500 hover:text-green-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9a8.96 8.96 0 013.764-7.237M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            )}
          </button>
          <small
            className={`text-gray-500 text-sm block mt-1 transition-opacity duration-300
              ${form.password ? "opacity-100" : "opacity-0"}`}
          >
            Must include uppercase, lowercase, number, special character, and 6+ characters
          </small>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            disabled={loading}
            className="w-full border px-3 py-2 rounded
                       transition-shadow duration-300
                       focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(prev => !prev)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9a8.96 8.96 0 013.764-7.237M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white
                      ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-600 font-semibold underline hover:text-green-800"
        >
          Login
        </Link>
      </p>

      <div className="text-center mt-6">
        <button
          onClick={async () => {
            if (loading) return;
            try {
              setLoading(true);
              await googleLogin();
              toast.success("Google Login Successful!");
              navigate("/");
            } catch (error) {
              toast.error(error.message || "Google Login Failed");
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
          className={`px-5 py-2 rounded text-white
                      ${loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
        >
          {loading ? "Processing..." : "Register with Google"}
        </button>
      </div>
    </div>
  );
};

export default Register;
