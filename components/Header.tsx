import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-3xl font-extrabold text-pink-600">
          Handmade Jewelry
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-base font-medium">
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
            href="/admin/products"
            className="rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
          >
            Адмін
          </Link>
        </div>
      </nav>
    </header>
  );
}
