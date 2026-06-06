"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Database, Zap, Shield, TrendingUp } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";

export default function DocsPage() {
  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-5xl space-y-6 lg:space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-6 lg:p-8">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Documentation
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Learn how to use Querify AI effectively on any screen size.
          </p>
        </div>

        <div className="space-y-8">
          {/* Getting Started */}
          <AnimatedCard
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            glowColor="255, 255, 255"
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-white">Getting Started</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-300">
                <p>
                  Querify AI transforms natural language questions into SQL queries
                  using advanced AI. Simply type your question and let the AI do
                  the rest.
                </p>
                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-zinc-400 mb-2">Example:</p>
                  <p className="font-mono text-sm text-zinc-200">
                    "Show me the top 5 customers by total orders"
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Database Schema */}
          <AnimatedCard
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            glowColor="255, 255, 255"
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-white">Database Schema</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-zinc-300">
              <p>Our database consists of 4 main tables:</p>
              
              <div className="space-y-3">
                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <h4 className="font-medium text-white mb-2">users</h4>
                  <p className="text-sm text-zinc-400">
                    Stores customer information
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      id
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      name
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      email
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <h4 className="font-medium text-white mb-2">products</h4>
                  <p className="text-sm text-zinc-400">
                    Product catalog with pricing
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      id
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      name
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      price
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <h4 className="font-medium text-white mb-2">orders</h4>
                  <p className="text-sm text-zinc-400">
                    Customer orders with dates and totals
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      id
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      user_id
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      order_date
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      total
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <h4 className="font-medium text-white mb-2">order_items</h4>
                  <p className="text-sm text-zinc-400">
                    Individual items within orders
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      id
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      order_id
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      product_id
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      quantity
                    </Badge>
                    <Badge className="bg-blue-950/30 border-blue-700 text-blue-400">
                      unit_price
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* Query Examples */}
          <AnimatedCard
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            glowColor="132, 0, 255"
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                </div>
                <CardTitle className="text-white">Query Examples</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-zinc-300">
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">Analytics queries:</p>
                <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                  <p className="text-sm text-emerald-400 font-mono">
                    What's the average order value?
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                  <p className="text-sm text-emerald-400 font-mono">
                    Show me total revenue by month
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-zinc-400">Customer insights:</p>
                <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                  <p className="text-sm text-emerald-400 font-mono">
                    Who are the top 10 customers by spending?
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                  <p className="text-sm text-emerald-400 font-mono">
                    List customers who haven't ordered in 30 days
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-zinc-400">Product analysis:</p>
                <div className="bg-black border border-zinc-800 rounded-lg p-3">
                  <p className="text-sm text-emerald-400 font-mono">
                    What are the best selling products?
                  </p>
                </div>
                <div className="bg-black border border-zinc-800 rounded-lg p-3">
                  <p className="text-sm text-emerald-400 font-mono">
                    Show products with prices above $50
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* Security */}
          <AnimatedCard
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            glowColor="132, 0, 255"
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                  <Shield className="w-5 h-5 text-red-400" />
                </div>
                <CardTitle className="text-white">Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-zinc-300">
              <p>All queries are validated for safety before execution:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>Only SELECT queries are allowed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>SQL injection patterns are blocked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>No destructive operations (DROP, DELETE, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>AI-generated queries are sanitized</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* Best Practices */}
          <AnimatedCard
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            glowColor="132, 0, 255"
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Best Practices</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-zinc-300">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Be specific in your questions for better results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Use exact table and column names when you know them</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Remember column names use snake_case (e.g., user_id, order_date)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Use Ctrl+Enter keyboard shortcut to run queries quickly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Export results to CSV for further analysis</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
