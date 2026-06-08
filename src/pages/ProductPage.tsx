import { Link, useNavigate, useParams } from "react-router-dom"
import { useCart } from "../context/CartContex";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyAddressData, dummyProducts } from "../assets/assets";
import Loading from "../components/Loading";
import { HomeIcon } from "lucide-react";


const ProductPage = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$"
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1)

  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0);
    const product = dummyProducts.find((p) => p._id === id);          // Buscamos el producto por ID
    setProduct(product!);
    setRelatedProducts(dummyProducts.filter((p) => p._id !== id));     // Buscamos productos relacionados (excluyendo el producto actual de la lista)
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />
  if (!product) return null

  const cartItem = items.find((item) => item.product._id === product._id);     // Se usa el id del producto para buscar si ya existe en el carrito
  const inCart = !!cartItem;                                                   // Se convierte a boolean el resultado de buscar el producto en el carrito (True o False)
  const displayQuantity = inCart ? cartItem.quantity : localQuantity           // Se muestra la cantidad del producto en el carrito o la cantidad local
  const categoryLabel = product.category.replace(/-/g, " ");                   // Se reemplaza los guiones por espacios para mostrar la categoría

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link
            to="/"
            className="hover:text-app-green transition-colors"
          >
            <HomeIcon className="size-4" />
          </Link>
          <span>
            /
          </span>
          <Link
            to='/products'
            className="hover:text-app-green transition-colors"
          >
            Products
          </Link>
          <span>
            /
          </span>
          <Link
            to={`/products?category=${product.category}`}
            className="text-app-green transition-colors truncate max-w-[200px]"
          >
            {categoryLabel}
          </Link>
          <span>
            /
          </span>
          <span className="text-app-green font-medium capitalize">
            {product.name}
          </span>

        </nav>
      </div>
    </div>
  )
}

export default ProductPage