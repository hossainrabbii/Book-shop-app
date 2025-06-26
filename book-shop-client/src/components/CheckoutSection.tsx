import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAddorderMutation } from "../redux/features/order/orderApi";
import { toast } from "react-toastify";

//
type CheckoutProps = {
  bookPrice: number;
  selectedQty: number;
  title: string;
  author: string;
  imageId: string;
  bookId: string;
};

const bangladeshDistricts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chapai Nawabganj",
  "Chattogram",
  "Chuadanga",
  "Comilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jessore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
];

export default function CheckoutSection({
  bookPrice,
  selectedQty,
  title,
  author,
  imageId,
  bookId,
}: CheckoutProps) {
  const onlineFee = 60;
  const subtotal = bookPrice * selectedQty;
  const total = subtotal + onlineFee;
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  console.log(bookId);
  const userId = user?.id;
  const [shippingInfo, setShippingInfo] = useState({
    email: user?.email,
    name: "",
    userId,
    phone: "",
    city: "",
    address: "",
    imageId: imageId,
    bookId,
    title,
    author,
    unitPrice: bookPrice,
    quantity: selectedQty,
    deliveryFee: onlineFee,
    totalPrice: total,
    shipped: false,
    delivered: false,
  });
  console.log(shippingInfo);
  useEffect(() => {
    setShippingInfo((prev) => ({
      ...prev,
      quantity: selectedQty,
      totalPrice: selectedQty * bookPrice + onlineFee,
    }));
  }, [selectedQty]);
  const [addOrder] = useAddorderMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = { ...shippingInfo };

    // Validation
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (!user) {
      navigate("/login");
    } else {
      try {
        const res = await addOrder(orderData).unwrap();

        if (res?.data.payment.checkout_url) {
          window.location.href = res?.data.payment.checkout_url;
        }
      } catch (error) {
        toast.error("Failed to place order");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="bg-white shadow-md p-4 rounded-md border border-[#DDDDDD]">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-[#DDDDDD] px-3 py-2 rounded"
            required
            value={shippingInfo.name}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, name: e.target.value })
            }
            placeholder="Your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">District</label>
          <select
            className="w-full border border-[#DDDDDD] px-3 py-2 rounded"
            required
            value={shippingInfo.city}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, city: e.target.value })
            }
          >
            <option value="">Select your district</option>
            {bangladeshDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Phone</label>
          <input
            type="number"
            className="w-full border border-[#DDDDDD] px-3 py-2 rounded"
            required
            value={shippingInfo.phone}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, phone: e.target.value })
            }
            placeholder="Phone number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Detail Address</label>
          <textarea
            className="w-full border border-[#DDDDDD] px-3 py-2 rounded"
            required
            value={shippingInfo.address}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, address: e.target.value })
            }
            placeholder="Street, City, Postal Code..."
          ></textarea>
        </div>
      </div>

      {/* Checkout Summary */}
      <div className="bg-white shadow-md p-4 rounded-md border border-[#DDDDDD]">
        <h2 className="text-xl font-semibold mb-4">Checkout Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal} ৳</span>
          </div>
          <div className="flex justify-between">
            <span>Online Fee</span>
            <span>{onlineFee} ৳</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{total} ৳</span>
          </div>
          <div className="flex justify-between font-bold text-lg  pt-2">
            <span>Payable Total</span>
            <span>{total} ৳</span>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}
