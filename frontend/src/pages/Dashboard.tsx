import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [tempIncome, setTempIncome] = useState<number>(0);

  const COLORS = ["#4f46e5", "#16a34a", "#dc2626", "#f59e0b"];

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchIncome = async () => {
    try {
      const res = await API.get("/user/me");
      setIncome(res.data.income ||0);
      setTempIncome(res.data.income ||0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchIncome();
  }, []);

  const handleIncomeSave = async () => {
    try {
      await API.put("/user/income", { income: tempIncome });
      setIncome(tempIncome);
      alert("Income saved successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const totalExpenses = transactions.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const remaining = income - totalExpenses;

  // Category Data
  const categoryData = Object.values(
    transactions.reduce((acc: any, curr: any) => {
      if (!acc[curr.category]) {
        acc[curr.category] = {
          name: curr.category,
          value: 0,
        };
      }
      acc[curr.category].value += curr.amount;
      return acc;
    }, {})
  );

  // Monthly Comparison Data
  const monthlyData = Object.values(
    transactions.reduce((acc: any, curr: any) => {
      const month = new Date(curr.date).toLocaleString("default", {
        month: "short",
      });

      if (!acc[month]) {
        acc[month] = { month, total: 0 };
      }

      acc[month].total += curr.amount;
      return acc;
    }, {})
  );

  return (
    <>
      <Navbar />
      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard Overview
        </h1>

        {/* Income Section */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold">
            Monthly Income
          </h2>

          <input
            type="number"
            value={tempIncome}
            onChange={(e) =>
              setTempIncome(Number(e.target.value))
            }
            className="mt-3 p-2 border rounded w-full"
          />

          <button
            onClick={handleIncomeSave}
            className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Save Income
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Total Expenses</h3>
            <p className="text-xl font-bold">₹{totalExpenses}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Remaining Balance</h3>
            <p className="text-xl font-bold">₹{remaining}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Transactions</h3>
            <p className="text-xl font-bold">{transactions.length}</p>
          </div>
        </div>

        {/* Monthly Comparison Chart */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Comparison
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown Pie */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Expense Breakdown
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <Link
          to="/chatbot"
          className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Open AI Assistant 🤖
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
