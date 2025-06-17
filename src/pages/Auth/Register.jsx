
// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";

// const Register = () => {
//   const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     photo: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     const { name, email, password, confirmPassword, photo } = form;

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     // Password strength validation
//     const uppercaseCheck = /[A-Z]/.test(password);
//     const lowercaseCheck = /[a-z]/.test(password);
//     const minLengthCheck = password.length >= 6;

//     if (!uppercaseCheck || !lowercaseCheck || !minLengthCheck) {
//       toast.error("Password must include uppercase, lowercase, and be at least 6 characters long");
//       return;
//     }

//     try {
//       await createUser(email, password);
//       await updateUserProfile(name, photo);
//       toast.success("Registration Successful!");
//       navigate("/");
//     } catch (error) {
//       toast.error("Registration Failed");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await googleLogin();
//       toast.success("Google Login Successful!");
//       navigate("/");
//     } catch {
//       toast.error("Google Login Failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md border">
//       <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Your Name"
//           required
//           className="w-full border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="photo"
//           value={form.photo}
//           onChange={handleChange}
//           placeholder="Photo URL"
//           required
//           className="w-full border px-3 py-2 rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//           className="w-full border px-3 py-2 rounded"
//         />
//         <div>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//             className="w-full border px-3 py-2 rounded"
//           />
//           <small className="text-gray-500 text-sm block mt-1">
//             Must include uppercase, lowercase, and 6+ characters
//           </small>
//         </div>
//         <input
//           type="password"
//           name="confirmPassword"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm Password"
//           required
//           className="w-full border px-3 py-2 rounded"
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
//           Register
//         </button>
//       </form>

//       <p className="text-center mt-4 text-sm text-gray-600">
//         Already have an account?{" "}
//         <Link to="/login" className="text-green-600 font-semibold underline hover:text-green-800">
//           Login
//         </Link>
//       </p>

//       <div className="text-center mt-6">
//         <button
//           onClick={handleGoogleLogin}
//           className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
//         >
//           Register with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;
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
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;

    const { name, email, password, confirmPassword, photo } = form;

    // Password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Password strength validation
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

  const handleGoogleLogin = async () => {
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
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full border px-3 py-2 rounded"
          disabled={loading}
        />
        <input
          type="text"
          name="photo"
          value={form.photo}
          onChange={handleChange}
          placeholder="Photo URL"
          required
          className="w-full border px-3 py-2 rounded"
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
          disabled={loading}
        />
        <div>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border px-3 py-2 rounded"
            disabled={loading}
          />
          <small className="text-gray-500 text-sm block mt-1">
            Must include uppercase, lowercase, number, special character, and 6+ characters
          </small>
        </div>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="w-full border px-3 py-2 rounded"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
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
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`px-5 py-2 rounded text-white ${
            loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Processing..." : "Register with Google"}
        </button>
      </div>
    </div>
  );
};

export default Register;
