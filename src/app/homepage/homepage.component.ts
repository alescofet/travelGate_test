import { Component, OnInit } from '@angular/core';
import { HotelServicesService } from './service/hotel-services.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private hotelSrv: HotelServicesService) { }

  ngOnInit(): void {
    this.hotelSrv.getHotels()
    this.hotelSrv.getMealDisponibility()
    this.hotelSrv.getMealPlans()
    this.hotelSrv.getRoomDisponibility()
    this.hotelSrv.getRooms()
  }

}
