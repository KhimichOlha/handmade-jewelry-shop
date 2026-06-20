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
    <div className="rounded-xl border p-4 shadow-sm">
      <img
        src={imageUrl}
        alt={title}
        className="h-48 w-full rounded-lg object-cover bg-gray-100"
      />

      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <p className="mt-3 text-xl font-bold">{price} грн</p>

      <a
        href={`/products/${id}`}
        className="mt-4 block w-full rounded-lg bg-black px-4 py-2 text-center text-white"
      >
        Детальніше
      </a>
    </div>
  );
}
