import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelServicesService } from './service/hotel-services.service';
import { Hotel } from './util-models/hotel.model';
import { MealPlan } from './util-models/meal-plan.model';
import { MealDisponibility } from './util-models/meal_disponibility.model';
import { NormalisedHotel } from './util-models/normalised-hotel.model';
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
    console.log('recoveredAllInfo');
    let loaded = false

    this.hotelSrv
      .getHotels()
      .subscribe((data: any) => (this.hotels =  data.hotels ));
    this.hotelSrv
      .getMealDisponibility()
      .subscribe(
        (data: any) => (this.mealDisponibility = data.regimenes)
      );
    this.hotelSrv
      .getMealPlans()
      .subscribe((data: any) => (this.mealPlans = data.meal_plans));
    this.hotelSrv
      .getRoomDisponibility()
      .subscribe(
        (data: any) => (this.roomDisponibility = data.hotels)
      );
    this.hotelSrv
      .getRooms()
      .subscribe((data: any) => (this.rooms = data.rooms_type),null,()=>this.mapHotelInfo(this.hotels));

  }

  /* : NormalisedHotel[] */

  mapHotelInfo(hotelInfo: any) {
      const normalisedHotelList: NormalisedHotel[] = [];
      console.log(hotelInfo);

      hotelInfo.forEach((hotel: Hotel, index: number) => {
        console.log(hotel, index);

        const { code, city, name } = hotel;
        let normalisedHotel: NormalisedHotel | undefined;
        normalisedHotel
          ? ((normalisedHotel.city = city),
            (normalisedHotel.code = code),
            (normalisedHotel.name = name)

            )
          : null;


      });

  }

  mapRoomInfo(code: string){
   const hotelRoom = this.rooms?.filter((room: Room)=> {
    return room.hotels.includes(code)
    }
   ).map((room: Room)=> {return({code:room.code,name:room.name})})


    return hotelRoom


  }
}
