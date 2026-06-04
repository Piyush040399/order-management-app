import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <h1 className="text-8xl font-extrabold text-orange-500">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-800">Page Not Found</h2>

      <p className="mt-3 text-gray-500 text-center max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
