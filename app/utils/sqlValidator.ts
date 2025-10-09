export function isSafeSQL(sql: string): boolean {
  if (!sql) return false;

  // Remove comments and trim
  const cleaned = sql.replace(/--.*\n/g, "").trim().toLowerCase();

  // Must start with SELECT
  if (!cleaned.startsWith("select")) return false;

  // Forbidden keywords
  const forbidden = ["insert", "update", "delete", "drop", "alter", "truncate"];
  for (const word of forbidden) {
    if (cleaned.includes(word)) return false;
  }

  return true;
}
