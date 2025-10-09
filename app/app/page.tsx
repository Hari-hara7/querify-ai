"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState<number>(700);

  useEffect(() => {
    const update = () => {
      const w = containerRef.current?.offsetWidth || window.innerWidth;
      // keep some padding and cap max width
      setChartWidth(Math.min(Math.max(320, w - 48), 1000));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
    <div className="min-h-screen p-6 bg-gradient-to-b from-white via-slate-50 to-gray-100 text-slate-900">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <header className="py-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold">Querify — Ask your data</h1>
            <p className="mt-2 text-gray-600">Type a question and the AI will generate SQL and visualization for your database.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button className="bg-white border border-slate-200 px-4 py-2 rounded shadow-sm hover:shadow">Docs</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Try demo</button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {exampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuestion(q)}
                    className="text-sm bg-slate-100 px-3 py-1 rounded hover:bg-slate-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 border border-gray-200 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Ask your question (e.g. Top 5 products by revenue)..."
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRun}
                  className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-5 py-3 rounded shadow hover:opacity-95"
                >
                  {loading ? "Running..." : "Run"}
                </button>
                <button
                  onClick={() => { setQuestion(""); setSQL(""); setData([]); setError(""); setMessage(""); }}
                  className="bg-white border px-4 py-3 rounded hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>

            {error && <div className="mt-4 text-red-600">{error}</div>}
            {message && <div className="mt-4 text-sm text-gray-500">{message}</div>}

            {sql && (
              <div className="mt-4 p-4 bg-slate-50 rounded border">
                <p className="font-medium text-sm text-slate-700">Generated SQL</p>
                <pre className="mt-2 text-xs overflow-x-auto text-slate-800">{sql}</pre>
              </div>
            )}

            {data.length > 0 && (
              <div className="mt-6">
                <div className="overflow-x-auto rounded border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(data[0]).map((key) => (
                          <th key={key} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-sm">
                      {data.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          {Object.keys(row).map((key) => (
                            <td key={key} className="px-3 py-2 align-top">{String(row[key])}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {numericKeys.length > 0 && (
                  <div className="mt-6 bg-white p-4 rounded shadow-sm">
                    <h3 className="font-semibold mb-2">Auto Chart</h3>
                    <div style={{ width: "100%", height: 360 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey={Object.keys(data[0])[0]} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          {numericKeys.map((key, idx) => (
                            <Bar key={key} dataKey={key} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"][idx % 4]} />
                          ))}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          <aside className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Rows</p>
                  <p className="text-xl font-semibold">{data.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Columns</p>
                  <p className="text-xl font-semibold">{data[0] ? Object.keys(data[0]).length : 0}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Numeric fields</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {numericKeys.length ? numericKeys.map((k) => (
                    <span key={k} className="text-xs bg-slate-100 px-2 py-1 rounded">{k}</span>
                  )) : <span className="text-xs text-gray-400">None</span>}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Quick actions</p>
                <div className="mt-2 flex flex-col gap-2">
                  <button className="text-sm bg-slate-100 px-3 py-2 rounded">Export CSV</button>
                  <button className="text-sm bg-slate-100 px-3 py-2 rounded">Save Query</button>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
