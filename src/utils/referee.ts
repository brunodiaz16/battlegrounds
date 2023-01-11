import { PieceType, TeamType } from "../interfaces/enums";

export default class Referee {
    isValidMove(activeX: number, activeY: number, x: number, y: number, type: PieceType, team: TeamType) {
        console.log("Valid move", activeX,activeY, x, y, type)
        if(team === TeamType.OUR){
            switch(type) {
                case PieceType.PAWN:
                    if(activeY === 1){
                        if(activeX === x){
                            if(y - activeY === 1 || y - activeY === 2){
                                return true
                            }
                        }
                    }
                    else {
                        if(activeX === x){
                            if(y - activeY === 1){
                                return true
                            }
                        }
                    }
                break;
                case PieceType.BISHOP:
                break;
                case PieceType.KNIGHT:
                break;
                case PieceType.ROOK:
                break;
                case PieceType.QUEEN:
                break;
                case PieceType.KING:
                break;
            }
        
        
        }
        return false;
    }
}