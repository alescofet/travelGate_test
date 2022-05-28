export interface NormalisedHotel {
  code: string;
  name: string;
  city: string;
  rooms: {
    name: string;
    room_type: string;
    meals_plan: string;
    price: number;
  };
}
