import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // Upsert users (idempotent pattern similar to your example)
  const userSeed = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
    { name: "Diana", email: "diana@example.com" },
    { name: "Ethan", email: "ethan@example.com" },
    { name: "Frank", email: "frank@example.com" },
    { name: "Grace", email: "grace@example.com" },
    { name: "Hannah", email: "hannah@example.com" },
  ];

  const users = await Promise.all(
    userSeed.map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: { name: u.name },
        create: { email: u.email, name: u.name },
      })
    )
  );

  // Ensure products exist (no unique constraint on name, so find-or-create)
  const productSeed = [
    { name: "Laptop", price: 1200 },
    { name: "Phone", price: 800 },
    { name: "Tablet", price: 600 },
    { name: "Monitor", price: 300 },
    { name: "Keyboard", price: 100 },
    { name: "Mouse", price: 50 },
    { name: "Headphones", price: 150 },
    { name: "Speaker", price: 200 },
  ];

  const products = [] as any[];
  for (const p of productSeed) {
    const found = await prisma.product.findFirst({ where: { name: p.name } });
    if (found) {
      // Update price in case it changed
      const updated = await prisma.product.update({ where: { id: found.id }, data: { price: p.price } });
      products.push(updated);
    } else {
      const created = await prisma.product.create({ data: { name: p.name, price: p.price } });
      products.push(created);
    }
  }

  // Clear existing orders/order_items to keep seed idempotent (optional but useful)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  // Create orders (idempotent because we cleared existing orders)
  const ordersToCreate = 40;
  for (let i = 0; i < ordersToCreate; i++) {
    const user = users[randomInt(0, users.length - 1)];
    const itemCount = randomInt(1, 4);
    const orderItems = [] as { productId: number; quantity: number; unitPrice: number }[];
    let total = 0;

    for (let j = 0; j < itemCount; j++) {
      const prod = products[randomInt(0, products.length - 1)];
      const qty = randomInt(1, 3);
      orderItems.push({ productId: prod.id, quantity: qty, unitPrice: prod.price });
      total += prod.price * qty;
    }

    const msInDay = 24 * 60 * 60 * 1000;
    const orderDate = new Date(Date.now() - randomInt(0, 365) * msInDay - randomInt(0, msInDay));

    await prisma.order.create({
      data: {
        userId: user.id,
        orderDate,
        total: Math.round(total * 100) / 100,
        orderItems: { create: orderItems },
      },
    });
  }

  const ordersCount = await prisma.order.count();

  console.log(`Seed finished: ${users.length} users, ${products.length} products, ${ordersCount} orders`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
