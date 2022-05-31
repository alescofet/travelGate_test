import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import axios, { AxiosResponse } from 'axios';
import { Hotel } from '../util-models/hotel.model';
import { Room } from '../util-models/room.model';
import { MealPlan } from '../util-models/meal-plan.model';
import { MealDisponibility } from '../util-models/meal-disponibility.model';
import { RoomDisponibility } from '../util-models/room-disponibility.model';

@Injectable({
  providedIn: 'root',
})
export class HotelServicesService {
  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(
      'http://www.mocky.io/v2/5e4a7e4f2f00005d0097d253'
    );
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(
      'https://run.mocky.io/v3/132af02e-8beb-438f-ac6e-a9902bc67036'
    );
  }

  getMealPlans(): Observable<MealPlan[]> {
    return this.http.get<MealPlan[]>('http://www.mocky.io/v2/5e4a7e282f0000490097d252');
  }

  getRoomDisponibility(): Observable<RoomDisponibility[]> {
    return this.http.get<RoomDisponibility[]>('http://www.mocky.io/v2/5e4e43272f00006c0016a52b');
  }

  getMealDisponibility(): Observable<MealDisponibility[]> {
    return this.http.get<MealDisponibility[]>('http://www.mocky.io/v2/5e4a7dd02f0000290097d24b');
  }
}
