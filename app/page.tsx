import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">
        <h1>Product Search</h1>
        <p>React + Next.js + TypeScript + Ant Design + TanStack Query</p>
        <p style={{ marginTop: 20 }}>
          <Link href="/search">Open the search page →</Link>
        </p>
      </div>
    </main>
  );
}
