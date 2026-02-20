import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";

const Expenses = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await API.get("/transactions");
    setTransactions(res.data);
  };

  const addExpense = async () => {
    await API.post("/transactions/add", {
      title,
      amount,
      category,
      type: "expense"
    });

    setTitle("");
    setAmount("");
    fetchTransactions();
  };

  const deleteExpense = async (id: string) => {
    await API.delete(`/transactions/${id}`);
    fetchTransactions();
  };

  return (
    <>
      <Navbar />
      <div className="p-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Expenses
        </h1>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
          <input
            placeholder="Title"
            className="border p-2 mr-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Amount"
            className="border p-2 mr-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="border p-2 mr-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>General</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
          </select>

          <button
            onClick={addExpense}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <select
          className="border p-2 mb-4 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="General">General</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>

        {transactions
          .filter((t) => filter === "All" || t.category === filter)
          .map((t) => (
            <div
              key={t._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-3 flex justify-between"
            >
              <div>
                <h3 className="font-semibold dark:text-white">
                  {t.title}
                </h3>
                <p className="dark:text-white">
                  ₹ {t.amount} - {t.category}
                </p>
              </div>

              <button
                onClick={() => deleteExpense(t._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Expenses;
