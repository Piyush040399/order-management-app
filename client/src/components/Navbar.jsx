import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-3xl font-bold text-orange-500">
          Foodie
        </Link>

        <Link to="/cart" className="relative text-xl">
          🛒
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
