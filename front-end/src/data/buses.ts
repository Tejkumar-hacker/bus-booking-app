export interface Bus {
  id: number;
  name: string;
  from: string;
  to: string;
  time: string;
  price: number;
}

export const buses: Bus[] = [
  {
    id: 1,
    name: "Express Travels",
    from: "Hyderabad",
    to: "Bangalore",
    time: "10:00 PM",
    price: 500,
  },
  {
    id: 2,
    name: "City Rider",
    from: "Chennai",
    to: "Bangalore",
    time: "9:00 PM",
    price: 450,
  },
  {
    id: 3,
    name: "Fast Line",
    from: "Hyderabad",
    to: "Chennai",
    time: "8:00 PM",
    price: 600,
  },
];