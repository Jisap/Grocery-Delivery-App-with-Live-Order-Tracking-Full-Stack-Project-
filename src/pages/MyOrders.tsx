import { useEffect, useState } from "react"
import type { Order } from "../types"
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContex";
import { dummyDashboardOrdersData } from "../assets/assets";


const MyOrders = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$"
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = ["all", "Placed", "Out for Delivery", "Delivered"]

  const { clearCart } = useCart();

  const fetchOrders = async () => {
    setOrders(dummyDashboardOrdersData as any)
    setLoading(false);
  }

  useEffect(() => {  // Si la url tiene el parametro 'cleartCart' limpiar el carrito y la url y acontinuación carga los pedidos
    if (searchParams.get("cleartCart")) {
      clearCart();
      setSearchParams({});
      setTimeout(() => {
        fetchOrders()
      })
    }
  }, [activeTab])

  return (
    <div className="min-h-screen bg-app-cream mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-app-green mb-6">
          My Orders
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                  px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-colors 
                  ${activeTab === tab
                  ? "bg-app-green text-white"
                  : "bg-white text-app-text-light hover:bg-app-cream"
                }
                `}
            >
              {tab === "all" ? "All Orders" : tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
      </div>
    </div>
  )
}

export default MyOrders