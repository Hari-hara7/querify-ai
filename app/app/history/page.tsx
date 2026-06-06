"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Trash2 } from "lucide-react";

interface QueryHistory {
  question: string;
  sql: string;
  timestamp: string;
  executionTime?: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<QueryHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("queryHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all history?")) {
      localStorage.removeItem("queryHistory");
      setHistory([]);
    }
  };

  const filteredHistory = history.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sql.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-[1600px] space-y-6 lg:space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-6 lg:p-8">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Query History
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            View and search through your past queries with a layout that scales
            from phone to desktop.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search queries..."
              className="border-white/10 bg-white/5 pl-10 text-white placeholder-zinc-500"
            />
          </div>
          <Button
            onClick={clearHistory}
            variant="outline"
            className="border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>

        {filteredHistory.length === 0 ? (
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="py-12 text-center">
              <p className="text-zinc-400">No queries found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => (
              <Card key={index} className="border-white/10 bg-white/5 backdrop-blur">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-white text-base mb-2">
                        {item.question}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                        {item.executionTime && (
                          <Badge className="border-zinc-700 bg-black text-zinc-300">
                            {item.executionTime}ms
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-black p-4">
                    <code className="font-mono text-sm text-zinc-200">
                      {item.sql}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
