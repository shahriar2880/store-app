import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}