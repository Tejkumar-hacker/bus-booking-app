import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(data);
  }, []);

  // 🔥 DELETE BOOKING
  const handleDelete = (bookingId: number) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const bookingToDelete = allBookings.find(
      (b: any) => b.id === bookingId
    );

    // Remove booking
    const updatedBookings = allBookings.filter(
      (b: any) => b.id !== bookingId
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    // 🔥 Update bookedSeats (free seats)
    const bookedSeatsData = JSON.parse(
      localStorage.getItem("bookedSeats") || "{}"
    );

    const busId = bookingToDelete.busId;

    bookedSeatsData[busId] = (bookedSeatsData[busId] || []).filter(
      (seat: number) => !bookingToDelete.seats.includes(seat)
    );

    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeatsData));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-gray-600">No bookings yet</p>
      )}

      <div className="grid gap-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white shadow rounded-xl p-4"
          >
            <h3 className="font-bold">{b.bus.name}</h3>
            <p className="text-gray-600">
              {b.bus.from} → {b.bus.to}
            </p>
            <p>Seats: {b.seats.join(", ")}</p>
            <p className="font-bold text-green-600">₹{b.total}</p>

            {/* 🔥 CANCEL BUTTON */}
            <button
              className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(b.id)}
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;