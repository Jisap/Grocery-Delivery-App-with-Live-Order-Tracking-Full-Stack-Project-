import React, { useEffect, useState } from 'react'
import type { Address } from '../types'
import { dummyAddressData } from '../assets/assets';
import { MapPinIcon, PlusIcon } from 'lucide-react';
import Loading from '../components/Loading';
import AddressCard from '../components/AddressCard';
import AddressForm from '../components/AddressForm';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import toast from 'react-hot-toast';

const Adressess = () => {

  const { user, updateUser } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  })

  const resetForm = () => {
    setForm({
      label: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const getLocation = (retries = 3): Promise<{ lat: number, lng: number }> => {  // Optiene la ubicacion del usuario con reintentos
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {                                              // 1º verificar si el navegador soporta la geolocalizacion
        reject(new Error("Geolocation not supported"))
        return
      }

      const attempt = () => {                                                  // 2º contabilizamos los reintentos de geolocalizacion
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }), // Obtiene la ubicación
          (error: any) => {                                                                         // En caso de error
            if (retries > 0) {                                                                      // Si quedan reintentos
              retries--                                                                             // Decrementa el contador de reintentos
              setTimeout(attempt, 1000)                                                             // Espera 1 segundo y vuelve a intentarlo
            } else {                                                                                // Si no quedan reintentos
              reject(new Error(error.message || "Failed to get location after retries"))            // Rechaza la promesa con el mensaje de error
            }
          },
          {
            enableHighAccuracy: false,                                                            // Precisión de la ubicación
            timeout: 15000,                                                                       // Tiempo máximo de espera para obtener la ubicación
            maximumAge: 60000                                                                     // Tiempo máximo que se puede usar una ubicación cacheada
          }
        )
      }
      attempt()
    })
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const coords = await getLocation();                                        // Obtenemos la ubicacion del usuario
      const payload = { ...form, ...coords };                                    // Creamos el payload con los datos del formulario y la ubicación

      if (editingId) {                                                           // Si hay un ID de edición
        const { data } = await api.put(`/addresses/${editingId}`, payload)       // Actualizamos la dirección en bd
        setAddresses(data.addresses)                                             // Actualizamos el estado 
        updateUser({ addresses: data.addresses })                                // Actualizamos el usuario en el estado localstorage
        toast.success("Address updated successfully")                            // Mostramos un mensaje de éxito
      } else {                                                                   // Si no hay un ID de edición
        const { data } = await api.post(`/addresses`, payload)                   // Creamos la dirección
        setAddresses(data.addresses)                                             // Actualizamos el estado local
        updateUser({ addresses: data.addresses })                                // Actualizamos el usuario en el estado localstorage
        toast.success("Address added successfully")
      }
      resetForm();                                                               // Reiniciamos el formulario
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error")
    }
  };

  const onEditHandler = (address: Address) => {
    setForm({
      label: address.label,
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      isDefault: address.isDefault,
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  useEffect(() => {
    setAddresses(dummyAddressData);
    setTimeout(() => setLoading(false), 1000)
  }, []);


  return (
    <div className='minh-screen bg-app-cream'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* page header */}
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-2xl font-semibold text-app-greem'>My Addresses</h1>
          <button
            onClick={() => { resetForm(); setShowForm(true) }}
            className='px-4 py-2 bg-app-green text-white text-sm font-semibold rounded-xl hover:bg-app-green-light transition-colors flex items-center gap-2'
          >
            <PlusIcon className='size-4' /> Add Address
          </button>
        </div>

        {/* Form Modal */}
        {showForm && <AddressForm
          resetForm={resetForm}
          handleSubmit={handleSubmit}
          form={form}
          setForm={setForm}
          editingId={editingId}
        />}

        {/* Addresses List */}


        {loading ? (
          <Loading />
        ) : addresses.length === 0 ? (
          <div className='text-center py-16'>
            <MapPinIcon className='size-16 text-app-border mx-auto mb-4' />
            <h2 className='text-lg font-semibold text-app-green mb-2'>No addresses saved</h2>
            <p className='text-sm text-app-text-light'>Add an address for faster checkout</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {addresses.map((add) => (
              <AddressCard
                key={add.id}
                addr={add}
                onEditHandler={onEditHandler}
                setAddresses={setAddresses}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Adressess