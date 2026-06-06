"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SQLDisplayProps {
  sql: string;
  executionTime: number;
}

export default function SQLDisplay({ sql, executionTime }: SQLDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <CardHeader className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <CardTitle className="text-white">Generated SQL</CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          {executionTime > 0 && (
            <Badge className="border-zinc-700 bg-black text-zinc-300">
              {executionTime}ms
            </Badge>
          )}
          <Button
            onClick={handleCopy}
            size="sm"
            variant="outline"
            className="border-zinc-800 bg-black text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-3 w-3" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-black p-4">
          <code className="font-mono text-sm text-zinc-200">{sql}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
