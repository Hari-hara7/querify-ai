"use client";

import { useState, useEffect, useCallback } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import QueryInput from "@/components/QueryInput";
import SQLDisplay from "@/components/SQLDisplay";
import ResultsTable from "@/components/ResultsTable";
import ChartVisualization from "@/components/ChartVisualization";
import StatsSidebar from "@/components/StatsSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QueryResult = { [key: string]: any };

type QueryHistory = {
  question: string;
  sql: string;
  timestamp: string;
  executionTime?: number;
};

export default function Home() {
  const [question, setQuestion] = useState("");
  const [sql, setSQL] = useState("");
  const [data, setData] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [history, setHistory] = useState<QueryHistory[]>([]);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [historySearch, setHistorySearch] = useState("");

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("queryHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = useCallback(
    (q: string, s: string, execTime: number) => {
      const newEntry: QueryHistory = {
        question: q,
        sql: s,
        timestamp: new Date().toISOString(),
        executionTime: execTime,
      };
      const updated = [newEntry, ...history].slice(0, 50);
      setHistory(updated);
      localStorage.setItem("queryHistory", JSON.stringify(updated));
    },
    [history]
  );

  const handleRun = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");
    setData([]);
    setSQL("");
    setExecutionTime(0);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });

      const contentType = res.headers.get("content-type") || "";
      let json: any = null;

      if (contentType.includes("application/json") || contentType.includes("application/ld+json")) {
        // Safe to parse as JSON
        try {
          json = await res.json();
        } catch (e) {
          const text = await res.text();
          setError("Invalid JSON response from server: " + (text?.slice?.(0, 200) || String(e)));
          return;
        }
      } else {
        // Non-JSON response (HTML error page or similar)
        const text = await res.text();
        setError("Server returned a non-JSON response: " + (text?.slice?.(0, 200) || "(empty)"));
        return;
      }

      if (!res.ok) {
        setError(json?.error || "Failed to execute query");
        return;
      }

      setSQL(json.sql);
      setData(json.data || []);
      setExecutionTime(json.executionTime || 0);
      setMessage(
        `Success! Retrieved ${json.data?.length || 0} row(s) in ${
          json.executionTime || 0
        }ms`
      );

      saveToHistory(question, json.sql, json.executionTime || 0);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion("");
    setSQL("");
    setData([]);
    setError("");
    setMessage("");
    setExecutionTime(0);
  };

  const exportCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `query_results_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const numericKeys =
    data.length > 0
      ? Object.keys(data[0]).filter((k) => typeof data[0][k] === "number")
      : [];

  const filteredHistory = history.filter(
    (item) =>
      item.question.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.sql.toLowerCase().includes(historySearch.toLowerCase())
  );

  const loadFromHistory = (item: QueryHistory) => {
    setQuestion(item.question);
    setSQL(item.sql);
  };

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-400 space-y-6 lg:space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Query workspace
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Ask questions in plain English and get clean SQL results.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                Review your history, inspect SQL, and analyze results in one
                responsive workspace that stays usable on mobile, tablet, and
                desktop.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:max-w-md">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-zinc-500">Saved</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {history.length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-zinc-500">Rows</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {data.length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-zinc-500">Time</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {executionTime ? `${executionTime}ms` : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Main Content */}
          <div className="space-y-4 lg:order-2 lg:col-span-6 lg:space-y-6">
            <QueryInput
              question={question}
              setQuestion={setQuestion}
              onRun={handleRun}
              onClear={handleClear}
              isLoading={loading}
            />

            {/* Status Messages */}
            {loading && (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-zinc-900" />
                <Skeleton className="h-4 w-3/4 bg-zinc-900" />
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {message && !error && (
              <Alert className="border-zinc-700 bg-zinc-950 text-zinc-200">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {/* SQL Display */}
            {sql && <SQLDisplay sql={sql} executionTime={executionTime} />}

            {/* Results Table */}
            {data.length > 0 && (
              <ResultsTable data={data} onExportCSV={exportCSV} />
            )}

            {/* Chart Visualization */}
            {data.length > 0 && numericKeys.length > 0 && (
              <ChartVisualization
                data={data}
                numericKeys={numericKeys}
                chartType={chartType}
                setChartType={setChartType}
              />
            )}
          </div>

            {/* Stats Sidebar */}
            <div className="lg:order-3 lg:col-span-3">
              {data.length > 0 && (
                <StatsSidebar
                  data={data}
                  executionTime={executionTime}
                  numericKeys={numericKeys}
                />
              )}
            </div>

            {/* History Sidebar */}
            <div className="lg:order-1 lg:col-span-3">
              <Card className="border-white/10 bg-white/5 lg:sticky lg:top-24">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center justify-between text-white">
                    <span>History</span>
                    <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-normal text-zinc-300">
                      {history.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      placeholder="Search history..."
                      className="border-white/10 bg-black/30 pl-10 text-white placeholder-zinc-500"
                    />
                  </div>

                  <div className="max-h-72 space-y-2 overflow-y-auto lg:max-h-125">
                    {filteredHistory.slice(0, 10).map((item, i) => (
                      <div
                        key={i}
                        onClick={() => loadFromHistory(item)}
                        className="cursor-pointer rounded-2xl border border-white/10 bg-black/25 p-3 transition hover:border-white/20 hover:bg-white/5"
                      >
                        <p className="mb-1 line-clamp-2 text-sm text-white">
                          {item.question}
                        </p>
                        <div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
                          <span>
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                          {item.executionTime && (
                            <span className="text-zinc-300">
                              {item.executionTime}ms
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
