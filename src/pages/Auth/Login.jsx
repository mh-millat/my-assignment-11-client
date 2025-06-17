import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";


const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    signIn(form.email, form.password)
      .then(() => {
        toast.success("Login Successful!");
        navigate("/");
      })
      .catch(() => toast.error("Invalid Email or Password"));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google Login Successful!");
        navigate("/");
      })
      .catch(() => toast.error("Google Login Failed"));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Login
        </button>
      </form>
      <p className="text-center mt-3">
        New? <Link to="/register" className="text-blue-600 underline">Register</Link>
      </p>
      <div className="text-center mt-4">
        <button onClick={handleGoogleLogin} className="bg-red-500 text-white px-4 py-2 rounded">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
