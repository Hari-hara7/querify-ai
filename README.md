# Querify AI - Natural Language to SQL Query Tool

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.17-green)

Transform natural language questions into SQL queries using AI. Perfect for data analysts, developers, and anyone who needs to query databases without writing SQL.

## ✨ Features

### Core Features
- 🤖 **AI-Powered SQL Generation** - Convert natural language to PostgreSQL queries using Google Gemini AI
- 📊 **Multiple Chart Types** - Visualize data with bar, line, and pie charts
- 📈 **Real-time Results** - Execute queries and see results instantly
- 🔒 **SQL Safety Validation** - Prevents dangerous operations (only SELECT allowed)
- 💾 **Query History** - Track and replay previous queries
- 📥 **CSV Export** - Download query results as CSV files
- ⚡ **Smart Schema Detection** - Automatically understands your database structure

### Advanced Features
- 🎯 **Intelligent Query Optimization** - AI suggests proper JOINs and aggregations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⌨️ **Keyboard Shortcuts** - Press Ctrl+Enter to run queries
- 🎨 **Beautiful UI** - Modern, gradient-based design with smooth animations
- 🔄 **Schema Caching** - Improved performance with smart caching

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ installed
- PostgreSQL database
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database connection
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"

# Optional: Node environment
NODE_ENV="development"
```

3. **Set up the database**
```bash
# Push Prisma schema to database
npx prisma db push

# Seed with sample data
npx prisma db seed
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Basic Queries

Just type natural language questions:

- "Show me the top 5 products by revenue"
- "How many orders does each user have?"
- "What's the average order value?"
- "List all users who bought a Laptop"
- "Show monthly revenue trend for 2024"

### Query Examples

**Simple Aggregation:**
```
Total number of orders
```

**Top N with Sorting:**
```
Top 10 customers by total spending
```

**Time-based Analysis:**
```
Monthly sales for 2024
```

### Advanced Features

**Query History:**
- Click the "History" button in the header
- View all past queries with row counts and timestamps
- Click any history item to reload that question

**Export Data:**
- After running a query, click "Export CSV"
- Downloads results as a CSV file

**Chart Types:**
- Switch between Bar, Line, and Pie charts
- Only available when results contain numeric data

**Keyboard Shortcuts:**
- `Ctrl + Enter` or `Cmd + Enter` - Run query
- Click example chips for instant queries

## 🗄️ Database Schema

The app comes with a sample e-commerce schema:

### Tables

**users** - Customer information
- `id`, `name`, `email`

**products** - Product catalog
- `id`, `name`, `price`

**orders** - Order records
- `id`, `user_id`, `order_date`, `total`

**order_items** - Order line items
- `id`, `order_id`, `product_id`, `quantity`, `unit_price`

### Sample Data
The seed script creates:
- 8 users
- 8 products  
- 40 orders with random items and dates

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL with Prisma ORM
- **Charts:** Recharts
- **AI:** Google Gemini 2.0 Flash

## 🔐 Security Features

### SQL Injection Prevention
- Only SELECT queries allowed
- Validates against dangerous keywords
- Blocks multiple statements
- Removes SQL comments before execution

## 🐛 Troubleshooting

### Common Issues

**"API key not configured"**
- Ensure `GEMINI_API_KEY` is set in your `.env` file
- Restart the dev server after adding environment variables

**"Database connection failed"**
- Check your `DATABASE_URL` format
- Ensure PostgreSQL is running
- Verify database credentials

**"No tables found"**
- Run `npx prisma db push` to create tables
- Check that you're using the correct database

### Common Next.js Build Errors

1. **Module not found**
```bash
npm install <missing-package>
# or check import paths for typos
```

2. **Type errors (TypeScript)**
```js
// Quick skip during build (not recommended long-term)
// In next.config.js:
typescript: { ignoreBuildErrors: true }
```

3. **use client / use server issues**
- Add `"use client"` at the top of files using hooks or browser APIs
- Do not import server-only code into client components

4. **Environment variables missing**
```bash
# .env.local is not committed, so check all required vars are set
# In Vercel/prod, add them in the dashboard
```

5. **Image or ESLint blocking build**
```js
// next.config.js
eslint: { ignoreDuringBuilds: true }
```

6. **Port or cache issue (local)**
```bash
rm -rf .next
npm run build
```

Drop your error message and I'll give you the exact fix.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `GEMINI_API_KEY`
4. Deploy!

Compatible with: Netlify, Railway, AWS Amplify, Google Cloud Run

## 📈 Performance Tips

1. **Use specific questions** - More specific = better SQL
2. **Include table names** - AI works better with context
3. **Limit large results** - Mention "top 10" or "limit 100"
4. **Use proper date formats** - Specify years/months clearly

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Made with ❤️ using Next.js, TypeScript, and AI
