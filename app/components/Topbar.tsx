"use client";

import React from "react";
import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex min-h-16 w-full items-center gap-3 border-b border-white/10 bg-black/55 px-3 backdrop-blur-xl sm:gap-4 sm:px-6">
      <div className="min-w-0">
        <h1 className="truncate text-sm font-semibold tracking-wide text-white sm:text-lg">
          Querify.AI
        </h1>
        <div className="hidden text-sm text-zinc-400 sm:block">
          Natural language to SQL
        </div>
      </div>

      <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
        <div className="relative hidden min-w-0 lg:block">
          <input
            placeholder="Search"
            className="w-44 rounded-full border border-white/10 bg-white/5 px-3 py-2 pr-9 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-white/20 md:w-64"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        </div>
        <button className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:border-white/20 hover:bg-white/10">
          <Bell className="h-5 w-5 text-zinc-300" />
        </button>
        <div className="h-8 w-8 shrink-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.32),rgba(255,255,255,0.08)_55%,rgba(255,255,255,0.02))]" />
      </div>
    </header>
  );
}
