import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div className="font-bold">Smart Expense Tracker</div>
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/expenses" className="mr-4">Expenses</Link>
        <Link to="/chatbot" className="mr-4">Chatbot</Link>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
