"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type QueryResult = { [key: string]: any };

const exampleQuestions = [
  "Show total sales per month for 2024.",
  "Top 5 products by revenue.",
  "Number of orders per user.",
  "Users who bought product 'Laptop'.",
  "Most popular products by quantity sold."
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [sql, setSQL] = useState("");
  const [data, setData] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRun = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const json = await res.json();
      if (json.error) setError(json.error);
      else {
        setSQL(json.sql);
        setData(json.data || []);
        setMessage(json.message || "");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const numericKeys = data.length
    ? Object.keys(data[0]).filter((k) => typeof data[0][k] === "number")
    : [];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">AI Query & Visualization</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        {exampleQuestions.map((q) => (
          <button
            key={q}
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            onClick={() => setQuestion(q)}
          >
            {q.length > 30 ? q.slice(0, 30) + "..." : q}
          </button>
        ))}
      </div>

      <div className="mb-4 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border px-2 py-1 flex-1 rounded"
          placeholder="Ask your question..."
        />
        <button
          onClick={handleRun}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Run
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-gray-500">{message}</p>}

      {sql && (
        <div className="my-4 p-2 bg-gray-100 rounded">
          <p className="font-semibold">Generated SQL:</p>
          <pre>{sql}</pre>
        </div>
      )}

      {data.length > 0 && (
        <div className="overflow-x-auto my-4">
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="border px-2 py-1">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {Object.keys(row).map((key) => (
                    <td key={key} className="border px-2 py-1">{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {numericKeys.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Auto Chart</h2>
              <BarChart width={700} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={Object.keys(data[0])[0]} />
                <YAxis />
                <Tooltip />
                <Legend />
                {numericKeys.map((key, idx) => (
                  <Bar key={key} dataKey={key} fill={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]} />
                ))}
              </BarChart>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
