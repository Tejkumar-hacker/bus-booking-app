import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md sticky top-0">
      <h1 className="text-2xl font-bold tracking-wide">
        🚍 Bus Booking
      </h1>

      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:text-yellow-400 transition">
          Home
        </Link>
        <Link to="/buses" className="hover:text-yellow-400 transition">
          Buses
        </Link>
        <Link to="/my-bookings" className="hover:text-yellow-400 transition">
          My Bookings
        </Link>
      </div>
    </div>
  );
};

export default Navbar;