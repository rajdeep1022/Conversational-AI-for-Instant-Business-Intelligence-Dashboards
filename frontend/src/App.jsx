import React, { useState } from "react";
import InputBox from "./components/InputBox";
import Dashboard from "./components/Dashboard";
import { sendQuery } from "./services/api";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle user query submission
  const handleQuerySubmit = async (query) => {
    if (!query) return;

    setIsLoading(true);
    setError("");
    setData(null);

    try {
      const response = await sendQuery(query);
      setData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          AI Business Dashboard 📊
        </h1>
        <p className="text-gray-600 mt-2">
          Ask questions and get instant insights
        </p>
      </div>

      {/* Input */}
      <div className="mb-8">
        <InputBox onSubmit={handleQuerySubmit} />
      </div>

      {/* Dashboard */}
      <Dashboard data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default App;