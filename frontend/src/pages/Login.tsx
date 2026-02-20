import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 via-purple-700 to-blue-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-2">
          Smart Expense Tracker
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to manage your finances
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
