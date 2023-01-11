import {Dispatch} from 'react'
import { Piece } from '../interfaces';

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

export function releasePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>, activePiece: HTMLElement | null, setActicePiece: Dispatch<any>, setPieces: Dispatch<any>, chessboardRef: any, activeX:number, activeY: number) {
    const chessboard = chessboardRef.current
    const x = Math.floor((e.clientX - chessboard.offsetLeft)/100);
    const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100))
    console.log(activeX, activeY, x, y)
    
    if(activePiece && chessboard){
        // console.log("release", e.target)
        setPieces((value: Piece[]) => {
            const pieces = value.map((p:Piece) => {
                if(p.x === activeX && p.y === activeY) {
                    p.x = x
                    p.y = y
                }
                return p
            })
            return pieces
        })
        const element = e.target as HTMLElement 
        element.style.position = 'static'
        setActicePiece(null)

    }

}
