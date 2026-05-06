import { useNavigate } from "react-router-dom";
import type { Bus } from "../types/bus";

const BusCard = ({ bus }: { bus: Bus }) => {
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{bus.name}</h3>
      <p>{bus.from} → {bus.to}</p>
      <p>{bus.time}</p>
      <p>₹{bus.price}</p>

      <button onClick={() => navigate(`/seats/${bus.id}`)}>
        Select Seats
      </button>
    </div>
  );
};

export default BusCard;