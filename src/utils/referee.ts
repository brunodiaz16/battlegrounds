import {PieceType, PlayType, TeamType} from "../interfaces/enums";
import {Piece} from "../interfaces/interfaces";

/**
 * Class containing helper functions to enforce the Chess rules
 */

export default class Referee {
    private _moves: number = 0;

    get moves(): number {
        return this._moves;
    }

    private set moves(number :number) {
        this._moves = number;
    }
    increaseMoves(){
        this.moves = this._moves + 1;
        // console.log("Turn #: " + this._moves);
    }

    static tileIsOcupied(x: number, y: number, boardState: Piece[]): boolean {
        return boardState.some(piece => piece.x === x && piece.y === y)
    }

    static tileIsOcupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        return boardState.some(piece => piece.x === x && piece.y === y && piece.team !== team) 
    }

    static EnPassanttileIsOcupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        return boardState.find((p) => p.x === x && p.y === y && p.team !== team)?.EnPassant === true
    }

    static PieceInTheWay(activeX: number, activeY: number, x: number, y: number, boardState: Piece[] ): boolean {
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
    static isValidPawnMove(activeX: number, activeY:number, x: number, y: number, moveDirection: number, boardState: Piece[]): boolean {
        const isFirstMove = activeY === (moveDirection === 1 ? 1 : 6);
        const isMovingForward = moveDirection === 1 ? y > activeY : y < activeY;
        const numOfCellsMovedOnY = Math.abs(y - activeY);
        const numOfCellsMovedOnX = Math.abs(x - activeX);

        if (numOfCellsMovedOnX > 1) {
            return false;
        }
        if (!isMovingForward) {
            return false;
        }
        if (!(numOfCellsMovedOnY > 0 && numOfCellsMovedOnY <= 2)) {
            return false;
        }
        if (!isFirstMove && numOfCellsMovedOnY !== 1) {
            return false;
        }
        return true;
    }


    static isValidPawnAttack(activeX: number, activeY:number, x: number, y: number, moveDirection: number, boardState: Piece[], team: TeamType, enPassant: boolean): boolean {
        const numOfCellsMovedOnX = Math.abs(x - activeX);

        if(numOfCellsMovedOnX !== 1) return false;

        if(enPassant && this.EnPassanttileIsOcupiedByOpponent(x, activeY, boardState, team)) return true;

        return this.tileIsOcupiedByOpponent(x, y, boardState, team);
    }

    static isValidKnightPlay(activeX: number, activeY: number, x: number, y: number, boardState: Piece[]): boolean {
        console.log("CHECK KNIGHT PLAY")
        const xDiff = Math.abs(x - activeX);
        const yDiff = Math.abs(y - activeY);
    
        if ((xDiff === 2 && yDiff === 1) || (xDiff === 1 && yDiff === 2)) {
            return true;
        }
        return false;
    }

    static isValidKnightMove(activeX: number, activeY: number, x: number, y: number, boardState: Piece[]): boolean {
        const isValidKnightPlay =  Referee.isValidKnightPlay(activeX, activeY, x,y, boardState)
        console.log("Valid move", isValidKnightPlay)
        if (isValidKnightPlay) {
            if (!Referee.tileIsOcupied(x, y, boardState)) {
                return true;
            }
        }
        return false;
    }

    static isValidKnightAttack(activeX: number, activeY: number, x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        const isValidKnightPlay =  Referee.isValidKnightPlay(activeX, activeY, x,y, boardState)
        console.log("Valid attack", isValidKnightPlay)
        if (isValidKnightPlay) {
            if (Referee.tileIsOcupiedByOpponent(x, y, boardState, team)) {
                return true;
            }
        }
        return false;
    }





    isValidPlay(activeX: number, activeY: number, x: number, y: number, type: PieceType, team: TeamType, boardState: Piece[],  enPassant: boolean): {valid: boolean, playType: PlayType} {
            if (Referee.isOutsideTheBoard(x, y) || !this.isYourTurn(team) || !Referee.didPieceMoved(activeX,activeY,x,y))  return {valid:false, playType: PlayType.INVALID};
            const moveDirection = team === TeamType.OUR ? 1 : -1;
            switch(type) {
                case PieceType.PAWN:
                    const isValidPawnMove = Referee.isValidPawnMove(activeX, activeY, x, y, moveDirection, boardState);
                    const moveType =  activeX !== x ? PlayType.ATTACK : PlayType.MOVE;
                    if(!isValidPawnMove) return {valid:false, playType: PlayType.INVALID};

                    if(moveType === PlayType.ATTACK){
                        const isValidAttack = Referee.isValidPawnAttack(activeX, activeY, x, y, moveDirection, boardState, team, enPassant);
                        return {valid: isValidAttack, playType: isValidAttack ? PlayType.ATTACK : PlayType.INVALID};
                    } else if(moveType === PlayType.MOVE){
                        const isTileOccupied = Referee.tileIsOcupied(x, y, boardState);
                        const isPathMovingBlocked = Referee.PieceInTheWay(activeX, activeY, x, y, boardState);
                        const canMove = !isTileOccupied && !isPathMovingBlocked;
                        return {valid: canMove, playType: canMove ? PlayType.MOVE : PlayType.INVALID};
                    }
                    throw Error("How is this possible? \n" + this);
                case PieceType.KNIGHT:
                    const isValidKnighMove = Referee.isValidKnightMove(activeX, activeY, x, y, boardState);
                    const isValidKnightAttack = Referee.isValidKnightAttack(activeX, activeY, x, y, boardState, team);
                    console.log("Check knight moves", isValidKnighMove, isValidKnightAttack)
                    if(isValidKnighMove) return {valid:true, playType: PlayType.MOVE};
                    if(isValidKnightAttack) return {valid:true, playType: PlayType.ATTACK};
                    return {valid: false, playType: PlayType.INVALID}
                case PieceType.BISHOP:
                    console.log("Check bishop move")
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

    static isOutsideTheBoard(x: number, y: number) {
        return x < 0 || x > 7 || y < 0 || y > 7;
    }

    /**
     * Even numbers represent every turn of the whites/Ours
     * @param team
     * @private
     */
    private isYourTurn(team: TeamType) {
        return this.moves % 2 === 0 ? team === TeamType.OUR : team === TeamType.OPPONENT;
    }

    getCurrentTurn() {
        return this.moves % 2 === 0 ? TeamType.OUR : TeamType.OPPONENT;
    }


    /**
     * Flag Tell to tell the game to mark the moved piece as "EnPassant = true"
     * @param activeX
     * @param activeY
     * @param x
     * @param y
     * @param type
     */
    static isNeedEnPassantMark(activeX: number, activeY: number, x: number, y: number, type: PieceType): boolean {
        return type === PieceType.PAWN && Math.abs(y - activeY) === 2;
    }

    static didPieceMoved(activeX: number, activeY: number, x: number, y: number): boolean {
        return activeX !== x || activeY !== y;
    }

}