import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import {
  useGetAllOrdersQuery,
  useGetOrderByEmailIdMutation,
} from "../redux/features/order/orderApi";
import { useEffect } from "react";
import { Spinner } from "../utils/spinner";
import { Link } from "react-router-dom";

interface OrderItem {
  _id: string;
  title: string;
  author: string;
  imageId: string;
  bookId: string;
  unitPrice: number;
  quantity: number;
  deliveryFee: number;
  totalPrice: number;
  shipped: boolean;
  delivered: boolean;
  createdAt: string;
  name: string;
  phone: number;
  address: string;
  userId: {
    name: string;
    email: string;
  };
}

const OrderItem = () => {
  const user = useAppSelector(selectCurrentUser);
  const emailId = user?.email;

  const [getOrderByEmailId, { data: userOrders, isLoading: userLoading }] =
    useGetOrderByEmailIdMutation();

  const { data: allOrders, isLoading: adminLoading } =
    useGetAllOrdersQuery(undefined);

  // Fetch orders by email when user is a regular user
  useEffect(() => {
    if (user?.role === "user" && emailId) {
      getOrderByEmailId(emailId);
    }
  }, [emailId, getOrderByEmailId, user?.role]);

  // Loading state
  if (userLoading || adminLoading) return <Spinner />;

  // Determine which orders to show
  const displayOrders =
    user?.role === "admin" ? allOrders?.data : userOrders?.data;
  console.log(displayOrders);
  return (
    <div>
      <title>My Orders</title>

      {displayOrders?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {displayOrders.map((order: OrderItem) => (
            <div
              key={order._id}
              className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 shadow-lg rounded-xl p-6 transition hover:scale-[1.01]"
            >
              <div className="flex gap-2 flex-col lg:flex-row">
                <div className="img w-1/6">
                  <img src={order?.imageId} alt="" className="w-full" />
                </div>
                <div className="flex-1">
                  {" "}
                  <div className="mb-3">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Link to={`/book/${order?.bookId}`}>{order.title}</Link>
                    </h2>
                    <p className="text-sm text-gray-500">by {order.author}</p>
                  </div>
                  <div className="text-sm text-gray-700 grid grid-cols-2 gap-2">
                    <div>
                      <p>
                        📦 Quantity:{" "}
                        <span className="font-semibold">{order.quantity}</span>
                      </p>
                      <p>
                        💰 Unit Price:{" "}
                        <span className="font-semibold">
                          ৳{order.unitPrice}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        🚚 Delivery Fee:{" "}
                        <span className="font-semibold">
                          ৳{order.deliveryFee}
                        </span>
                      </p>
                      <p>
                        🧾 Total:{" "}
                        <span className="text-orange-600 font-bold">
                          ৳{order.totalPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t my-4 border-dashed border-gray-300" />

              <div className="text-sm text-gray-600 flex justify-between items-start">
                <div>
                  <p>👤 {order.name}</p>
                  <p>📞 {order.phone}</p>
                  <p>📬 {order.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <span
                    className={`mt-1 inline-block px-3 py-1 text-xs rounded-full font-medium ${
                      order.delivered
                        ? "bg-green-100 text-green-700"
                        : order.shipped
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.delivered
                      ? "✅ Delivered"
                      : order.shipped
                      ? "📦 Shipped"
                      : "⌛ Pending"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">No orders found</p>
      )}
    </div>
  );
};

export default OrderItem;
