"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsSidebarProps {
  data: any[];
  executionTime: number;
  numericKeys: string[];
}

export default function StatsSidebar({
  data,
  executionTime,
  numericKeys,
}: StatsSidebarProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-white">Query Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
          <div>
            <p className="text-sm text-zinc-500">Rows returned</p>
            <p className="text-3xl font-bold text-white">{data.length}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Columns</p>
            <p className="text-3xl font-bold text-white">
              {data[0] ? Object.keys(data[0]).length : 0}
            </p>
          </div>
          {executionTime > 0 && (
            <div>
              <p className="text-sm text-zinc-500">Execution time</p>
              <p className="text-3xl font-bold text-white">{executionTime}ms</p>
            </div>
          )}
          <div>
            <p className="mb-2 text-sm text-zinc-500">Numeric fields</p>
            <div className="flex flex-wrap gap-1.5">
              {numericKeys.length > 0 ? (
                numericKeys.map((k) => (
                  <Badge
                    key={k}
                    variant="outline"
                    className="border-zinc-700 bg-black text-zinc-300"
                  >
                    {k}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-zinc-500">None</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-white">Tips</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>Be specific in your questions</li>
            <li>Use table or column names if known</li>
            <li>Try "Top N", "Average", or "Total"</li>
            <li>Press Ctrl+Enter to run</li>
            <li>Check history for past queries</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-white">Database Schema</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="space-y-3 text-xs text-zinc-300">
            <div>
              <p className="font-medium text-zinc-100">users</p>
              <p className="ml-2 text-zinc-500">id, name, email</p>
            </div>
            <div>
              <p className="font-medium text-zinc-100">products</p>
              <p className="ml-2 text-zinc-500">id, name, price</p>
            </div>
            <div>
              <p className="font-medium text-zinc-100">orders</p>
              <p className="ml-2 text-zinc-500">id, user_id, order_date, total</p>
            </div>
            <div>
              <p className="font-medium text-zinc-100">order_items</p>
              <p className="ml-2 text-zinc-500">
                id, order_id, product_id, quantity, unit_price
              </p>
            </div>
          </div>
          <div className="mt-3 rounded border border-zinc-800 bg-black p-2">
            <p className="text-xs text-zinc-400">
              <span className="font-medium text-zinc-200">Note:</span> Column
              names use snake_case
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
