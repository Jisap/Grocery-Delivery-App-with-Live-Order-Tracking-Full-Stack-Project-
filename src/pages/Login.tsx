import React, { useState } from 'react'
import { heroBg } from '../assets';
import { Link } from 'react-router-dom';
import { Bike } from 'lucide-react';

const Login = () => {

  const [isLoginState, setIsLoginState] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(
      () => window.location.href = "/", 1000
    )
  }


  return (
    <div className='min-h-screen flex'>
      {/* left side */}
      <div className='hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center'>
        <img
          src={heroBg}
          alt="hero-image"
          className="absolute inset-0 object-cover h-full bg-center opacity-10"
        />

        <div className="relative text-center px-12">
          <h2 className='text-4xl font-semibold text-white mb-4'>Welcome back to Instacart</h2>
          <p className='text-white/60 font-serif text-xl max-w-sm mx-auto'>Fresh gorceries and organic produced, delivered to your doorstep</p>

        </div>
      </div>

      {/* Right side */}
      <div className='flex-1 flex-center px-4 py-12 bg-app-cream'>
        <div className='w-full max-w-md'>
          {/* form header message */}
          <div className='text-center mb-8'>
            <Link to="/" className='inline-flex items-center gap-2 mb-6'>
              <Bike className='size-8 text-app-green' />
              <span className='text-2xl font-semibold text-app-green'>Instacart</span>
            </Link>

            <h1></h1>
            <p></p>
          </div>


          {/* Login / Register form */}
        </div>
      </div>
    </div>
  )
}

export default Login