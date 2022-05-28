export interface MealPlan{
  code: string
  name: string
  hotel: {
  [code_hotel: string]: {
    room:string
    price: number
  }[]
  }

}
