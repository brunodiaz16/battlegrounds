import { PieceType, TeamType } from "../interfaces/enums";
import { Piece } from "../interfaces/interfaces";

export default class Referee {
    tileIsOcupied(x: number, y: number, boardState: Piece[]): boolean {
        return boardState.some(piece => piece.x === x && piece.y === y)
    }

    PieceInTheWay(activeX: number, activeY: number, x: number, y: number, boardState: Piece[] ): boolean {
        if(activeX === x) {
            // move vertically
            let increment = activeY < y ? 1 : -1;
            for(let i = activeY + increment; i !== y; i += increment) {
                for(let j = 0; j < boardState.length; j++) {
                    if(boardState[j].x === activeX && boardState[j].y === i) {
                        return true;
                    }
                }
            }
        } else if(activeY === y) {
            // move horizontally
            let increment = activeX < x ? 1 : -1;
            for(let i = activeX + increment; i !== x; i += increment) {
                for(let j = 0; j < boardState.length; j++) {
                    if(boardState[j].x === i && boardState[j].y === activeY) {
                        return true;
                    }
                }
            }
        } else if(Math.abs(x - activeX) === Math.abs(y - activeY)) {
            // move diagonally
            let xIncrement = activeX < x ? 1 : -1;
            let yIncrement = activeY < y ? 1 : -1;
            for(let i = activeX + xIncrement, j = activeY + yIncrement; i !== x; i += xIncrement, j += yIncrement) {
                for(let k = 0; k < boardState.length; k++) {
                    if(boardState[k].x === i && boardState[k].y === j) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isValidPawnMove(activeX: number, activeY:number, x: number, y: number, yIncrement: number) {
        console.log("Move direction", activeX, activeY, x, y, yIncrement)
        if(activeX !== x) {
            return false;
        }
        if(activeY === 1 || activeY === 6) {
            if(y - activeY === yIncrement || y - activeY === 2 * yIncrement) {
                return true;
            }
        } else {
            if(y - activeY === yIncrement) {
                return true;
            }
        }
        return false;
    }

    isValidMove(activeX: number, activeY: number, x: number, y: number, type: PieceType, team: TeamType, boardState: Piece[]): boolean {
        
            switch(type) {
                case PieceType.PAWN:
                    if(this.tileIsOcupied(x, y, boardState) || this.PieceInTheWay(activeX, activeY, x, y, boardState)){
                        break;
                    }; 
                    const moveDirection = team === TeamType.OUR ? 1 : -1
                    if(this.isValidPawnMove(activeX, activeY, x, y, moveDirection)){
                        return true;
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
        
        
        
        return false;
    }
}