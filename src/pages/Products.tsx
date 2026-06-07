
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom'
import type { Product } from '../types';
import { categoriesData, dummyProducts } from '../assets/assets';
import { ChevronDown, Home, SlidersHorizontal } from 'lucide-react';

const Products = () => {

  // Estados para los parametros de la URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Estados para los productos, total de paginas y carga
  const [products, setProducts] = useState<Product[]>([])
  const [totalpages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Estado para los filtros mobile
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Obtenemos los parámetros de la URL
  const category = searchParams.get('category') || '';
  const organic = searchParams.get('organic') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page')) || '1';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const fetchProducts = async () => {
    setLoading(true);
    setProducts(
      dummyProducts.filter((p) => p.category === category || category === "") // Filtra los productos por categoría
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams, organic, sort, page, minPrice, maxPrice]);

  const updateFilter = (key: string, value: string) => {          // Actualiza los filtros
    const newParams = new URLSearchParams(searchParams);          // Crear una copia de los parametros actuales de la URL
    if (value) {                                                   // Si hay un valor, establecer el parametro 
      newParams.set(key, value)
    } else {                                                      // Si no hay valor, eliminar el parametro
      newParams.delete(key);
    }
    if (key !== "page") {                                           // Si la clave no es "page", eliminar "page"
      newParams.delete("page")
    }
    setSearchParams(newParams)                                    // Actualizar los parametros de la URL
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const activeCategory = categoriesData.find((c) => c.slug === category); // Busca la categoría activa

  const hasFilters = category || organic || minPrice || maxPrice;        // Verifica si hay filtros activos

  return (
    <div className='min-h-screen bg-app-cream'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {/* Breadcrumb */}
        <nav className='flex items-center gap-2 text-sm text-app-text-light mb-6'>
          <Link to='/' className='hover:text-app-green transition-colors'>
            <Home className='size-4' />
          </Link>

          <span>/</span>

          <span className='text-app-green font-medium'>{activeCategory ? activeCategory.name : "All Products"}</span>
        </nav>

        <div className='flex gap-8 xl:gap-10'>
          {/* Sidebar - desktop */}
          <aside className='hidden lg:block w-64 shrink-0'>
            <div className='bg-white rounded-2xl p-4 sticky top-24'>
              <p>Filter</p>
            </div>
          </aside>

          {/* Main Content */}
          <main className='flex-1'>
            {/* header */}
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h1 className='text-2xl font-semibold text-app-green'>{activeCategory ? activeCategory.name : "All Products"}</h1>
                <p className='text-sm text-app-text-light mt-0.5'>{products.length} products found</p>
              </div>

              <div className='flex flex-col lg:items-center gap-3'>
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className='lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-xl border border-app-border hover:bg-app-cream transition-colors'
                >
                  <SlidersHorizontal className='size-4' /> Filters
                </button>

                {/* Sort */}
                <div className='relative'>
                  <select
                    value={sort}
                    onChange={(e) => updateFilter("sort", e.target.value)}
                    className='appearance-none pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer'
                  >
                    <option value="">Newest</option>
                    <option value="price_asc">Price: Low ➝ High</option>
                    <option value="price_desc">Price: High ➝ Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">A ➝ Z</option>
                  </select>

                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-light pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product grid */}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Products