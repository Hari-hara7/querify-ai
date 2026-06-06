"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Clock, Database, Activity } from "lucide-react";

const COLORS = ["#ffffff", "#a1a1aa", "#71717a", "#d4d4d8", "#52525b"];

export default function AnalyticsPage() {
  const [queryStats, setQueryStats] = useState({
    totalQueries: 0,
    avgExecutionTime: 0,
    queriesByDay: [] as any[],
    executionTimeData: [] as any[],
  });

  useEffect(() => {
    const history = localStorage.getItem("queryHistory");
    if (history) {
      const queries = JSON.parse(history);
      const totalQueries = queries.length;
      const avgExecutionTime =
        queries.reduce((acc: number, q: any) => acc + (q.executionTime || 0), 0) /
        (queries.filter((q: any) => q.executionTime).length || 1);

      // Group by day
      const dayMap = new Map();
      queries.forEach((q: any) => {
        const day = new Date(q.timestamp).toLocaleDateString();
        dayMap.set(day, (dayMap.get(day) || 0) + 1);
      });

      const queriesByDay = Array.from(dayMap.entries())
        .map(([day, count]) => ({ day, count }))
        .slice(-7);

      // Execution time data
      const executionTimeData = queries
        .filter((q: any) => q.executionTime)
        .slice(-10)
        .map((q: any, i: number) => ({
          query: `Q${i + 1}`,
          time: q.executionTime,
        }));

      setQueryStats({
        totalQueries,
        avgExecutionTime: Math.round(avgExecutionTime),
        queriesByDay,
        executionTimeData,
      });
    }
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-[1600px] space-y-6 lg:space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-6 lg:p-8">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Analytics Dashboard
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Insights into your query performance and usage across devices.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Total Queries</p>
                  <p className="text-2xl font-bold text-white">
                    {queryStats.totalQueries}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Avg Execution</p>
                  <p className="text-2xl font-bold text-white">
                    {queryStats.avgExecutionTime}ms
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Success Rate</p>
                  <p className="text-2xl font-bold text-white">98%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Active Today</p>
                  <p className="text-2xl font-bold text-white">
                    {queryStats.queriesByDay[queryStats.queriesByDay.length - 1]
                      ?.count || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Queries by Day</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={queryStats.queriesByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="day" stroke="#71717a" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#71717a" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="count" fill={COLORS[0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Execution Time Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={queryStats.executionTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="query" stroke="#71717a" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#71717a" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke={COLORS[1]}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
