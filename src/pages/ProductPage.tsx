import { Link, useNavigate, useParams } from "react-router-dom"
import { useCart } from "../context/CartContex";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyAddressData, dummyProducts } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowLeftIcon, HomeIcon, LeafIcon, Star, StarIcon } from "lucide-react";


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

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex  items-center gap-1.5 text-sm text-app-text-light hover:text-app-green transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back
        </button>

        {/* Products Details Section */}
        <div className="bg-white/50 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Image */}
            <div className="relative flex-center p-8 md:p-12 min-h-[320px] md:min-h-[480px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[360px] w-auto object-contain"
              />

              {/* Badges */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
                {product.isOrganic && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full">
                    <LeafIcon className="w-3 h-3" />
                    Organic
                  </span>
                )}

                {product.discount > 0 && (
                  <span className="px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Right side - details */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-medium text-app-text-light tracking-wide mb-2 capitalize">
                {categoryLabel}
              </span>

              <h1 className="text-2xl md:text-3xl font-semibold text-app-green mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${i <= Math.round(product.rating) ? "text-app-warning fill-app-warning" : "text-app-border"}`}
                      />
                    ))}
                  </div>

                  <span className="text-sm font-medium">{product.rating}</span>

                  <span className="text-sm text-app-text-light">({product.reviewCount} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl md:text-4xl font-semibold text-app-green" >
                  {currency}{product.price.toFixed(2)}
                </span>

                {product.originalPrice > product.price && (
                  <span className="text-lg text-app-text-light line-through">
                    {currency}{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-app-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-sm text-app-success font-medium">
                    ✓ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-sm text-app-error font-medium">Out of stock</span>
                )}
              </div>

              {/* Quantity + Add to cart */}

            </div>
          </div>
        </div>
        {/* customer Reviews */}

        {/* Related Products */}
      </div>
    </div>
  )
}

export default ProductPage