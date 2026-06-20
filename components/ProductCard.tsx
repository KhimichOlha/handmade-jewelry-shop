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
    <div className="card-hover overflow-hidden rounded-2xl border bg-white shadow-sm">
      <img src={imageUrl} alt={title} className="h-56 w-full object-cover" />

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>

        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{description}</p>

        <p className="mt-4 text-2xl font-bold text-pink-600">{price} грн</p>

        <a
          href={`/products/${id}`}
          className="mt-4 block rounded-xl bg-pink-600 px-4 py-3 text-center font-semibold text-white hover:bg-pink-700 hover:text-white"
        >
          Детальніше
        </a>
      </div>
    </div>
  );
}
