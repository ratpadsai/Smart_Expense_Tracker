import { useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
  try {
    if (!message.trim()) return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("User not found. Please login again.");
      return;
    }

    const user = JSON.parse(storedUser);

    const res = await API.post("/chat", {
      message,
      userId: user._id,   // ✅ SEND USER ID
    });

    setReply(res.data.reply);
    setMessage("");

  } catch (err) {
    console.error(err);
    setReply("Something went wrong.");
  }
};

  return (
    <>
      <Navbar />
      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          AI Finance Assistant 🤖
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
          <input
            type="text"
            placeholder="Ask me about your expenses..."
            className="w-full p-3 border rounded mb-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Ask
          </button>

          {reply && (
            <div className="mt-6 p-4 bg-gray-200 rounded">
              <strong>Assistant:</strong> {reply}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chatbot;
