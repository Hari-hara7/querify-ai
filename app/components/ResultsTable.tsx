"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResultsTableProps {
  data: any[];
  onExportCSV: () => void;
}

export default function ResultsTable({ data, onExportCSV }: ResultsTableProps) {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <CardHeader className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <CardTitle className="text-white">Results</CardTitle>
        <Button
          onClick={onExportCSV}
          size="sm"
          variant="outline"
          className="border-zinc-800 bg-black text-zinc-300 hover:bg-zinc-900 hover:text-white"
        >
          <Download className="mr-2 h-3 w-3" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-black">
                {headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-sm font-semibold text-white"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-zinc-800 transition last:border-0 hover:bg-zinc-900/70"
                >
                  {headers.map((h) => (
                    <td key={h} className="px-4 py-3 text-sm text-zinc-300">
                      {String(row[h])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
