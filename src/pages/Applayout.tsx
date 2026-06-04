
import { Outlet } from 'react-router-dom'
import Banner from '../components/Banner'
import NavbarComponent from '../components/NavbarComponent'

const Applayout = () => {
  return (
    <>
      <Banner />
      <NavbarComponent />

      <main className='min-h-screen'>
        <Outlet />
      </main>

      <p>footer</p>
      <p>cartsidebar</p>
    </>
  )
}

export default Applayout