import { useState } from "react";

interface Props {
  totalSeats: number;
  price: number;
}

const SeatLayout = ({ totalSeats, price }: Props) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const toggleSeat = (seat: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 50px)", gap: "10px" }}>
        {Array.from({ length: totalSeats }, (_, i) => {
          const seatNumber = i + 1;
          const isSelected = selectedSeats.includes(seatNumber);

          return (
            <div
              key={seatNumber}
              onClick={() => toggleSeat(seatNumber)}
              style={{
                padding: "10px",
                background: isSelected ? "blue" : "green",
                color: "white",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>

      <h3>Total: ₹{selectedSeats.length * price}</h3>
    </div>
  );
};

export default SeatLayout;