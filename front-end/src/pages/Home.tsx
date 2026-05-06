import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { buses } from "../data/buses";

const Home = () => {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);

  // 🔹 Extract unique locations
  const locations = Array.from(
    new Set([
      ...buses.map((b) => b.from),
      ...buses.map((b) => b.to),
    ])
  );

  const handleSearch = () => {
    navigate("/buses", {
      state: { from, to },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Search Buses
        </h2>

        {/* FROM INPUT */}
        <div className="relative">
          <input
            className="w-full border p-3 mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="From"
            value={from}
            onChange={(e) => {
              const value = e.target.value;
              setFrom(value);

              if (!value) {
                setFromSuggestions([]);
                return;
              }

              const filtered = locations.filter((loc) =>
                loc.toLowerCase().startsWith(value.toLowerCase())
              );

              setFromSuggestions(filtered);
            }}
          />

          {fromSuggestions.length > 0 && (
            <div className="absolute w-full bg-white border rounded shadow z-10">
              {fromSuggestions.map((item) => (
                <div
                  key={item}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setFrom(item);
                    setFromSuggestions([]);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TO INPUT */}
        <div className="relative mt-4">
          <input
            className="w-full border p-3 mb-2 rounded-lg"
            placeholder="To"
            value={to}
            onChange={(e) => {
              const value = e.target.value;
              setTo(value);

              if (!value) {
                setToSuggestions([]);
                return;
              }

              const filtered = locations.filter((loc) =>
                loc.toLowerCase().startsWith(value.toLowerCase())
              );

              setToSuggestions(filtered);
            }}
          />

          {toSuggestions.length > 0 && (
            <div className="absolute w-full bg-white border rounded shadow z-10">
              {toSuggestions.map((item) => (
                <div
                  key={item}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setTo(item);
                    setToSuggestions([]);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 transition"
          onClick={handleSearch}
        >
          Search Buses
        </button>
      </div>
    </div>
  );
};

export default Home;