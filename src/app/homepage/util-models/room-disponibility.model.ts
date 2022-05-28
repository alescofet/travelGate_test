export interface RoomDisponibility{
  code: string
  name: string
  location: string
  rooms: {
    code: string
    name: string
  }[]
}
