import { db } from "../lib/db";

async function main() {
  // Users
  const users = await Promise.all([
    db.user.create({ data: { name: "Alice", email: "alice@example.com" } }),
    db.user.create({ data: { name: "Bob", email: "bob@example.com" } }),
    db.user.create({ data: { name: "Charlie", email: "charlie@example.com" } }),
  ]);

  // Products
  const products = await Promise.all([
    db.product.create({ data: { name: "Laptop", price: 1000 } }),
    db.product.create({ data: { name: "Phone", price: 500 } }),
    db.product.create({ data: { name: "Headphones", price: 100 } }),
  ]);

  // Orders
  const orders = await Promise.all([
    db.order.create({
      data: {
        userId: users[0].id,
        orderDate: new Date("2024-01-05"),
        total: 1500,
        orderItems: {
          create: [
            { productId: products[0].id, quantity: 1, unitPrice: 1000 },
            { productId: products[1].id, quantity: 1, unitPrice: 500 },
          ],
        },
      },
    }),
    db.order.create({
      data: {
        userId: users[1].id,
        orderDate: new Date("2024-02-10"),
        total: 600,
        orderItems: {
          create: [{ productId: products[1].id, quantity: 1, unitPrice: 500 }],
        },
      },
    }),
    db.order.create({
      data: {
        userId: users[2].id,
        orderDate: new Date("2024-03-15"),
        total: 100,
        orderItems: {
          create: [{ productId: products[2].id, quantity: 1, unitPrice: 100 }],
        },
      },
    }),
  ]);

  console.log("✅ Sample data seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
