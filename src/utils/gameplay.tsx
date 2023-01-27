import {Dispatch} from 'react'
import { PieceType, PlayType, TeamType } from '../interfaces/enums';
import { Piece } from '../interfaces/interfaces';
import Referee from './referee';

export function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>, activePiece: HTMLElement | null, setActicePiece: Dispatch<any>, chessboardRef: any, setActiveX: Dispatch<number>, setActiveY: Dispatch<number>) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if(element.classList.contains('ChessTile__tile_piece') && chessboard){
        setActiveX(Math.floor((e.clientX - chessboard.offsetLeft)/100))
        setActiveY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100)))

        const x = e.clientX - 50
        const y = e.clientY - 50
        element.style.position = 'absolute'
        element.style.left = `${x}px`
        element.style.top = `${y}px`

        setActicePiece(element)

    }

}

export function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>, activePiece: HTMLElement | null, chessboardRef: any) {
    const chessboard = chessboardRef.current
    if(activePiece && chessboard){
        // console.log("moving", e.target)
        const minX = +chessboard.offsetLeft- 25;
        const minY = +chessboard.offsetTop - 25;
        const maxX = +chessboard.offsetLeft + chessboard.clientWidth - 75;
        const maxY =+chessboard.offsetTop + chessboard.clientHeight - 75;
        const x = e.clientX - 50
        const y = e.clientY - 50
        if((x > minX && y > minY) && (x < maxX && y < maxY)){
            activePiece.style.position = 'absolute'
            activePiece.style.left = `${x}px`
            activePiece.style.top = `${y}px`
        }

    }

}


/**
 * Function that gets call on MouseUp event, this will check if the move is valid and perform the move of the pieces when need it.
 * @param e - MouseUp event
 * @param activePiece
 * @param setActicePiece
 * @param boardState - Array containing the position of the Pieces on the board
 * @param setPieces
 * @param chessboardRef
 * @param activeX - Original/Current (X) position of the piece
 * @param activeY - Original/Current (Y) position of the piece
 * @param referee
 * @param enPassant
 * @param setEnPassant - Callback to update the EnPassant flag
 */
export function releasePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>, activePiece: HTMLElement | null, setActicePiece: Dispatch<any>, boardState: Piece[], setPieces: Dispatch<any>, chessboardRef: any, activeX:number, activeY: number, referee: Referee, enPassant: boolean, setEnPassant: Dispatch<boolean>) {
    const chessboard = chessboardRef.current;
    const x = Math.floor((e.clientX - chessboard.offsetLeft)/100);
    const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100))


    if(activePiece && chessboard){
        let pieces = [...boardState]
        pieces.forEach((p: Piece) => {
            if(p.x === activeX && p.y === activeY) {
                const {valid, playType} = referee.isValidPlay(activeX, activeY, x,y, p.type, p.team, boardState, enPassant);
                const isNeedEnPassantMark = referee.isNeedEnPassantMark(activeX, activeY, x,y, p.type);
                if(valid){
                    if(playType === PlayType.MOVE){
                        console.log("move", x , p.x, y, p.y)
                        p.x = x
                        p.y = y
                    }
                    else if(playType === PlayType.ATTACK) {
                        console.log('checkAttackType', enPassant, p.x, x, p.y, activeY, p.EnPassant)
                        if(enPassant) { //TODO: (1) Consolidate EnPassant Logic
                            //Piece marked as EnPassant here
                            pieces = pieces.filter((p) => !(p.x === x && p.y === activeY && p.EnPassant && p.type === PieceType.PAWN));
                        } else {
                            pieces = pieces.filter((p) => !(p.x === x && p.y === y));
                        }
                        p.x = x;
                        p.y = y;
                    }

                    // After every move reset the enPassant
                    if(enPassant) {
                        const markedPawn = pieces.find((p) => p.EnPassant && p.type === PieceType.PAWN); //TODO: (2) Consolidate EnPassant Logic
                        if(markedPawn){
                            markedPawn.EnPassant = false;
                        }
                        setEnPassant(false);
                    }

                    if(isNeedEnPassantMark) { //TODO: (3) Consolidate EnPassant Logic
                        const piece = boardState.find((piece) => piece.x === x && piece.y === y);
                        if(piece) {
                            piece.EnPassant = true;
                            setEnPassant(true);
                        }
                    }
                }
            }
        });
        
        setPieces(pieces)
        
        const element = e.target as HTMLElement 
        element.style.position = 'static'
        setActicePiece(null)

    }

}
