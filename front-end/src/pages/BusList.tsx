import { useLocation, useNavigate } from "react-router-dom";
import { buses } from "../data/buses";

const BusList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { from, to } = location.state || {};

  const filteredBuses = buses.filter((bus) => {
  const fromInput = from?.trim().toLowerCase() || "";
  const toInput = to?.trim().toLowerCase() || "";

  const busFrom = bus.from.toLowerCase();
  const busTo = bus.to.toLowerCase();

  return busFrom.includes(fromInput) && busTo.includes(toInput);
});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
  <h2 className="text-2xl font-bold mb-6">Available Buses</h2>

  <div className="grid gap-4">
    {filteredBuses.map((bus) => (
      <div
        key={bus.id}
        className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition"
      >
        <div>
          <h3 className="text-lg font-bold">{bus.name}</h3>
          <p className="text-gray-600">
            {bus.from} → {bus.to}
          </p>
          <p className="text-sm text-gray-500">{bus.time}</p>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-green-600">
            ₹{bus.price}
          </p>

          <button
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={() => navigate(`/seats/${bus.id}`)}
          >
            Select Seats
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default BusList;