import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful! Please login.");
      navigate("/");

    } catch (err: any) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 via-purple-700 to-blue-900">
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96">

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Smart Expense Tracker
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your account
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-pink-500 to-blue-700 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;

