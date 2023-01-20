import { PieceType, PlayType, TeamType } from "../interfaces/enums";
import { Piece } from "../interfaces/interfaces";
import {Dispatch} from 'react'

export default class Referee {
    tileIsOcupied(x: number, y: number, boardState: Piece[]): boolean {
        return boardState.some(piece => piece.x === x && piece.y === y)
    }

    tileIsOcupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        return boardState.some(piece => piece.x === x && piece.y === y && piece.team !== team) 
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

    isValidPawnMove(activeX: number, activeY:number, x: number, y: number, yIncrement: number,  setEnPassant: Dispatch<boolean>): boolean {
        // console.log("Move direction", activeX, activeY, x, y, yIncrement)
        if(activeX !== x) {
            return false;
        }
        if(activeY === 1 || activeY === 6) {
            if(y - activeY === yIncrement || y - activeY === 2 * yIncrement) {
                if(y - activeY === 2 * yIncrement)
                    setEnPassant(true)
                return true;
            }
        } else {
            if(y - activeY === yIncrement) {
                return true;
            }
        }
        return false;
    }

    isValidPawnAttack(activeX: number, activeY:number, x: number, y: number, yIncrement: number, boardState: Piece[], team: TeamType, enPassant: boolean): boolean {
        // console.log("ATTACK TRUE?", activeX - x === 1, activeX -x === -1 ,activeY-y === yIncrement ,this.tileIsOcupiedByOpponent(x, y, boardState, team))
        if((x - activeX === 1 ||  x- activeX === -1) && y-activeY === yIncrement && this.tileIsOcupiedByOpponent(x-(-(yIncrement)), y, boardState, team)){
            return true;
        }
        const isEnPassant = enPassant && (x - activeX === 1 ||  x- activeX === -1) && y-activeY === yIncrement && this.tileIsOcupiedByOpponent(x, activeY, boardState, team)
        console.log("ENPASSENT CHECK",x, activeX, x === activeX , y-activeY === yIncrement , this.tileIsOcupiedByOpponent(x, activeY, boardState, team) )
        if(isEnPassant){
            console.log("ENPASSENT MOVE")
            return true
        }
        return false
    }

    isValidPlay(activeX: number, activeY: number, x: number, y: number, type: PieceType, team: TeamType, boardState: Piece[],  enPassant: boolean, setEnPassant: Dispatch<boolean>): {valid: boolean, playType: PlayType} {
            if (x < 0 || x > 7 || y < 0 || y > 7)  return {valid:false, playType: PlayType.INVALID};
            switch(type) {
                case PieceType.PAWN:
                    const moveDirection = team === TeamType.OUR ? 1 : -1
                    if(this.isValidPawnMove(activeX, activeY, x, y, moveDirection, setEnPassant)){
                        if(!this.tileIsOcupied(x, y, boardState) && !this.PieceInTheWay(activeX, activeY, x, y, boardState)){
                            return {valid:true, playType: PlayType.MOVE};
                        }; 
                    }
                    else if(this.isValidPawnAttack(activeX, activeY, x, y, moveDirection, boardState, team, enPassant)) {
                        return {valid:true, playType: PlayType.ATTACK};
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
        
        
        
        return {valid:false, playType: PlayType.INVALID};
    }
}