import Link from "next/link";

type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ProductCard({
  id,
  title,
  description,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
      <img
        src={imageUrl}
        alt={title}
        className="h-64 w-full bg-pink-50 object-cover"
      />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>

        <p className="mt-2 line-clamp-4 text-sm leading-6 text-gray-600">
          {description}
        </p>

        <p className="mt-4 text-2xl font-bold text-pink-600">{price} грн</p>

        <Link
          href={`/products/${id}`}
          className="mt-auto block rounded-xl bg-pink-600 px-4 py-3 text-center font-semibold text-white hover:bg-pink-700"
        >
          Детальніше
        </Link>
      </div>
    </div>
  );
}
