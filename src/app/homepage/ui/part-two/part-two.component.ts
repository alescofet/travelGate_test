import { Component, Input, OnInit } from '@angular/core';
import { CitiesEnum } from '../../util-enums/cities-enum.enum';
import { MealEnum } from '../../util-enums/meal-enum.enum';
import { NormalisedHotel } from '../../util-models/normalised-hotel.model';
import { NormalisedRoom } from '../../util-models/normalised-room.model';

@Component({
  selector: 'app-part-two',
  templateUrl: './part-two.component.html',
  styleUrls: ['./part-two.component.scss']
})
export class PartTwoComponent implements OnInit {
  @Input() hotelsList: NormalisedHotel[] | undefined;
  selectedRooms: {malaga: NormalisedHotel | undefined, cancun: NormalisedHotel} | undefined
  nightsCancun: number = 5
  nightsMalaga: number = 3


  constructor() { }

  ngOnInit(): void {
    this.selectedRooms = this.selectOnlyBreakfastCancun(700,this.nightsCancun,this.nightsMalaga)

  }

  selectBestMalaga(limit: number, nights: number){
    // function that filters the hotels to get the malaga one and then selects the best possible room without trespassing the limit left.
   const hotelMalaga = this.hotelsList?.filter((hotel)=> hotel.city === CitiesEnum.MALAGA)[0]
   console.log("hotelMalaga",hotelMalaga);

   const selectedRoom = hotelMalaga?.rooms?.filter((room) => room.price*nights < limit).sort((a,b) => b.price - a.price)[0]
   console.log("selectedRoomMalaga",selectedRoom);

   if(selectedRoom && hotelMalaga){
     hotelMalaga.rooms = [selectedRoom]
     return hotelMalaga
   } else {
    console.error("There are options that fits your preferences, try to change them.")
    return undefined
   }
  }

  selectOnlyBreakfastCancun(limit: number, nightsCancun: number, nightsMalaga: number){
    // function that filters the hotels to get the cancun one, then selects only breakfast or only stance and then selects the best possible room without trespassing the limit left.
    const hotelCancun = this.hotelsList?.filter((hotel)=> hotel.city === CitiesEnum.CANCUN)[0]
    console.log("hotelCancun",hotelCancun);

    const onlyBreakfastRooms = hotelCancun?.rooms?.filter((room) => room.meals_plan === "ad" || room.meals_plan === "sa" )
    console.log("onlyBreakfastRooms",onlyBreakfastRooms);

    const selectedRoomCancun = onlyBreakfastRooms?.filter((room) => room.price*nightsCancun < limit).sort((a,b) => b.price - a.price)[0]
    if(selectedRoomCancun && hotelCancun){
      hotelCancun.rooms = [selectedRoomCancun]
      const cancunPrice = selectedRoomCancun?.price*nightsCancun
      const selectedMalaga = this.selectBestMalaga((limit-cancunPrice), nightsMalaga)
      return {malaga: selectedMalaga, cancun: hotelCancun}
    } else {
      console.error("There are options that fits your preferences, try to change them.")
      return undefined
    }
  }

  buildHotelLiteral(hotel: string){
    // this function builds the strings to let the client know which are his best options with the parameters given
    console.log(this.selectedRooms);

    if(hotel === "malaga"){
      const selectedHotel = this.selectedRooms?.malaga
      if(selectedHotel){
        return `Tu mejor opción para ${CitiesEnum.MALAGA} es la habitación tipo ${selectedHotel.rooms[0].name} con ${this.checkMealPlan(selectedHotel.rooms[0].meals_plan)} con un coste por noche de ${selectedHotel.rooms[0].price}€ (Precio total: ${selectedHotel.rooms[0].price}€ X ${this.nightsMalaga} noches = ${this.nightsMalaga*selectedHotel.rooms[0].price}€)`
      } else {return null}
    } else {
      const selectedHotel = this.selectedRooms?.cancun
      if(selectedHotel){
        return `Tu mejor opción para ${CitiesEnum.CANCUN} es la habitación tipo ${selectedHotel.rooms[0].name} con ${this.checkMealPlan(selectedHotel.rooms[0].meals_plan)} con un coste por noche de ${selectedHotel.rooms[0].price}€ (Precio total: ${selectedHotel.rooms[0].price}€ X ${this.nightsCancun} noches = ${this.nightsCancun*selectedHotel.rooms[0].price}€)`
      } else {return null}
    }
  }


  checkMealPlan(code: string){    //  function that uses an enum to convert the meal code to the complete word
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
