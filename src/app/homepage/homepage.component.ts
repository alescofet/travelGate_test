import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelServicesService } from './service/hotel-services.service';
import { Hotel } from './util-models/hotel.model';
import { MealPlan } from './util-models/meal-plan.model';
import { MealDisponibility } from './util-models/meal_disponibility.model';
import { NormalisedHotel } from './util-models/normalised-hotel.model';
import { NormalisedRoom } from './util-models/normalised-room.model';
import { RoomDisponibility } from './util-models/room-disponibility.model';
import { Room } from './util-models/room.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  hotels: Hotel[] | undefined = [];
  mealDisponibility: MealDisponibility[] | undefined = [];
  mealPlans: MealPlan[] | undefined = [];
  roomDisponibility: RoomDisponibility[] | undefined = [];
  rooms: Room[] | undefined = [];

  constructor(private hotelSrv: HotelServicesService) {}

  ngOnInit(): void {
    this.recoverAllInfo();
  }

  recoverAllInfo() {
    let loaded = false;

    this.hotelSrv
      .getHotels()
      .subscribe((data: any) => (this.hotels = data.hotels));
    this.hotelSrv
      .getMealDisponibility()
      .subscribe((data: any) => (this.mealDisponibility = data.regimenes));
    this.hotelSrv
      .getMealPlans()
      .subscribe((data: any) => (this.mealPlans = data.meal_plans));
    this.hotelSrv
      .getRoomDisponibility()
      .subscribe((data: any) => (this.roomDisponibility = data.hotels));
    this.hotelSrv.getRooms().subscribe(
      (data: any) => (this.rooms = data.rooms_type),
      null,
      () => this.normalizeHotelData(this.hotels, this.roomDisponibility)
    );
  }

  /*  */

  normalizeHotelData(
    hotelInfo: any,
    roomDisponibility: any
  ): NormalisedHotel[] {
    const normalisedHotelList: NormalisedHotel[] = [];

    const mappedHotels = this.joinHotelsInfo(hotelInfo, roomDisponibility);
    mappedHotels.forEach((hotel: Hotel, index: number) => {
      const { code, city, name } = hotel;
      const normalisedRooms = this.mapRoomInfo(code);

      let normalisedHotel: NormalisedHotel = Object();
      normalisedHotel
        ? ((normalisedHotel.city = city),
          (normalisedHotel.code = code),
          (normalisedHotel.name = name),
          (normalisedHotel.rooms = normalisedRooms))
        : null;
      console.log('hotelNormalised', normalisedHotel);

      normalisedHotelList.push(normalisedHotel);
    });
    console.log(normalisedHotelList);

    return normalisedHotelList;
  }

  mapRoomInfo(code: string) {
    const roomsAvailable: NormalisedRoom[] = [];
    const hotelRooms1 = this.mealDisponibility
      ?.filter((room: MealDisponibility) => {
        return room.hotel.includes(code);
      })
      .map((room: MealDisponibility) => {
        return {
          room_type: room.room_type,
          name: room.room_type == 'st' ? 'Standard' : 'Suite',
          meals_plan: room.code,
          price: room.price,
        };
      });

    const hotelRooms2 = this.mealPlans?.map((room: MealPlan) => {
      const hotelRooms: any[] = [];
      if (room.hotel[code]) {
        room.hotel[code].forEach((hotelRoom) => {
          hotelRooms.push({
            name: hotelRoom.room == 'st' ? 'Standard' : 'Suite',
            room_type: hotelRoom.room,
            price: hotelRoom.price,
            meals_plan: room.code,
          });
        });
      }
      return hotelRooms;
    }).flat();

    return hotelRooms2?.concat(hotelRooms1)
  }

  joinHotelsInfo(hotelInfo1: Hotel[], hotelInfo2: RoomDisponibility[]) {
    const mappedInfo1 = hotelInfo1.map((hotel: Hotel) => ({
      city: hotel.city,
      code: hotel.code,
      name: hotel.name,
    }));
    const mappedInfo2 = hotelInfo2.map((hotel: RoomDisponibility) => ({
      city: hotel.location,
      code: hotel.code,
      name: hotel.name,
    }));
    return [...mappedInfo1, ...mappedInfo2];
  }
}
