
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContex.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CartProvider>                    {/* Se envuelve la aplicacion en el provider del carrito */}
      <App />
    </CartProvider>
  </BrowserRouter>

)
