import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import axios, { AxiosResponse } from 'axios';
import { HotelEsp } from '../util-models/hotel-esp.model';
import { Room } from '../util-models/room.model';
import { MealEsp } from '../util-models/meal-esp.model';
import { MealForeign } from '../util-models/meal-foreign';
import { HotelForeign } from '../util-models/hotel-foreign.model';

@Injectable({
  providedIn: 'root',
})
export class HotelServicesService {
  constructor(private http: HttpClient) {}

  getHotelsEsp(): Observable<HotelEsp[]> {
    return this.http.get<HotelEsp[]>(
      'http://www.mocky.io/v2/5e4a7e4f2f00005d0097d253'
    );
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(
      'https://run.mocky.io/v3/132af02e-8beb-438f-ac6e-a9902bc67036'
    );
  }

  getMealForeign(): Observable<MealEsp[]> {
    return this.http.get<MealEsp[]>('http://www.mocky.io/v2/5e4a7e282f0000490097d252');
  }

  getHotelsForeign(): Observable<HotelForeign[]> {
    return this.http.get<HotelForeign[]>('http://www.mocky.io/v2/5e4e43272f00006c0016a52b');
  }

  getMealEsp(): Observable<MealForeign[]> {
    return this.http.get<MealForeign[]>('http://www.mocky.io/v2/5e4a7dd02f0000290097d24b');
  }
}
