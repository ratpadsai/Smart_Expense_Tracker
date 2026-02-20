import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
 import Chatbot from "./pages/Chatbot";
 import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
