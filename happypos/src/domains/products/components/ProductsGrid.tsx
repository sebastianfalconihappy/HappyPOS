type Props = {
  category: string;
};

const productsMock = [
  {
    id: "1",
    name: "Honor 400 Lite",
    brand: "Honor",
    category: "phones",
    codigoBarra: "1234567890123",
    imei: "356789012345678",
    price: 200.99,
    stock: 15,
    image: "HONOR-400-LITE-NEGRO.png",
  },
  {
    id: "2",
    name: "Infinix Hot 50I",
    brand: "Infinix",
    category: "phones",
    codigoBarra: "9876543210987",
    imei: "456789012345678",
    price: 350.99,
    stock: 12,
    image: "CELULAR-INFINIX-HOT-50I-GRIS.jpg",
  },
  {
    id: "3",
    name: "Realme C75",
    brand: "Realme",
    category: "phones",
    codigoBarra: "5678901234567",
    imei: "556789012345678",
    price: 250.99,
    stock: 8,
    image: "REALME-C75-NEGRO.png",
  },
  {
    id: "4",
    name: "Mica Mate",
    brand: "Mica",
    category: "accessories",
    codigoBarra: "6789012345678",
    price: 1.99,
    stock: 50,
    image: "Mica-Matte.png",
  },
];

export default function ProductsGrid({ category }: Props) {
  const filteredProducts =
    category === "all"
      ? productsMock
      : productsMock.filter(
          (product) => product.category === category
        );

  return (
    <div className="grid grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition"
        >
          <div className="h-36 rounded-lg mb-4 overflow-hidden bg-black/20 flex items-center justify-center">
            <img
              src={`/src/assets/images/${product.image}`}
              alt={product.name}
              className="h-full object-contain"
            />
          </div>

          <p className="text-sm text-white/60">{product.brand}</p>
          <h3 className="font-semibold">{product.name}</h3>

          <div className="flex items-center justify-between mt-4">
            <span className="font-bold text-lg">
              ${product.price}
            </span>
            <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg">
              +
            </button>
          </div>

          <div className="text-xs text-white/50 mt-2 space-y-1">
            <p>Stock: {product.stock}</p>
            {product.imei && <p>IMEI: {product.imei}</p>}
            <p>Código: {product.codigoBarra}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
