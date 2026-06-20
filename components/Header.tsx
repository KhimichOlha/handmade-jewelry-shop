import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b px-8 py-4">
      <nav className="flex gap-6 text-lg">
        <Link href="/">Головна</Link>
        <Link href="/products">Каталог</Link>
        <Link href="/cart">Кошик</Link>
        <Link href="/admin">Адмін</Link>
      </nav>
    </header>
  );
}
