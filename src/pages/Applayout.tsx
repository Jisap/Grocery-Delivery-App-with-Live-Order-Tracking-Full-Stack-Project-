
import { Outlet } from 'react-router-dom'
import Banner from '../components/Banner'
import NavbarComponent from '../components/NavbarComponent'
import Footer from '../components/Footer'

const Applayout = () => {
  return (
    <>
      <Banner />
      <NavbarComponent />

      <main className='min-h-screen'>
        <Outlet />
      </main>

      <Footer />
      <p>cartsidebar</p>
    </>
  )
}

export default Applayout