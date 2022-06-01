export interface HotelForeign{
  code: string
  name: string
  location: string
  rooms: {
    code: string
    name: string
  }[]
}
