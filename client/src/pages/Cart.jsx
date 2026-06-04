import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-5">
        <h1 className="text-4xl font-bold mb-8">My Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl">Cart is Empty</h2>

            <Link to="/" className="text-orange-500">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <h2 className="text-3xl font-bold">Total : ₹{totalPrice}</h2>

              <Link
                to="/checkout"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
