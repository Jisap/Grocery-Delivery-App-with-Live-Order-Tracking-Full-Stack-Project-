import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContex";
import { useEffect, useState } from "react";
import { dummyAddressData } from "../assets/assets";
import { CheckIcon, CreditCardIcon, MapPinIcon } from "lucide-react";


const Checkout = () => {

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const { items, cartTotal } = useCart();
  const { user } = { user: { addresses: dummyAddressData } } // Aquí TypeScript infiere automáticamente el tipo de user a partir del objeto literal que se le estás asignando.

  const [step, setStep] = useState("address");
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    _id: "",
    label: "Home",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: true,
    lat: 0,
    lng: 0,
  });

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + deliveryFee + tax;

  const steps: { key: string; label: string; icon: typeof MapPinIcon }[] = [
    { key: "address", label: "Address", icon: MapPinIcon },
    { key: "payment", label: "Payment", icon: CreditCardIcon },
    { key: "review", label: "Review", icon: CheckIcon },
  ];

  const handlePlaceOrder = async () => {
    setLoading(true);
    navigate("/orders")
  };

  // Populate address from user's default address
  useEffect(() => {
    if (user?.addresses?.length) {
      const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
      setAddress({
        _id: defaultAddr?._id,
        label: defaultAddr?.label,
        address: defaultAddr?.address,
        city: defaultAddr?.city,
        state: defaultAddr?.state,
        zip: defaultAddr?.zip,
        isDefault: defaultAddr?.isDefault,
        lat: defaultAddr?.lat,
        lng: defaultAddr?.lng,
      });
    }
  }, [user])

  return (
    <div>Checkout</div>
  )
}

export default Checkout