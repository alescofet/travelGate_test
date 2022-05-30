import { NormalisedRoom } from "./normalised-room.model";

export interface NormalisedHotel {
  code: string;
  name: string;
  city: string;
  rooms: NormalisedRoom[] | undefined;
}
