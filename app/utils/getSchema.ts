import { db } from "@/lib/db";

export async function getDynamicSchema(): Promise<string> {
  const tables: { table_name: string }[] = await db.$queryRaw`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema='public' AND table_type='BASE TABLE';
  `;

  let schemaDescription = "";

  for (const { table_name } of tables) {
    const columns: { column_name: string; data_type: string }[] = await db.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = ${table_name};
    `;
    schemaDescription += `TABLE ${table_name}(${columns.map(c => `${c.column_name} (${c.data_type})`).join(", ")})\n`;
  }

  const fks: { table_name: string; column_name: string; foreign_table_name: string; foreign_column_name: string }[] =
    await db.$queryRaw`
      SELECT
        tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name
      FROM
        information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
      WHERE constraint_type = 'FOREIGN KEY';
    `;

  if (fks.length > 0) {
    schemaDescription += "ForeignKeys:\n";
    fks.forEach((fk) => {
      schemaDescription += `${fk.table_name}.${fk.column_name} -> ${fk.foreign_table_name}.${fk.foreign_column_name}\n`;
    });
  }

  return schemaDescription;
}
