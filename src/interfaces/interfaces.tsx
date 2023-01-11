import { PieceType, TeamType } from "./enums"

export interface Piece {
    image: string
    x: number
    y: number
    type: PieceType
    team: TeamType
  
}