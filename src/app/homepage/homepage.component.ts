import { Component, OnInit } from '@angular/core';
import { HotelServicesService } from './service/hotel-services.service';
import { HotelEsp } from './util-models/hotel-esp.model';
import { MealEsp } from './util-models/meal-esp.model';
import { MealForeign } from './util-models/meal-foreign';
import { NormalisedHotel } from './util-models/normalised-hotel.model';
import { HotelForeign } from './util-models/hotel-foreign.model';
import { Room } from './util-models/room.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  hotelsEsp: HotelEsp[] | undefined = [];
  mealsForeign: MealForeign[] | undefined = [];
  mealsEsp: MealEsp[] | undefined = [];
  hotelsForeign: HotelForeign[] | undefined = [];
  rooms: Room[] | undefined = [];
  normalisedHotelsList: NormalisedHotel[] | undefined = [];
  showHotels: boolean = false
  showJson: boolean = false
  showSelection: boolean = false

  constructor(private hotelSrv: HotelServicesService) {}

  ngOnInit(): void {
    this.recoverAllInfo();
  }

  recoverAllInfo() {
    /* xxxxxxxxxxxxxxxxxxx    Function that recovers all info from each endpoint    xxxxxxxxxxxxxxxxxxx */

    /*
        I used the third parameter of suscribe to launch each call when the previous one is finished and once all information is recovered I launch the function that will
        merge and format all the information(I tried the forkJoin to parallelize the calls, but haven't managed to make it work)
    */


      this.hotelSrv.getHotelsEsp().subscribe(
      (data: any) => (this.hotelsEsp = data.hotels),
      (err) => {
        console.log(err);
      },
      () => {
        this.hotelSrv.getMealEsp().subscribe(
          (data: any) => (this.mealsForeign = data.regimenes),
          (err) => {
            console.log(err);
          },
          () => {
            this.hotelSrv.getMealForeign().subscribe(
              (data: any) => (this.mealsEsp = data.meal_plans),
              (err) => {
                console.log(err);
              },
              () => {
                this.hotelSrv.getHotelsForeign().subscribe(
                  (data: any) => (this.hotelsForeign = data.hotels),
                  (err) => {
                    console.log(err);
                  },
                  () => {
                    this.hotelSrv.getRooms().subscribe(
                      (data: any) => (this.rooms = data.rooms_type),
                      (err) => {
                        console.log(err);
                      },
                      () =>
                        this.normalizeHotelData(
                          this.hotelsEsp,
                          this.hotelsForeign
                        )
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }


  normalizeHotelData(hotelInfo: any, roomDisponibility: any) {

    /* xxxxxxxxxxxxxxxxxxx    Function that merges the already mapped info from hotels, rooms and mealPlans.    xxxxxxxxxxxxxxxxxxx */

    const normalisedHotelList: NormalisedHotel[] = [];

    const mappedHotels = this.joinHotelsInfo(hotelInfo, roomDisponibility);
    mappedHotels.forEach((hotel: HotelEsp, index: number) => {
      const { code, city, name } = hotel;
      const normalisedRooms = this.mapRoomInfo(code);

      let normalisedHotel: NormalisedHotel = Object();
      normalisedHotel
        ? ((normalisedHotel.city = city),
          (normalisedHotel.code = code),
          (normalisedHotel.name = name),
          (normalisedHotel.rooms = [normalisedRooms].flat()))
        : null;

      normalisedHotelList.push(normalisedHotel);
    });
    this.normalisedHotelsList = normalisedHotelList;
  }

  mapRoomInfo(code: string) {

    /* xxxxxxxxxxxxxxxxxxx    Function that maps the room info for each hotel    xxxxxxxxxxxxxxxxxxx */

    const hotelRooms1 = this.mealsForeign  // filter through the rooms selecting only the selected foreign hotels
      ?.filter((room: MealForeign) => {
        return room.hotel.includes(code);
      })
      .map((room: MealForeign) => {
        return {                            // map the room info to normalised format
          room_type: room.room_type,
          name: room.room_type == 'st' ? 'Standard' : 'Suite',
          meals_plan: room.code,
          price: room.price,
        };
      });

    const hotelRooms2 = this.mealsEsp
      ?.map((room: MealEsp) => {
        const hotelRooms: any[] = [];
        if (room.hotel[code]) {                   // filter through the rooms selecting only the selected hotel and map the room to fit the normalised format
          room.hotel[code].forEach((hotelRoom) => {
            hotelRooms.push({
              name:
                hotelRoom.room[0].toUpperCase() + hotelRoom.room.substring(1),
              room_type: hotelRoom.room == 'standard' ? 'st' : 'su',
              price: hotelRoom.price,
              meals_plan: room.code,
            });
          });
        }

        return hotelRooms;
      })
      .flat();

    return hotelRooms2?.concat(hotelRooms1);        // concatenate both arrays of normalised rooms to make one and return it
  }

  joinHotelsInfo(hotelEsp: HotelEsp[], hotelforeign: HotelForeign[]) {

/* xxxxxxxxxxxxxxxxxxx    Function that maps and merges the different hotel data into one array    xxxxxxxxxxxxxxxxxxx */

    const mappedInfo1 = hotelEsp.map((hotel: HotelEsp) => ({
      city: hotel.city,
      code: hotel.code,
      name: hotel.name,
    }));
    const mappedInfo2 = hotelforeign.map((hotel: HotelForeign) => ({
      city: hotel.location,
      code: hotel.code,
      name: hotel.name,
    }));
    return [...mappedInfo1, ...mappedInfo2];
  }

  switchView(selection: string){
    switch (selection) {
      case "hotel":
        this.showHotels = true
        this.showJson = false
        this.showSelection = false
        return null

      case "json":
        this.showHotels = false
        this.showJson = true
        this.showSelection = false
        return null

      case "selection":
        this.showHotels = false
        this.showJson = false
        this.showSelection = true
        return null


      default:
        return null

    }
  }
}
