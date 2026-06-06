"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Trash2 } from "lucide-react";

interface QueryInputProps {
  question: string;
  setQuestion: (value: string) => void;
  onRun: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function QueryInput({
  question,
  setQuestion,
  onRun,
  onClear,
  isLoading,
}: QueryInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      onRun();
    }
  };

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-white">Ask a Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Show me the top 5 customers by total orders..."
          className="min-h-32 resize-none border-zinc-800 bg-black text-white placeholder-zinc-500 focus-visible:ring-zinc-600"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={onRun}
            disabled={!question.trim() || isLoading}
            className="flex-1 bg-white text-black hover:bg-zinc-200"
          >
            <Play className="mr-2 h-4 w-4" />
            Run Query
          </Button>
          <Button
            onClick={onClear}
            variant="outline"
            className="border-zinc-800 bg-black text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
