import { Component, Input, OnInit } from '@angular/core';
import { MealEnum } from '../../util-enums/meal-enum.enum';
import { RoomTypeEnum } from '../../util-enums/room-type-enum.enum';
import { NormalisedHotel } from '../../util-models/normalised-hotel.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  @Input() hotel: NormalisedHotel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  checkMealPlan(code: string){
    switch (code) {
      case "pc":
        return MealEnum.pc
        break;
      case "mp":
        return MealEnum.mp
        break;
      case "sa":
        return MealEnum.sa
        break;
      case "ad":
        return MealEnum.ad
        break;

      default:
        return null
        break;
    }

  }


}
