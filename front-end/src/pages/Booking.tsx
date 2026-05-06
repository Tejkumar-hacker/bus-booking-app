import { useLocation, useNavigate } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bus, seats, total } = location.state || {};

  if (!bus) {
    return <h2>No booking data found</h2>;
  }

  const handleConfirm = () => {
  const existing = JSON.parse(localStorage.getItem("bookings") || "[]");

  const newBooking = {
    id: Date.now(),
    busId: bus.id,
    bus,
    seats,
    total,
  };

  // 🔥 Save booked seats separately
  const bookedSeatsData = JSON.parse(
    localStorage.getItem("bookedSeats") || "{}"
  );

  const currentBusSeats = bookedSeatsData[bus.id] || [];

  bookedSeatsData[bus.id] = [
    ...currentBusSeats,
    ...seats,
  ];

  localStorage.setItem("bookedSeats", JSON.stringify(bookedSeatsData));

  localStorage.setItem(
    "bookings",
    JSON.stringify([...existing, newBooking])
  );

  alert("Booking Confirmed!");
  navigate("/my-bookings");
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
  <div className="bg-white shadow-xl rounded-xl p-6 w-96">
    <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

    <p className="font-semibold">{bus.name}</p>
    <p className="text-gray-600">
      {bus.from} → {bus.to}
    </p>

    <p className="mt-3">Seats: {seats.join(", ")}</p>
    <p className="text-lg font-bold mt-2">₹{total}</p>

    <button
      className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
      onClick={handleConfirm}
    >
      Confirm Booking
    </button>
  </div>
</div>
  );
};

export default Booking;