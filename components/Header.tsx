import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-extrabold text-pink-600">
          Handmade Jewelry
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" className="rounded-lg px-3 py-2 hover:bg-pink-100">
            Головна
          </Link>

          <Link
            href="/about"
            className="rounded-lg px-3 py-2 hover:bg-pink-100"
          >
            Про нас
          </Link>

          <Link
            href="/products"
            className="rounded-lg px-3 py-2 hover:bg-pink-100"
          >
            Каталог
          </Link>

          <Link
            href="/products/search"
            className="rounded-lg px-3 py-2 hover:bg-pink-100"
          >
            Пошук
          </Link>

          <Link href="/cart" className="rounded-lg px-3 py-2 hover:bg-pink-100">
            Кошик
          </Link>

          <Link
            href="/profile"
            className="rounded-lg px-3 py-2 hover:bg-pink-100"
          >
            Профіль
          </Link>

          <Link
            href="/contacts"
            className="rounded-lg px-3 py-2 hover:bg-pink-100"
          >
            Контакти
          </Link>

          <Link
            href="/admin"
            className="rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
          >
            Адмін
          </Link>
        </div>
      </nav>
    </header>
  );
}
