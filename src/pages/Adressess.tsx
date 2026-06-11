import React, { useEffect, useState } from 'react'
import type { Address } from '../types'
import { dummyAddressData } from '../assets/assets';

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
    <div>Adressess</div>
  )
}

export default Adressess