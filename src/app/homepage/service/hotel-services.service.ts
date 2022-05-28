import { Injectable } from '@angular/core';
import axios from 'axios';
import { Hotel } from '../util-models/hotel.model';


@Injectable({
  providedIn: 'root'
})
export class HotelServicesService {

  constructor() { }

  getHotels(){
    axios.get('http://www.mocky.io/v2/5e4a7e4f2f00005d0097d253')
    .then((result) => {
      console.log('hotels',result.data);

      return result.data
    })
    .catch((err) => {
      console.log(err)
    });

  }

  getRooms(){
    axios.get('https://run.mocky.io/v3/132af02e-8beb-438f-ac6e-a9902bc67036')
    .then((result) => {
      console.log('rooms',result.data);
      return result.data
    })
    .catch((err) => {
      console.log(err)
    });

  }

  getMealPlans(){
    axios.get('http://www.mocky.io/v2/5e4a7e282f0000490097d252')
    .then((result) => {
      console.log('meal_plans',result.data);
      return result.data
    })
    .catch((err) => {
      console.log(err)
    });

  }

  getRoomDisponibility(){
    axios.get('http://www.mocky.io/v2/5e4a7e282f0000490097d252')
    .then((result) => {
      console.log('room disponibility',result.data);
      return result.data
    })
    .catch((err) => {
      console.log(err)
    });

  }

  getMealDisponibility(){
    axios.get('http://www.mocky.io/v2/5e4a7dd02f0000290097d24b')
    .then((result) => {
      console.log('meal disponibility',result.data);
      return result.data
    })
    .catch((err) => {
      console.log(err)
    });

  }


}


