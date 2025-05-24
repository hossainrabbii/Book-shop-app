import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container mx-auto text-center my-20">
      <h3>Congratulations, your order is completed successfully</h3>
      <Link to="order">View Order</Link>
    </div>
  );
};

export default OrderSuccess;
