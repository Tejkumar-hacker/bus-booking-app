import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { buses } from "../data/buses";

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bus = buses.find((b) => b.id === Number(id));

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);

  if (!bus) {
    return <h2>Bus not found</h2>;
  }

  // 🔥 Load booked seats from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookedSeats") || "{}");
    setBookedSeats(data[bus.id] || []);
  }, [bus.id]);

  // 🔒 Prevent selecting already booked seats
  const toggleSeat = (seat: number) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleProceed = () => {
    navigate("/booking", {
      state: {
        bus,
        seats: selectedSeats,
        total: selectedSeats.length * bus.price,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">{bus.name}</h2>

      <p className="mb-4 text-gray-600">
        {bus.from} → {bus.to}
      </p>

      {/* 🔥 Seat Grid */}
      <div className="grid grid-cols-4 gap-3 max-w-xs">
        {Array.from({ length: 20 }, (_, i) => {
          const seat = i + 1;
          const selected = selectedSeats.includes(seat);
          const booked = bookedSeats.includes(seat);

          return (
            <div
              key={seat}
              onClick={() => toggleSeat(seat)}
              className={`p-3 rounded-lg text-center font-medium transition
                ${
                  booked
                    ? "bg-red-500 text-white cursor-not-allowed"
                    : selected
                    ? "bg-blue-600 text-white cursor-pointer"
                    : "bg-green-300 hover:bg-green-500 cursor-pointer"
                }`}
            >
              {seat}
            </div>
          );
        })}
      </div>

      {/* 🔥 Legend */}
      <div className="mt-4 flex gap-4 text-sm">
        <span className="text-gray-600">🟩 Available</span>
        <span className="text-gray-600">🟦 Selected</span>
        <span className="text-gray-600">🟥 Booked</span>
      </div>

      <h3 className="mt-6 text-lg font-bold">
        Total: ₹{selectedSeats.length * bus.price}
      </h3>

      <button
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg disabled:bg-gray-400"
        onClick={handleProceed}
        disabled={selectedSeats.length === 0}
      >
        Proceed
      </button>
    </div>
  );
};

export default SeatSelection;