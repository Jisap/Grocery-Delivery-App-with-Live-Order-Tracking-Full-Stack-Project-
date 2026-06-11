import React, { useEffect, useState } from 'react'
import type { Address } from '../types'
import { dummyAddressData } from '../assets/assets';
import { PlusIcon } from 'lucide-react';

const Adressess = () => {

  const [addresses, setAddressed] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
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
    setEditing(null);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
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
    setEditing(address._id);
    setShowForm(true);
  };

  useEffect(() => {
    setAddressed(dummyAddressData);
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
      </div>
    </div>
  )
}

export default Adressess