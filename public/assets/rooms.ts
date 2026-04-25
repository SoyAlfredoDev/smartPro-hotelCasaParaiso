import hotels from "./hotels";
import categories from "./categories";

//services : breakfast, wifi, parking, petFriendly, mini bar, tv,

interface Room {
  id: string;
  roomName: string;
  hotelId: string;
  category: string;
  capacity: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  amenities: string[];
}

export default [
  {
    id: "room1",
    roomName: "Habitacion Standard",
    rooomDescription: "Habitacion Standard  ideal para  2 personas",
    hotelId: "hotel-san-miguel",
    category: categories[0].id, //its a reference to category
    capacity: 2,
    name: "Habitacion Standard",
    description: "Habitacion Standard",
    price: 80000,
    images: [
      "/images/Portada_habitación.jpg",
      "/images/Portada_habitación.jpg",
      "/images/Portada_habitación.jpg",
    ],
    amenities: [
      "breakfast",
      "wifi",
      "parking",
      "petFriendly",
      "mini bar",
      "tv",
    ],
  },
  {
    id: "room2",
    name: "Habitacion Vip",
    hotelId: "hotel-san-miguel",
    description: "Habitacion Vip  ideal para  2 personas",
    category: categories[1].id, //its a reference to category
    capacity: 2,
    price: 90000,
    images: ["/images/assest/room/room2.jpg", "/images/assest/room/room3.jpg"],
    amenities: [
      "breakfast",
      "wifi",
      "parking",
      "petFriendly",
      "mini bar",
      "tv",
    ],
  },
  {
    id: "room3",
    hotelId: "hotel-republica",
    name: "Habitacion Familiar",
    description: "Habitacion Familiar  ideal para  4 personas",
    capacity: 4,
    category: categories[2].id, //its a reference to category
    price: 120000,
    images: ["/images/assest/room/room3.jpg"],
    amenities: [
      "breakfast",
      "wifi",
      "parking",
      "petFriendly",
      "mini bar",
      "tv",
    ],
  },
];
