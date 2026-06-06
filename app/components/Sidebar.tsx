"use client";

import Link from "next/link";
import { Database, LineChart, History, BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Query", icon: Database },
  { href: "/analytics", label: "Analytics", icon: LineChart },
  { href: "/history", label: "History", icon: History },
  { href: "/docs", label: "Docs", icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="sticky left-0 top-0 z-40 hidden h-screen w-20 shrink-0 border-r border-white/10 bg-black/60 backdrop-blur-xl md:block xl:w-24">
        <div className="flex h-full flex-col items-center gap-6 py-6">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white text-black shadow-lg shadow-black/20"
          >
            <Database className="h-5 w-5" />
          </Link>

          <nav className="flex flex-col gap-2">
            {items.map((it) => {
              const Icon = it.icon;
              const active = pathname === it.href;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${
                    active
                      ? "border-white/15 bg-white/10 text-white shadow-lg shadow-black/15"
                      : "border-transparent text-zinc-500 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                  title={it.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </nav>

          <div className="mb-4 mt-auto">
            <button className="h-10 w-12 rounded-xl border border-white/10 bg-white/5 text-xs text-zinc-300 transition hover:border-white/20 hover:bg-white/10">
              Dev
            </button>
          </div>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 gap-1 rounded-2xl border border-white/10 bg-black/85 p-1.5 shadow-2xl shadow-black/50 backdrop-blur md:hidden">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[11px] transition-colors ${
                active
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "text-zinc-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="max-w-full truncate">{it.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
