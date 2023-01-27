import {PieceType, PlayType, TeamType} from "../interfaces/enums";
import {Piece} from "../interfaces/interfaces";
import {Dispatch} from 'react'

/**
 * Class containing helper functions to enforce the Chess rules
 */

export default class Referee {
    tileIsOcupied(x: number, y: number, boardState: Piece[]): boolean {
        return boardState.some(piece => piece.x === x && piece.y === y)
    }

    tileIsOcupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        return boardState.some(piece => piece.x === x && piece.y === y && piece.team !== team) 
    }

    EnPassanttileIsOcupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        return boardState.find((p) => p.x === x && p.y === y && p.team !== team)?.EnPassant === true
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

    /**
     * This function checks whenever the pawns has done a valid move:
     *  - Pawn should only be able to move either forward or (diagonally forward), one or two cells depending on the case.
     *  - Response to the questions: is there any situation that allow me to do this move?
     * @param activeX
     * @param activeY
     * @param x
     * @param y
     * @param moveDirection
     * @param boardState
     */
    isValidPawnMove(activeX: number, activeY:number, x: number, y: number, moveDirection: number, boardState: Piece[]): boolean {
        // console.log("Move direction", activeX, activeY, x, y, yIncrement)
        // const hasMoveOnTheSameLine = (() =>  activeX === x)();
        // const isFirstMove = (() => activeY === (moveDirection === 1 ? 1 : 6))();

        const isMovingForward = (() => moveDirection === 1 ? y > activeY : y < activeY)();
        const numOfCellsMovedOnY = (() => Math.abs(y - activeY))();
        const numOfCellsMovedOnX = (() => Math.abs(x - activeX))();

        return !(numOfCellsMovedOnY > 2 || !isMovingForward || numOfCellsMovedOnX > 1);
    }

    isValidPawnAttack(activeX: number, activeY:number, x: number, y: number, moveDirection: number, boardState: Piece[], team: TeamType, enPassant: boolean): boolean {
        const numOfCellsMovedOnX = Math.abs(x - activeX);

        if(numOfCellsMovedOnX !== 1) return false;

        if(enPassant){
            return this.EnPassanttileIsOcupiedByOpponent(x, activeY, boardState, team);
        }

        return this.tileIsOcupiedByOpponent(x, y, boardState, team);
    }

    isValidPlay(activeX: number, activeY: number, x: number, y: number, type: PieceType, team: TeamType, boardState: Piece[],  enPassant: boolean): {valid: boolean, playType: PlayType} {
            if (x < 0 || x > 7 || y < 0 || y > 7)  return {valid:false, playType: PlayType.INVALID};
            switch(type) {
                case PieceType.PAWN:
                    const moveDirection = team === TeamType.OUR ? 1 : -1;
                    const moveType =  activeX !== x ? PlayType.ATTACK : PlayType.MOVE;
                    const isValidMove = this.isValidPawnMove(activeX, activeY, x, y, moveDirection, boardState);

                    if(!isValidMove) return {valid:false, playType: PlayType.INVALID};

                    if(moveType == PlayType.ATTACK){
                        const isValidAttack = this.isValidPawnAttack(activeX, activeY, x, y, moveDirection, boardState, team, enPassant);
                        return {valid: isValidAttack, playType: isValidAttack ? PlayType.ATTACK : PlayType.INVALID};
                    } else if(moveType == PlayType.MOVE){
                        const isTileOccupied = this.tileIsOcupied(x, y, boardState);
                        const isPathMovingBlocked = this.PieceInTheWay(activeX, activeY, x, y, boardState);
                        const canMove = !isTileOccupied && !isPathMovingBlocked;
                        return {valid: canMove, playType: canMove ? PlayType.MOVE : PlayType.INVALID};
                    }
                    throw Error("How is this possible? \n" + this);
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

    isNeedEnPassantMark(activeX: number, activeY: number, x: number, y: number, type: PieceType): boolean {
        return type === PieceType.PAWN && Math.abs(y - activeY) === 2;
    }

}